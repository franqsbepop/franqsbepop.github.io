# diogofranquinho.com

Personal academic website of Diogo Sousa Franquinho, served by GitHub Pages
from the `main` branch (custom domain in `CNAME`).

The site is plain static HTML, CSS and a little vanilla JavaScript. Three
pages are **generated** from typed content files by a small, dependency-free
Node build; everything else is hand-written HTML, exactly as before.

| Page | Source | How to edit |
|---|---|---|
| `index.html` (Home) | `src/content/person.ts`, `publications.ts`, `affiliations.ts` | edit data → `npm run build` |
| `academic.html` (Academic) | `src/content/academic.ts`, `talks.ts`, `notes.ts` | edit data → `npm run build` |
| `blog.html` (Blog index) | `src/content/posts.ts` | edit data → `npm run build` |
| `posts/*.html` (articles) | hand-written | edit the file directly |
| `notes/**` (study notes) | hand-written | edit the file directly |
| `book_reviews/list.html` | hand-written; reads the Goodreads CSV | unchanged |
| `talks.html`, `teaching.html` | generated redirects to `academic.html` | — |
| `404.html`, `sitemap.xml`, `robots.txt` | generated | — |

The build also keeps the hand-written pages in step with the site: it
replaces the block between `<!-- site:header … -->` / `<!-- /site:header -->`
(and the footer equivalent) with the shared header and footer, and versions
the stylesheet link. Nothing else in those files is touched.

## Requirements

- Node.js 22.18 or newer (runs the TypeScript build directly, no compiler step)
- `npm install` once, only for type-checking (`typescript`, `@types/node`)

## Everyday tasks

```sh
npm run build        # regenerate pages, sync header/footer, sitemap
npm run check        # links, anchors, structure, content checklist
npm run typecheck    # strict TypeScript check of src/
npm test             # all three
npm run serve        # preview at http://localhost:8000
```

Always run `npm run build` before committing a content change. The CI
workflow (`.github/workflows/site.yml`) fails if generated files are out of
date or if any check fails.

### Add a publication

Add an entry at the top of `publications` in `src/content/publications.ts`
(copy the existing one). The homepage list, the BibTeX "Cite" panel and the
search-engine structured data all derive from it.

### Add a talk

Add an entry at the top of `talks` in `src/content/talks.ts`. Leave
`presentationTitle` undefined until it is confirmed; `npm run check` lists it
as content to complete.

### Add a blog post

1. Write `posts/postNN.html` (copy an existing post; leave the
   `site:header` / `site:footer` comment blocks in place).
2. Add its card at the top of `posts` in `src/content/posts.ts`.
3. Add the file name to `postOrder` and `postData` in `js/post-utilities.js`
   (previous/next navigation and related posts).
4. `npm run build`.

### Add a note

Create `notes/<subject>/<topic>.html` (copy an existing note), then list it in
`src/content/notes.ts`. `npm run check` fails if a note exists on disk but is
not listed, so nothing can silently disappear from the library.

### Teaching, education, outreach, research areas

All in `src/content/academic.ts`.

## Assets

`scripts/assets.sh` regenerates binary assets reproducibly:

```sh
scripts/assets.sh photos "/path/to/Self Image Bank"   # profile photo crops (WebP + JPEG)
scripts/assets.sh logos                                # official institutional logos
scripts/assets.sh og                                   # social preview image
```

Crop geometry for each photograph is documented in the script. Fonts are
self-hosted in `fonts/` (SIL Open Font License, see `fonts/LICENSE.md`).

## Structure

```
src/
  content/       typed content (the only place facts live)
  templates/     page and component templates (layout, home, academic, blog)
  lib/           HTML escaping, dates, CSV, icons
  build.ts       the build
  check.ts       the checks
css/style.css    the design system (all pages)
js/              site.js (carousel, copy buttons, legacy anchors),
                 academic.js, blog.js, post-utilities.js, analytics
```

Jekyll still runs on GitHub Pages; `_config.yml` excludes the build sources.
