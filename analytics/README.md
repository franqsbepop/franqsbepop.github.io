# Analytics — Observatory

A small, deliberately minimal analytics system for diogofranquinho.com,
built on [Umami](https://umami.is/) as the tracking backend, with a
private Cloudflare Worker as the only piece allowed to hold the Umami API
token. Three parts:

```
Tracking:    js/analytics-config.js + js/analytics.js   (every page)
Private API: worker/observatory-worker.js               (Cloudflare, not GitHub Pages)
Dashboard:   analytics/                                  (this directory)
```

```
diogofranquinho.com --analytics.js--> Umami Cloud
                                            │
                                 authenticated REST API
                                            │
                                            ▼
analytics/index.html <--aggregated JSON-- Cloudflare Worker
   "Observatory"           (no token)      (holds UMAMI_API_TOKEN as a secret)
```

## What it does

Every page on the site loads two scripts:

```html
<script src=".../js/analytics-config.js"></script>
<script src=".../js/analytics.js" defer></script>
```

`analytics.js` injects the Umami tracking script (using the config
values), classifies the current page from its URL and DOM, and tracks a
small, fixed vocabulary of events. It does not track anything Umami's own
script doesn't already send, plus the custom events listed below —
nothing more. **This part of the system was not changed** while wiring up
the Worker/Observatory — see `js/analytics.js` directly.

## Events tracked

| Event | Fired when | Data attached |
|---|---|---|
| `page_view` | Every page load, once the Umami script is ready | `page_type`, `post_id`, `post_title` |
| `scroll_50` | A post page is scrolled to ~50% depth (once per load) | `post_id`, `post_title` |
| `scroll_90` | A post page is scrolled to ~90% depth (once per load) | `post_id`, `post_title` |
| `reference_click` | An external link inside a post's `#references` section is clicked | `post_id`, `reference_text`, `destination_domain` |
| `related_post_click` | A link to another `posts/postN.html` is clicked from a post page | `source_post`, `destination_post` |
| `book_review_open` | A link into `/book_reviews/` is clicked from elsewhere on the site | `source_page` |
| `book_click` | An external link inside a `.book-review` (or `[data-book-title]`) element is clicked | `book_title`, `source_page` |
| `external_link_click` | Any other external link click, not already classified above | `destination_domain`, `page_type` |

`page_type` is one of: `home`, `blog`, `post`, `books`, `book_review`,
`notes`, `teaching`, `talks`, `other` — inferred from the URL path, never
hard-coded per page.

## Umami configuration

`js/analytics-config.js` holds the two public, client-side tracking
identifiers:

```js
window.ANALYTICS_CONFIG = {
    umamiScriptUrl: "https://cloud.umami.is/script.js",
    umamiWebsiteId: "8e51e5be-2e16-42a9-84b1-933852d0eeba"
};
```

Both are safe to commit — Umami's own script tag exposes them in every
page's HTML source regardless. Leaving them blank is also fine:
`analytics.js` simply skips loading Umami and every `track()` call
becomes a silent no-op, so the site works identically either way.

## What is intentionally NOT tracked

- Keystrokes, mouse movement, session recording, or fingerprinting.
- Personal information or form contents.
- Full URLs with query strings for reference/external link clicks — only
  the destination hostname is sent.
- Plain internal navigation (nav bar, footer links, in-page section
  anchors like `#biography`) — only classified link types generate events.
- UTM parameters are left entirely to Umami's own handling; `analytics.js`
  never reads, rewrites, or strips `utm_*` query parameters.
- No cookies are set by this code.

## The Observatory (this directory)

`index.html` fetches real data through `data.js`, which calls the private
Cloudflare Worker — never Umami directly, and it holds no credential of
its own. Six functions, each returning a `Promise`:

```js
ObservatoryData.getOverview()
ObservatoryData.getTopPosts()
ObservatoryData.getReadingMetrics()
ObservatoryData.getReferenceClicks()
ObservatoryData.getReadingPaths()
ObservatoryData.getAcquisition()
```

**No silent fallback to fake data.** If `analytics/observatory-config.js`
has no `workerUrl` set, or the Worker request fails for any reason, every
section on the dashboard shows its own "Unable to load: ..." message —
never a fabricated number. The status badge at the top reflects this
honestly: `LIVE DATA` (with a real "updated N ago" timestamp) when the
Worker responded, or `UNAVAILABLE` with the specific error when it didn't.

The old fully-fabricated prototype still exists at `demo-data.js` for
reference/design purposes, and is loaded instead of the real data layer
only when the page is opened with `?demo=1` — clearly labeled `DEMO DATA`
whenever it's active, and never the default.

One metric — median session duration, in `getReadingMetrics()` — always
returns `null` and renders as "Not available", live or demo, because it
isn't one of Umami's default aggregate metrics and computing it honestly
would need a custom query this system doesn't implement.

## Configuring the live connection

`analytics/observatory-config.js`:

```js
window.OBSERVATORY_CONFIG = {
    workerUrl: "https://observatory-worker.your-subdomain.workers.dev/api/observatory"
};
```

This is a public endpoint address, not a secret. See `worker/README.md`
for exactly how to deploy the Worker and get this URL — it requires your
own Cloudflare account and a Umami API key, neither of which this
repository or I can provide.

## Security boundary

```
Browser ──(no secret)──> Cloudflare Worker ──(UMAMI_API_TOKEN, Cloudflare secret)──> Umami
```

- `UMAMI_API_TOKEN` lives only as a Cloudflare secret (`wrangler secret
  put`), set directly against the deployed Worker. It is never written to
  any file in this repository, never appears in `wrangler.toml`, and is
  never included in any Worker response.
- The Worker exposes exactly one route, `/api/observatory`, returning
  only aggregated counts (page views, click counts, referrer labels) —
  never raw per-visitor data, never the token.
- CORS on the Worker is restricted to `https://diogofranquinho.com`
  (`ALLOWED_ORIGIN` in `wrangler.toml`).
- `worker/.dev.vars` (used only for local `wrangler dev` testing) is
  listed in `.gitignore` and must never be committed.
