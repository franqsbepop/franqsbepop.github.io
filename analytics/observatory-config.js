// Observatory Worker configuration.
//
// workerUrl is the deployed Cloudflare Worker's /api/observatory endpoint
// (see worker/README.md to deploy it and get this URL). This is a public
// endpoint address, not a secret — it returns only aggregated, non-PII
// analytics data, and holds no credential itself. The Umami API token
// lives only in the Worker's Cloudflare secret store, never here.
//
// Leaving this blank keeps analytics/index.html fully functional: it will
// show a clear "Unable to load live analytics" state instead of silently
// substituting fake numbers. See analytics/README.md.

window.OBSERVATORY_CONFIG = {
    workerUrl: "" // e.g. "https://observatory-worker.your-subdomain.workers.dev/api/observatory"
};
