# Observatory Worker

The private serverless layer between the Observatory dashboard and Umami's
REST API. This is the only piece of the whole analytics system allowed to
hold the Umami API token.

```
analytics/data.js  --(plain GET, no secret)-->  this Worker  --(Bearer UMAMI_API_TOKEN)-->  Umami Cloud
```

It exposes exactly one route: `GET /api/observatory` (optionally
`?days=N`, default 30). Everything else 404s. It is deliberately not a
general Umami proxy.

## What you need to do (I cannot do this part — it requires your Cloudflare account)

### 1. Install Wrangler and log in

```bash
npm install -g wrangler
wrangler login
```

This opens a browser to authenticate Wrangler with your Cloudflare
account. No token is typed or stored in this repo for this step.

### 2. Generate a Umami API key

In your Umami Cloud dashboard: profile icon → **Settings** → **API keys**
→ **Create key**. Copy it — you won't be able to see it again after
leaving that screen.

### 3. Store the API key as a Cloudflare secret (never in git)

From the `worker/` directory:

```bash
cd worker
wrangler secret put UMAMI_API_TOKEN
```

Wrangler will prompt you to paste the key interactively. It's stored
encrypted in Cloudflare, associated with this Worker, and is never written
to any file in this repository.

### 4. (Optional) Test locally before deploying

Create `worker/.dev.vars` (already in `.gitignore` — it will never be
committed) with:

```
UMAMI_API_TOKEN=paste-your-key-here
```

Then:

```bash
wrangler dev
```

This runs the Worker on `http://localhost:8787`. Test it with:

```bash
curl http://localhost:8787/api/observatory
```

You should get back a JSON payload with `overview`, `topPosts`,
`readingMetrics`, `referenceClicks`, `readingPaths`, `acquisition`, and a
`warnings` array (empty if everything succeeded).

Delete `worker/.dev.vars` when you're done testing locally, or just leave
it — it's gitignored either way.

### 5. Deploy

```bash
wrangler deploy
```

This prints the live URL, something like:

```
https://observatory-worker.<your-subdomain>.workers.dev
```

**Send me that URL** — it needs to go into `analytics/observatory-config.js`
(a plain, non-secret config value, same pattern as `js/analytics-config.js`).

## Configuration reference

| Name | Where it lives | Secret? |
|---|---|---|
| `UMAMI_API_TOKEN` | Cloudflare secret (`wrangler secret put`) | **Yes — never in git, never in a response** |
| `UMAMI_WEBSITE_ID` | `wrangler.toml` `[vars]` | No — already public in every page's tracking script |
| `UMAMI_API_BASE` | `wrangler.toml` `[vars]` | No — just an API host |
| `ALLOWED_ORIGIN` | `wrangler.toml` `[vars]` | No — restricts browser CORS to `https://diogofranquinho.com` |

If you ever need to rotate the token: generate a new key in Umami, run
`wrangler secret put UMAMI_API_TOKEN` again with the new value, delete the
old key from Umami's dashboard.

## What this Worker deliberately does not do

- It is not a general Umami API proxy — only `/api/observatory` exists.
- It never returns `UMAMI_API_TOKEN` or any other secret in a response.
- It fails with a clear JSON error if `UMAMI_API_TOKEN` or
  `UMAMI_WEBSITE_ID` is missing, rather than guessing.
- CORS is restricted to `ALLOWED_ORIGIN` — set it to `*` only if you
  intentionally want this endpoint publicly fetchable from any site (the
  data it returns is aggregate, non-PII analytics, so the risk of that is
  low, but restricting it is free and simple).
- Responses are cached for 60 seconds (Workers' built-in Cache API, no KV
  needed) so a page reload doesn't re-hit Umami's rate-limited API.
