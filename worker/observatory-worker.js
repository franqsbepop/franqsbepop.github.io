// Observatory private API layer — Cloudflare Worker.
//
// This is the ONLY piece of this project allowed to hold the Umami API
// token. It exposes exactly one purpose-built endpoint that returns the
// aggregated, non-sensitive numbers analytics/index.html needs — never a
// general-purpose proxy to the Umami API, and never the token itself.
//
// Data flow:
//   analytics/data.js  --(plain GET, no secret)-->  this Worker
//   this Worker        --(Authorization: Bearer UMAMI_API_TOKEN)-->  Umami Cloud
//
// Required Cloudflare configuration (see worker/README.md for exact steps):
//   Secret (never in git):       UMAMI_API_TOKEN
//   Plain vars (safe in git):    UMAMI_WEBSITE_ID, UMAMI_API_BASE, ALLOWED_ORIGIN
//
// If UMAMI_API_TOKEN or UMAMI_WEBSITE_ID is missing, every request fails
// safely with a clear JSON error — the Worker never guesses or falls back
// to fabricated data.

// Static post_id -> title lookup, copied from js/post-utilities.js's
// postData object (the site's own authoritative source). Kept here so the
// Worker can return real titles without duplicating tags/dates it doesn't
// need. Update this if posts are added/renamed — it is not derived
// automatically, so it can go stale; unmapped post_ids just fall back to
// their raw id in the response rather than a guessed title.
const POST_TITLES = {
    post1: 'Learning via writing',
    post2: 'The weak law of poorly abbreviated large history',
    post3: 'Reducing Bias in Education Evaluation',
    post4: 'Computational Methods in Education',
    post5: 'The Philosophy of Financial Markets',
    post6: 'The Philosophy of Mathematics in Finance',
    post7: 'Brain-Computer Interfaces',
    post8: 'Ethical Implications of Finance in Von Neumann Universes',
    post9: 'Grothendieck, von Neumann and Hilbert',
    post10: 'Turing and Shannon: The Mathematical Foundations of Modern Computing',
    post11: 'Mathematical Beauty and Taste',
    post12: 'Leonard Euler',
    post13: 'Mathematical Philosophy and Large Language Models',
    post14: 'The unreasonable effectiveness of mathematics: from Wigner to Karpathy',
    post15: 'Econophysics: Bridging Economics and Physics',
    post16: 'Understanding Distributions',
    post17: 'There is always an ε',
    post18: 'Sticky Path Dependency',
    post19: "Short Selling: The Market's Unloved Watchdog",
    post20: 'Self-Reference: The Foundation and the Limit of Intelligence',
    post21: 'Never vote for a lawyer',
    post22: 'Theoretical Foundations of Data-Driven Stochastic Modelling with Financial Market Applications',
    post25: 'Kolmogorov Complexity and Fractal Geometry',
    post26: 'On the Information Bottleneck Principle',
    post27: 'Optimal Transport Meets Martingales',
    post28: 'Cybernetics: The Science of Systems and Control',
    post29: 'Cylindrical Semi-martingale OT, Measure Contiguity, and Large Financial Markets',
    post30: 'How to Organize an Unforgettable Hackathon',
    postX: 'Mathematical Modelling in Stochastic Analysis and Finance'
};

const DEFAULT_RANGE_DAYS = 30;
const MAX_RANGE_DAYS = 365;
const CACHE_SECONDS = 60;

function jsonResponse(body, status, origin) {
    const headers = {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
    };
    if (origin) {
        headers['Access-Control-Allow-Origin'] = origin;
        headers['Vary'] = 'Origin';
    }
    return new Response(JSON.stringify(body), { status: status || 200, headers });
}

function corsOrigin(request, env) {
    const allowed = env.ALLOWED_ORIGIN;
    if (!allowed) return null;
    const reqOrigin = request.headers.get('Origin');
    // Allow the configured origin, and allow no-Origin requests (curl,
    // server-to-server, wrangler dev's own preview) through without a CORS
    // header — the browser is the only client that enforces CORS anyway.
    if (!reqOrigin || reqOrigin === allowed) return allowed;
    return null;
}

async function umamiGet(env, path, params) {
    const base = (env.UMAMI_API_BASE || 'https://cloud.umami.is/api').replace(/\/$/, '');
    const url = new URL(base + path);
    Object.keys(params || {}).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.set(key, params[key]);
        }
    });
    const res = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${env.UMAMI_API_TOKEN}`,
            Accept: 'application/json'
        }
    });
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Umami ${path} responded ${res.status}: ${text.slice(0, 200)}`);
    }
    return res.json();
}

// Small helper: run a Umami call, and on failure return a marker instead of
// throwing, so one failing section doesn't take down the whole response.
async function safe(promiseFactory, label, warnings) {
    try {
        return await promiseFactory();
    } catch (err) {
        warnings.push(`${label}: ${err.message}`);
        return null;
    }
}

function extractPostPath(path) {
    const m = /\/posts\/(post[A-Za-z0-9_-]*)\.html$/i.exec(path || '');
    return m ? m[1] : null;
}

function eventDataToMap(eventDataResponse) {
    // Turns /event-data's {data: [{eventId, eventProperties: [{dataKey, stringValue}, ...]}]}
    // into a flat array of plain {key: value} objects, one per event occurrence.
    const rows = (eventDataResponse && eventDataResponse.data) || [];
    return rows.map((row) => {
        const props = {};
        (row.eventProperties || []).forEach((p) => {
            props[p.dataKey] = p.stringValue !== null && p.stringValue !== undefined ? p.stringValue : p.numberValue;
        });
        return props;
    });
}

function buildTopPosts(pathMetrics, scroll50Rows, scroll90Rows) {
    const scroll50ByPost = {};
    scroll50Rows.forEach((row) => {
        const id = row.post_id;
        if (id) scroll50ByPost[id] = (scroll50ByPost[id] || 0) + 1;
    });
    const scroll90ByPost = {};
    scroll90Rows.forEach((row) => {
        const id = row.post_id;
        if (id) scroll90ByPost[id] = (scroll90ByPost[id] || 0) + 1;
    });

    const posts = (pathMetrics || [])
        .map((row) => ({ postId: extractPostPath(row.name || row.x), row }))
        .filter((entry) => entry.postId)
        .map((entry) => {
            const row = entry.row;
            const pageviews = row.pageviews != null ? row.pageviews : row.y;
            const visitors = row.visitors != null ? row.visitors : null;
            const s50 = scroll50ByPost[entry.postId] || 0;
            const s90 = scroll90ByPost[entry.postId] || 0;
            return {
                postId: entry.postId,
                title: POST_TITLES[entry.postId] || entry.postId,
                pageviews: pageviews,
                visitors: visitors,
                scroll50Count: s50,
                scroll90Count: s90,
                scroll50Rate: pageviews ? Math.min(1, s50 / pageviews) : null,
                scroll90Rate: pageviews ? Math.min(1, s90 / pageviews) : null
            };
        })
        .sort((a, b) => (b.pageviews || 0) - (a.pageviews || 0));

    return posts;
}

function buildReferenceClicks(rows) {
    const counts = {};
    rows.forEach((row) => {
        const key = (row.reference_text || 'Untitled reference') + '|' + (row.destination_domain || 'unknown');
        if (!counts[key]) {
            counts[key] = { text: row.reference_text || 'Untitled reference', domain: row.destination_domain || 'unknown', clicks: 0 };
        }
        counts[key].clicks += 1;
    });
    return Object.values(counts).sort((a, b) => b.clicks - a.clicks);
}

function buildReadingPaths(rows, titleLookup) {
    const counts = {};
    rows.forEach((row) => {
        const from = row.source_post;
        const to = row.destination_post;
        if (!from || !to) return;
        const key = from + '>' + to;
        if (!counts[key]) {
            counts[key] = {
                from: titleLookup[from] || from,
                to: titleLookup[to] || to,
                count: 0
            };
        }
        counts[key].count += 1;
    });
    return Object.values(counts).sort((a, b) => b.count - a.count);
}

function buildAcquisition(referrerMetrics) {
    const rows = referrerMetrics || [];
    const total = rows.reduce((sum, r) => sum + (r.y || 0), 0);
    return rows
        .map((r) => ({
            label: r.x && r.x.trim() ? r.x : 'Direct',
            visits: r.y || 0,
            share: total ? (r.y || 0) / total : 0
        }))
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 8);
}

async function buildObservatoryPayload(env, rangeDays) {
    const warnings = [];
    const endAt = Date.now();
    const startAt = endAt - rangeDays * 24 * 60 * 60 * 1000;
    const websiteId = env.UMAMI_WEBSITE_ID;
    const q = { startAt, endAt };

    const [stats, pathMetrics, referrerMetrics, refClickData, relatedClickData, scroll50Data, scroll90Data] = await Promise.all([
        safe(() => umamiGet(env, `/websites/${websiteId}/stats`, q), 'overview', warnings),
        safe(() => umamiGet(env, `/websites/${websiteId}/metrics/expanded`, Object.assign({ type: 'path', limit: 500 }, q)), 'top posts', warnings),
        safe(() => umamiGet(env, `/websites/${websiteId}/metrics`, Object.assign({ type: 'referrer', limit: 20 }, q)), 'acquisition', warnings),
        safe(() => umamiGet(env, `/websites/${websiteId}/event-data`, Object.assign({ event: 'reference_click', pageSize: 200 }, q)), 'reference clicks', warnings),
        safe(() => umamiGet(env, `/websites/${websiteId}/event-data`, Object.assign({ event: 'related_post_click', pageSize: 200 }, q)), 'reading paths', warnings),
        safe(() => umamiGet(env, `/websites/${websiteId}/event-data`, Object.assign({ event: 'scroll_50', pageSize: 500 }, q)), 'scroll_50 events', warnings),
        safe(() => umamiGet(env, `/websites/${websiteId}/event-data`, Object.assign({ event: 'scroll_90', pageSize: 500 }, q)), 'scroll_90 events', warnings)
    ]);

    const scroll50Rows = scroll50Data ? eventDataToMap(scroll50Data) : [];
    const scroll90Rows = scroll90Data ? eventDataToMap(scroll90Data) : [];
    const topPosts = pathMetrics ? buildTopPosts(pathMetrics, scroll50Rows, scroll90Rows) : null;

    const postPageviewTotal = topPosts ? topPosts.reduce((sum, p) => sum + (p.pageviews || 0), 0) : 0;
    const totalScroll50 = scroll50Rows.length;
    const totalScroll90 = scroll90Rows.length;

    const overview = stats
        ? {
              visitors: stats.visitors,
              visits: stats.visits,
              pageviews: stats.pageviews,
              bounces: stats.bounces,
              bounceRate: stats.visits ? stats.bounces / stats.visits : null,
              // "Posts read" = distinct scroll_50 occurrences in range, i.e.
              // sessions that got at least halfway through some post.
              postsRead: scroll50Data ? totalScroll50 : null,
              referenceClicks: refClickData ? (refClickData.count != null ? refClickData.count : eventDataToMap(refClickData).length) : null
          }
        : null;

    const readingMetrics = {
        scroll50Rate: postPageviewTotal ? Math.min(1, totalScroll50 / postPageviewTotal) : null,
        scroll90Rate: postPageviewTotal ? Math.min(1, totalScroll90 / postPageviewTotal) : null,
        // Umami's default API surfaces total/average time-on-site (via
        // `totaltime` on /stats), not a per-post median session duration —
        // returning that as "median session duration" would misrepresent
        // what was actually measured, so this stays explicitly unavailable.
        medianSessionDuration: null
    };

    return {
        generatedAt: new Date().toISOString(),
        rangeDays: rangeDays,
        overview: overview,
        topPosts: topPosts ? topPosts.slice(0, 10) : null,
        readingMetrics: readingMetrics,
        referenceClicks: refClickData ? buildReferenceClicks(eventDataToMap(refClickData)) : null,
        readingPaths: relatedClickData ? buildReadingPaths(eventDataToMap(relatedClickData), POST_TITLES) : null,
        acquisition: referrerMetrics ? buildAcquisition(referrerMetrics) : null,
        warnings: warnings
    };
}

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const origin = corsOrigin(request, env);

        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin': origin || '',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    Vary: 'Origin'
                }
            });
        }

        if (request.method !== 'GET') {
            return jsonResponse({ error: 'Only GET is supported' }, 405, origin);
        }

        if (url.pathname !== '/api/observatory') {
            return jsonResponse({ error: 'Not found. This Worker only serves /api/observatory.' }, 404, origin);
        }

        if (!env.UMAMI_API_TOKEN || !env.UMAMI_WEBSITE_ID) {
            return jsonResponse(
                { error: 'Worker is not configured: UMAMI_API_TOKEN and/or UMAMI_WEBSITE_ID are missing.' },
                500,
                origin
            );
        }

        let rangeDays = parseInt(url.searchParams.get('days'), 10);
        if (!Number.isFinite(rangeDays) || rangeDays <= 0) rangeDays = DEFAULT_RANGE_DAYS;
        rangeDays = Math.min(rangeDays, MAX_RANGE_DAYS);

        // Cache the aggregated response briefly so repeated dashboard loads
        // don't re-hit Umami's rate-limited API every time.
        const cache = caches.default;
        const cacheKey = new Request(url.toString(), request);
        const cached = await cache.match(cacheKey);
        if (cached) {
            const cachedBody = await cached.json();
            return jsonResponse(cachedBody, 200, origin);
        }

        try {
            const payload = await buildObservatoryPayload(env, rangeDays);
            const response = jsonResponse(payload, 200, origin);
            const toCache = new Response(JSON.stringify(payload), {
                headers: { 'Content-Type': 'application/json', 'Cache-Control': `max-age=${CACHE_SECONDS}` }
            });
            ctx.waitUntil(cache.put(cacheKey, toCache));
            return response;
        } catch (err) {
            return jsonResponse({ error: 'Failed to load analytics data', detail: err.message }, 502, origin);
        }
    }
};

// Exported for unit testing (worker/test-aggregation.mjs) — not used by the
// fetch handler's own default export above.
export { eventDataToMap, buildTopPosts, buildReferenceClicks, buildReadingPaths, buildAcquisition, extractPostPath };
