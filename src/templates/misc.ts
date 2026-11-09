import { html, raw, type Html } from '../lib/html.ts';
import { page, canonicalUrl, GENERATED_NOTICE, uiIcon } from './layout.ts';

/**
 * Compatibility page for a URL that moved. GitHub Pages cannot send HTTP
 * redirects, so this uses an immediate meta refresh plus a script (which
 * preserves any #fragment), a canonical link to the new location, and a
 * visible link for anyone with both disabled.
 */
export function redirectPage(opts: { target: string; label: string; title: string }): Html {
  const canonical = canonicalUrl(opts.target.split('#')[0]);
  return html`<!DOCTYPE html>
${raw(GENERATED_NOTICE)}
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${opts.title} — moved</title>
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="${canonical}">
  <meta http-equiv="refresh" content="0; url=${opts.target}">
  <script>location.replace(${raw(JSON.stringify(opts.target))});</script>
  <style>body{font:17px/1.6 system-ui,sans-serif;max-width:36rem;margin:4rem auto;padding:0 1.25rem;color:#26313f;background:#faf8f4}a{color:#2f5597}</style>
</head>
<body>
  <p>${opts.title} has moved to <a href="${opts.target}">${opts.label}</a>.</p>
</body>
</html>
`;
}

export function notFoundPage(cssVersion: string): Html {
  return page(
    {
      path: '404.html',
      title: 'Page not found — Diogo Sousa Franquinho',
      description: 'The page you were looking for could not be found.',
      section: 'none',
      noindex: true,
      root: '/',
      canonical: canonicalUrl('index.html'),
      bodyClass: 'page-404',
      cssVersion,
    },
    html`<section class="not-found">
  <div class="wrap not-found__inner">
    <p class="section-label"><span class="section-label__num">404</span><span class="section-label__sep" aria-hidden="true">/</span><span class="section-label__text">Not found</span></p>
    <h1 class="page-title page-title--serif">An event of probability zero.</h1>
    <p class="page-lead">The page you were looking for does not exist, or it has moved during the redesign of this site. These should help:</p>
    <ul class="not-found__links">
      <li><a href="/">Home ${uiIcon('arrowRight', 16)}</a><span>Introduction, publications and contact</span></li>
      <li><a href="/academic.html">Academic ${uiIcon('arrowRight', 16)}</a><span>Research, education, talks, teaching, notes and outreach</span></li>
      <li><a href="/blog.html">Blog ${uiIcon('arrowRight', 16)}</a><span>Beyond Equilibrium, the blog, and book reviews</span></li>
    </ul>
  </div>
</section>`,
  );
}
