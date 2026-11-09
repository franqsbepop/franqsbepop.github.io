// Site checks: `npm run check` (add `--external` to also test external links).
//
// Errors (non-zero exit):
//   - broken internal links or #fragments in generated pages or shared chrome
//   - notes or posts missing from the content files, or listed but missing
//   - legacy URLs / anchors that no longer resolve
//   - structural HTML problems in generated pages (h1 count, heading order,
//     missing alt text, duplicate ids, unsafe target=_blank, missing meta)
// Warnings:
//   - broken links inside hand-written posts and notes (pre-existing content)
// Report:
//   - the content-completion checklist (fields marked TODO in src/content)

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, normalize, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { posts } from './content/posts.ts';
import { noteShelves } from './content/notes.ts';
import { talks } from './content/talks.ts';
import { outreach } from './content/academic.ts';
import { publications } from './content/publications.ts';
import { person } from './content/person.ts';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const GENERATED = ['index.html', 'academic.html', 'blog.html', '404.html', 'talks.html', 'teaching.html'];
const SKIP_DIRS = new Set(['node_modules', '.git', '.claude', '.cursor', 'src', 'scripts', 'analytics', 'worker', 'experiments', 'references']);

const errors: string[] = [];
const warnings: string[] = [];
const error = (msg: string) => errors.push(msg);
const warn = (msg: string) => warnings.push(msg);

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(join(ROOT, dir))) {
    if (SKIP_DIRS.has(name) || name.startsWith('.')) continue;
    const rel = dir ? `${dir}/${name}` : name;
    if (statSync(join(ROOT, rel)).isDirectory()) walk(rel, out);
    else out.push(rel);
  }
  return out;
}

const read = (rel: string) => readFileSync(join(ROOT, rel), 'utf8');
const files = walk('');
const htmlFiles = files.filter((f) => f.endsWith('.html'));

// ---------------------------------------------------------------------------
// Ids per page (for fragment checks)
// ---------------------------------------------------------------------------

const idCache = new Map<string, Set<string>>();
function idsOf(rel: string): Set<string> {
  if (!idCache.has(rel)) {
    const ids = new Set<string>();
    for (const m of read(rel).matchAll(/\sid="([^"]+)"/g)) ids.add(m[1]);
    idCache.set(rel, ids);
  }
  return idCache.get(rel)!;
}

// Fragments handled by js/site.js on the homepage (legacy anchors).
const LEGACY_HOME_ANCHORS = ['research', 'teaching', 'notes', 'talks', 'archive'];

// ---------------------------------------------------------------------------
// Internal links
// ---------------------------------------------------------------------------

const CHROME_RE = /<!-- site:header[\s\S]*?<!-- \/site:header -->|<!-- site:footer[\s\S]*?<!-- \/site:footer -->/g;

function checkLinks(rel: string): void {
  const isGenerated = GENERATED.includes(rel);
  // Inline scripts build markup at runtime (e.g. the reading list); skip them.
  const html = read(rel).replace(/(<script\b[^>]*>)[\s\S]*?<\/script>/g, '$1</script>');
  // The shared header and footer are checked strictly on every page; links in
  // the body of hand-written posts and notes only produce warnings.
  const chromeUrls = new Set([...(html.match(CHROME_RE) ?? []).join('').matchAll(/\shref="([^"]+)"/g)].map((m) => m[1]));

  for (const m of html.matchAll(/\s(href|src|srcset|imagesrcset)="([^"]+)"/g)) {
    const [, attr, value] = m;
    const urls = attr.endsWith('srcset') ? value.split(',').map((s) => s.trim().split(/\s+/)[0]) : [value];
    for (const url of urls) {
      if (/^(https?:|mailto:|tel:|data:|javascript:|#$)/.test(url)) continue;
      const report = isGenerated || chromeUrls.has(url) ? error : warn;
      const [pathPart, fragment] = url.split('#');
      const cleanPath = decodeURIComponent(pathPart.split('?')[0]);
      let target: string;
      if (!cleanPath) target = rel;
      else if (cleanPath.startsWith('/')) target = normalize(cleanPath.slice(1) || 'index.html');
      else target = normalize(join(dirname(rel), cleanPath));
      target = target.split(sep).join('/');
      if (target === '.' || target.endsWith('/')) target = `${target === '.' ? '' : target}index.html`;
      if (!existsSync(join(ROOT, target))) {
        report(`${rel}: broken link → ${url}`);
        continue;
      }
      if (fragment && target.endsWith('.html')) {
        const ok = idsOf(target).has(fragment) || (target === 'index.html' && LEGACY_HOME_ANCHORS.includes(fragment));
        if (!ok) report(`${rel}: missing anchor → ${url}`);
      }
    }
  }
}

for (const f of htmlFiles) checkLinks(f);

// ---------------------------------------------------------------------------
// Content coverage: nothing on disk is orphaned, nothing listed is missing
// ---------------------------------------------------------------------------

const listedNotes = new Set(noteShelves.flatMap((s) => s.subjects.flatMap((sub) => sub.notes.map((n) => n.href))));
const noteFiles = files.filter((f) => f.startsWith('notes/') && /\.(html|pdf)$/.test(f));
for (const f of noteFiles) if (!listedNotes.has(f)) error(`notes: ${f} exists but is not listed in src/content/notes.ts`);
for (const href of listedNotes) if (!existsSync(join(ROOT, href))) error(`notes: ${href} is listed but does not exist`);

for (const p of posts) if (!existsSync(join(ROOT, p.href))) error(`posts: ${p.href} is listed but does not exist`);
const listedPosts = new Set(posts.map((p) => p.href));
const unlisted = files.filter((f) => /^posts\/post[^/]*\.html$/.test(f) && !listedPosts.has(f));

// ---------------------------------------------------------------------------
// Legacy URLs
// ---------------------------------------------------------------------------

for (const [legacy, target] of [['talks.html', 'academic.html#talks'], ['teaching.html', 'academic.html#teaching']]) {
  const html = existsSync(join(ROOT, legacy)) ? read(legacy) : '';
  if (!html.includes(`url=${target}`)) error(`legacy: ${legacy} does not redirect to ${target}`);
}
for (const id of ['biography', 'publications', 'contact', 'introduction']) {
  if (!idsOf('index.html').has(id)) error(`legacy: index.html#${id} no longer exists`);
}
for (const id of ['research', 'teaching', 'notes', 'talks']) {
  if (!idsOf('academic.html').has(id)) error(`legacy: academic.html#${id} (target of index.html#${id}) is missing`);
}

// ---------------------------------------------------------------------------
// Structure of generated pages
// ---------------------------------------------------------------------------

for (const rel of GENERATED.filter((f) => !['talks.html', 'teaching.html'].includes(f))) {
  const html = read(rel);
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) error(`${rel}: expected exactly one <h1>, found ${h1}`);
  let previous = 0;
  for (const m of html.matchAll(/<h([1-6])[\s>]/g)) {
    const level = Number(m[1]);
    if (previous && level > previous + 1) error(`${rel}: heading level jumps from h${previous} to h${level}`);
    previous = level;
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) error(`${rel}: <img> without alt: ${m[0].slice(0, 80)}`);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  for (const id of new Set(ids.filter((id, i) => ids.indexOf(id) !== i))) error(`${rel}: duplicate id "${id}"`);
  for (const m of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    if (!/rel="noopener noreferrer"/.test(m[0])) error(`${rel}: target=_blank without rel="noopener noreferrer"`);
  }
  for (const needle of ['<html lang="en">', '<meta name="description"', '<link rel="canonical"', '<title>', '<meta name="viewport"']) {
    if (!html.includes(needle)) error(`${rel}: missing ${needle}`);
  }
}

// ---------------------------------------------------------------------------
// Content-completion checklist
// ---------------------------------------------------------------------------

const todo: string[] = [];
for (const t of talks) {
  if (!t.presentationTitle) todo.push(`Talk "${t.shortName ?? t.event}": presentation title not yet confirmed.`);
  for (const item of t.todo ?? []) if (!/title/i.test(item)) todo.push(`Talk "${t.shortName ?? t.event}": ${item}`);
}
for (const o of outreach) for (const item of o.todo ?? []) todo.push(`Outreach "${o.name}": ${item}`);
for (const p of publications) if (!p.abstract) todo.push(`Publication "${p.title.slice(0, 50)}…": no abstract shown (optional).`);
for (const p of person.profiles) if (p.hidden) todo.push(`Profile "${p.label}" is hidden: ${p.note ?? ''}`);

// ---------------------------------------------------------------------------
// External links (optional)
// ---------------------------------------------------------------------------

async function checkExternal(): Promise<void> {
  const urls = new Set<string>();
  for (const f of [...GENERATED, ...htmlFiles.filter((f) => !GENERATED.includes(f))]) {
    for (const m of read(f).matchAll(/\shref="(https?:[^"]+)"/g)) urls.add(m[1].replace(/&amp;/g, '&'));
  }
  const list = [...urls].sort();
  console.log(`\nChecking ${list.length} external URLs…`);
  const failures: string[] = [];
  const ua = 'Mozilla/5.0 (compatible; site-link-check; +https://diogofranquinho.com)';
  let i = 0;
  async function worker(): Promise<void> {
    while (i < list.length) {
      const url = list[i++];
      try {
        let res = await fetch(url, { method: 'HEAD', redirect: 'follow', headers: { 'user-agent': ua }, signal: AbortSignal.timeout(20000) });
        if (res.status >= 400) res = await fetch(url, { method: 'GET', redirect: 'follow', headers: { 'user-agent': ua }, signal: AbortSignal.timeout(20000) });
        if (res.status >= 400) failures.push(`${res.status}  ${url}`);
      } catch (e) {
        failures.push(`ERR  ${url}  (${(e as Error).message})`);
      }
    }
  }
  await Promise.all(Array.from({ length: 8 }, worker));
  if (failures.length) {
    console.log(`\n${failures.length} external URL(s) did not respond with success (some sites block automated requests):`);
    for (const f of failures.sort()) console.log(`  ${f}`);
  } else {
    console.log('All external URLs responded successfully.');
  }
}

// ---------------------------------------------------------------------------

const rel = (p: string) => relative(ROOT, join(ROOT, p));
console.log(`Checked ${htmlFiles.length} HTML pages (${GENERATED.length} generated), ${listedNotes.size} notes, ${posts.length} listed posts.`);
if (unlisted.length) console.log(`Unlisted post files (reachable by URL, not shown on the blog index): ${unlisted.map(rel).join(', ')}`);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s) in hand-written content (pre-existing, not fixed automatically):`);
  for (const w of warnings) console.log(`  ⚠ ${w}`);
}
console.log(`\nContent to complete (${todo.length}):`);
for (const t of todo) console.log(`  ☐ ${t}`);
if (process.argv.includes('--external')) await checkExternal();
if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('\nAll checks passed.');
