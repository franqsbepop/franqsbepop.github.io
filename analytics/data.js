// Observatory data layer — REAL implementation.
//
// Talks to the private Cloudflare Worker (worker/observatory-worker.js),
// never to Umami directly, and never holds any credential. If the Worker
// isn't configured yet (analytics/observatory-config.js is blank) or the
// request fails for any reason, every function below rejects with a clear
// error — there is no silent fallback to fabricated numbers. The dashboard
// (analytics/index.html) is responsible for showing that failure honestly.
//
// For the old prototype/demo implementation, see analytics/demo-data.js —
// it's only loaded when the dashboard is opened with ?demo=1.

(function () {
    'use strict';

    // Copied from js/post-utilities.js's postData (title only) so the
    // dashboard can label reading paths and any post the Worker doesn't
    // already resolve a title for. Kept in sync manually, same as the
    // Worker's own copy — see worker/observatory-worker.js.
    var POST_TITLES = {
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

    function workerUrl() {
        var cfg = window.OBSERVATORY_CONFIG || {};
        return cfg.workerUrl || '';
    }

    var _pending = null;

    // Fetches the Worker's combined payload once per page load; every
    // get*() call below shares this single request rather than firing one
    // each. Deliberately not cached across reloads — a stale-looking
    // dashboard on refresh would be worse than one extra request.
    function fetchAll() {
        if (_pending) return _pending;

        var url = workerUrl();
        if (!url) {
            _pending = Promise.reject(new Error(
                'Observatory Worker URL is not configured. Set workerUrl in analytics/observatory-config.js once worker/ is deployed — see worker/README.md.'
            ));
            return _pending;
        }

        _pending = fetch(url, { headers: { Accept: 'application/json' } }).then(function (res) {
            if (!res.ok) {
                return res.json().catch(function () { return {}; }).then(function (body) {
                    throw new Error('Worker responded ' + res.status + (body && body.error ? ': ' + body.error : ''));
                });
            }
            return res.json();
        });
        return _pending;
    }

    function requireField(promise, mapper) {
        return promise.then(mapper);
    }

    function getOverview() {
        return requireField(fetchAll(), function (data) {
            var o = data.overview || {};
            return {
                _source: 'live',
                generatedAt: data.generatedAt,
                warnings: data.warnings || [],
                visitors: o.visitors != null ? o.visitors : null,
                pageViews: o.pageviews != null ? o.pageviews : null,
                postsRead: o.postsRead != null ? o.postsRead : null,
                referenceClicks: o.referenceClicks != null ? o.referenceClicks : null
            };
        });
    }

    function getTopPosts() {
        return requireField(fetchAll(), function (data) {
            var rows = data.topPosts || [];
            return {
                _source: 'live',
                generatedAt: data.generatedAt,
                posts: rows.map(function (row, i) {
                    return {
                        rank: i + 1,
                        title: row.title || POST_TITLES[row.postId] || row.postId,
                        postId: row.postId,
                        views: row.pageviews,
                        completionRate: row.scroll90Rate // 90% scroll = completion proxy, matching js/analytics.js's own definition
                    };
                })
            };
        });
    }

    function getReadingMetrics() {
        return requireField(fetchAll(), function (data) {
            var r = data.readingMetrics || {};
            return {
                _source: 'live',
                generatedAt: data.generatedAt,
                scroll50Rate: r.scroll50Rate != null ? r.scroll50Rate : null,
                scroll90Rate: r.scroll90Rate != null ? r.scroll90Rate : null,
                medianSessionDuration: r.medianSessionDuration != null ? r.medianSessionDuration : null
            };
        });
    }

    function getReferenceClicks() {
        return requireField(fetchAll(), function (data) {
            return {
                _source: 'live',
                generatedAt: data.generatedAt,
                references: (data.referenceClicks || []).map(function (r) {
                    return { text: r.text, domain: r.domain, clicks: r.clicks };
                })
            };
        });
    }

    function getReadingPaths() {
        return requireField(fetchAll(), function (data) {
            return {
                _source: 'live',
                generatedAt: data.generatedAt,
                paths: (data.readingPaths || []).map(function (p) {
                    return { from: p.from, to: p.to, count: p.count };
                })
            };
        });
    }

    function getAcquisition() {
        return requireField(fetchAll(), function (data) {
            return {
                _source: 'live',
                generatedAt: data.generatedAt,
                sources: (data.acquisition || []).map(function (a) {
                    return { label: a.label, share: a.share };
                })
            };
        });
    }

    window.ObservatoryData = {
        getOverview: getOverview,
        getTopPosts: getTopPosts,
        getReadingMetrics: getReadingMetrics,
        getReferenceClicks: getReferenceClicks,
        getReadingPaths: getReadingPaths,
        getAcquisition: getAcquisition
    };
})();
