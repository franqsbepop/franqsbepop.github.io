// Site build: `npm run build` (or `node src/build.ts`).
//
// 1. Renders the pages that are generated from content data:
//      index.html, academic.html, blog.html, 404.html
//    plus compatibility pages for moved URLs (talks.html, teaching.html).
// 2. Keeps the hand-written pages (blog posts, notes, reading list) in step
//    with the site: replaces their header and footer with the shared ones,
//    versions the stylesheet link, and removes the obsolete polyfill.io
//    script. Their article content is never touched.
// 3. Writes sitemap.xml and robots.txt.
//
// The build is deterministic: running it twice produces no changes, which the
// CI workflow relies on to detect forgotten rebuilds.

import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { html, type Html } from './lib/html.ts';
import { siteHeader, siteFooter, canonicalUrl, type Section } from './templates/layout.ts';
import { homePage } from './templates/home.ts';
import { academicPage } from './templates/academic.ts';
import { blogPage, type ShelfBook } from './templates/blog.ts';
import { redirectPage, notFoundPage } from './templates/misc.ts';
import { posts } from './content/posts.ts';
import { noteShelves } from './content/notes.ts';
import { parseCsv } from './lib/csv.ts';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));

const changed: string[] = [];
const unchanged: string[] = [];

function writeIfChanged(rel: string, content: string | Html): void {
  const path = join(ROOT, rel);
  const text = String(content);
  if (existsSync(path) && readFileSync(path, 'utf8') === text) {
    unchanged.push(rel);
    return;
  }
  writeFileSync(path, text);
  changed.push(rel);
}

function listFiles(dir: string, filter: (f: string) => boolean): string[] {
  const out: string[] = [];
  for (const name of readdirSync(join(ROOT, dir))) {
    const rel = join(dir, name);
    const st = statSync(join(ROOT, rel));
    if (st.isDirectory()) out.push(...listFiles(rel, filter));
    else if (filter(rel)) out.push(rel.split(sep).join('/'));
  }
  return out.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
}

// ---------------------------------------------------------------------------
// Reading list (for the book shelf on the blog page)
// ---------------------------------------------------------------------------

function readingList(): { shelf: ShelfBook[]; total: number } {
  const rows = parseCsv(readFileSync(join(ROOT, 'book_reviews/goodreads_library_export.csv'), 'utf8'));
  const manifest: Record<string, string> = JSON.parse(readFileSync(join(ROOT, 'book_reviews/covers/manifest.json'), 'utf8'));
  const shelf: ShelfBook[] = [];
  for (const row of rows) {
    const cover = manifest[row.Title];
    if (cover && existsSync(join(ROOT, 'book_reviews/covers', cover))) {
      // Drop series/subtitle noise for the compact shelf; the full title stays on the list page.
      const title = row.Title.replace(/\s*\([^)]*\)\s*$/, '').split(/:\s/)[0];
      shelf.push({ title, author: row.Author, cover });
    }
    if (shelf.length === 6) break;
  }
  return { shelf, total: rows.length };
}

// ---------------------------------------------------------------------------
// Shared chrome for hand-written pages
// ---------------------------------------------------------------------------

const HEADER_START = '<!-- site:header — managed by src/build.ts -->';
const HEADER_END = '<!-- /site:header -->';
const FOOTER_START = '<!-- site:footer — managed by src/build.ts -->';
const FOOTER_END = '<!-- /site:footer -->';

interface Crumb {
  label: string;
  href?: string;
}

function crumbs(list: Crumb[]): Html {
  return html`
  <div class="crumbs">
    <nav class="wrap" aria-label="Breadcrumb">
      <ol>
        ${list.map((c) => html`<li>${c.href ? html`<a href="${c.href}">${c.label}</a>` : html`<span aria-current="page">${c.label}</span>`}</li>`)}
      </ol>
    </nav>
  </div>`;
}

const subjectByFolder = new Map(
  noteShelves.flatMap((shelf) => shelf.subjects.map((s) => [s.folder, s] as const)),
);

function chromeFor(rel: string): { root: string; section: Section; crumbs: Html } {
  const depth = rel.split('/').length - 1;
  const root = '../'.repeat(depth);
  if (rel.startsWith('posts/')) {
    return { root, section: 'blog', crumbs: crumbs([{ label: 'Blog', href: `${root}blog.html` }, { label: 'Beyond Equilibrium', href: `${root}blog.html#posts` }]) };
  }
  if (rel.startsWith('notes/')) {
    const subject = subjectByFolder.get(rel.split('/')[1]);
    return {
      root,
      section: 'academic',
      crumbs: crumbs([
        { label: 'Academic', href: `${root}academic.html` },
        { label: 'Notes', href: `${root}academic.html#notes` },
        ...(subject ? [{ label: subject.name, href: `${root}academic.html#notes-${subject.id}` }] : []),
      ]),
    };
  }
  return { root, section: 'blog', crumbs: crumbs([{ label: 'Blog', href: `${root}blog.html` }, { label: 'Book reviews', href: `${root}blog.html#book-reviews` }]) };
}

function syncChrome(rel: string, cssVersion: string): void {
  let s = readFileSync(join(ROOT, rel), 'utf8');
  if (!s.trim()) return; // empty placeholder files are left alone

  const { root, section, crumbs: crumbsHtml } = chromeFor(rel);
  const header = `${HEADER_START}\n${siteHeader(root, section, crumbsHtml)}\n${HEADER_END}`;
  const footer = `${FOOTER_START}\n${siteFooter(root)}\n${FOOTER_END}`;

  // Header: replace the managed block, or migrate the original navigation.
  if (s.includes(HEADER_START)) {
    s = s.replace(new RegExp(`${esc(HEADER_START)}[\\s\\S]*?${esc(HEADER_END)}`), () => header);
  } else if (/<header>\s*<nav class="top-nav[^"]*">[\s\S]*?<\/nav>\s*(?:<div class="container"><\/div>\s*)?<\/header>/.test(s)) {
    s = s.replace(/<header>\s*<nav class="top-nav[^"]*">[\s\S]*?<\/nav>\s*(?:<div class="container"><\/div>\s*)?<\/header>/, () => header);
  } else if (/<nav class="top-nav[^"]*"[^>]*>[\s\S]*?<\/nav>/.test(s)) {
    s = s.replace(/<nav class="top-nav[^"]*"[^>]*>[\s\S]*?<\/nav>/, () => header);
  } else {
    s = s.replace(/<body([^>]*)>/, (m) => `${m}\n${header}`);
  }

  // Footer: replace the managed block, or the page's last <footer>, or append.
  if (s.includes(FOOTER_START)) {
    s = s.replace(new RegExp(`${esc(FOOTER_START)}[\\s\\S]*?${esc(FOOTER_END)}`), () => footer);
  } else {
    const last = s.lastIndexOf('<footer');
    if (last !== -1 && s.indexOf('</footer>', last) !== -1) {
      const end = s.indexOf('</footer>', last) + '</footer>'.length;
      s = s.slice(0, last) + footer + s.slice(end);
    } else {
      s = s.replace(/<\/body>/, () => `${footer}\n</body>`);
    }
  }

  // Skip-link target.
  s = s.replace(/<main(?![^>]*\bid=)([^>]*)>/, '<main id="main"$1>');
  // Posts: the article title is the page's main heading (was an <h2>).
  if (rel.startsWith('posts/')) {
    s = s.replace(/(<main id="main">\s*<article>(?:(?!<h[1-6]|<p\b)[\s\S])*?)<h2>([\s\S]*?)<\/h2>/, '$1<h1>$2</h1>');
  }
  // Wide code blocks scroll horizontally; make them reachable by keyboard.
  s = s.replace(/<pre(?![^>]*\btabindex=)/g, '<pre tabindex="0"');
  // Cache-busting version on the shared stylesheet.
  s = s.replace(/href="((?:\.\.\/)*)css\/style\.css(?:\?v=[^"]*)?"/g, `href="$1css/style.css?v=${cssVersion}"`);
  // Pages with MathJax: keep over-long formulas from widening the page.
  if (/mathjax/i.test(s) && !s.includes('js/math-overflow.js')) {
    s = s.replace(/<\/head>/, () => `  <script src="${root}js/math-overflow.js" defer></script>\n</head>`);
  }
  // polyfill.io was compromised in 2024; MathJax 3 does not need it.
  s = s.replace(/\s*<script src="https:\/\/polyfill\.io\/[^"]*"><\/script>/g, '');

  writeIfChanged(rel, s);
}

function esc(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---------------------------------------------------------------------------
// sitemap.xml & robots.txt
// ---------------------------------------------------------------------------

function sitemap(noteFiles: string[]): string {
  const urls = [
    canonicalUrl('index.html'),
    canonicalUrl('academic.html'),
    canonicalUrl('blog.html'),
    canonicalUrl('book_reviews/list.html'),
    ...posts.map((p) => canonicalUrl(p.href)),
    ...noteFiles.map((f) => canonicalUrl(f)),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`;
}

const ROBOTS = `# https://www.robotstxt.org/
User-agent: *
Disallow: /analytics/

Sitemap: ${canonicalUrl('sitemap.xml')}
`;

// ---------------------------------------------------------------------------

export function build(): { changed: string[]; unchanged: string[] } {
  const css = readFileSync(join(ROOT, 'css/style.css'), 'utf8');
  const cssVersion = createHash('sha256').update(css).digest('hex').slice(0, 10);

  const { shelf, total } = readingList();
  writeIfChanged('index.html', homePage(cssVersion));
  writeIfChanged('academic.html', academicPage(cssVersion));
  writeIfChanged('blog.html', blogPage(cssVersion, shelf, total));
  writeIfChanged('404.html', notFoundPage(cssVersion));
  writeIfChanged('talks.html', redirectPage({ target: 'academic.html#talks', label: 'Academic → Talks & Conferences', title: 'Talks & Conferences' }));
  writeIfChanged('teaching.html', redirectPage({ target: 'academic.html#teaching', label: 'Academic → Teaching', title: 'Teaching' }));

  // Only the posts themselves: posts/references/ holds standalone supporting
  // files (figures, interactive demos) that must stay untouched.
  const postFiles = listFiles('posts', (f) => /^posts\/[^/]+\.html$/.test(f));
  const noteFiles = listFiles('notes', (f) => /^notes\/[^/]+\/[^/]+\.html$/.test(f));
  for (const rel of [...postFiles, ...noteFiles, 'book_reviews/list.html']) syncChrome(rel, cssVersion);

  const notePdfs = listFiles('notes', (f) => f.endsWith('.pdf'));
  writeIfChanged('sitemap.xml', sitemap([...noteFiles, ...notePdfs]));
  writeIfChanged('robots.txt', ROBOTS);

  return { changed, unchanged };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const t0 = performance.now();
  const result = build();
  const ms = Math.round(performance.now() - t0);
  console.log(`Built in ${ms} ms — ${result.changed.length} file(s) updated, ${result.unchanged.length} unchanged.`);
  for (const f of result.changed) console.log(`  updated  ${relative(ROOT, join(ROOT, f))}`);
}
