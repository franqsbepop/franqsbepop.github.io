# Content-completion checklist

Information that could not be confirmed from the previous site, the
repository or an official source, and was therefore left out rather than
guessed. `npm run check` prints the live version of the first list.

## Needs your input

- [ ] **CNA RTG Summer School 2026 (Carnegie Mellon)** — title of the poster.
      Add it as `presentationTitle` in `src/content/talks.ts`.
- [ ] **23rd Winter School on Mathematical Finance 2026 (Soesterberg)** — title
      of the poster. The 2026 brochure does not list posters.
- [ ] **Gradient** — a website link and a one-line description, if there is a
      public site (`src/content/academic.ts`). The only confirmed fact is that
      it co-organises ONIA with TreeTree2, and that you are a co-founder.
- [ ] **Publication abstract (optional)** — the paper's abstract is not in the
      DOI metadata and the paper is not on arXiv. Paste the published abstract
      into `abstract` in `src/content/publications.ts` if you want it shown.
- [ ] **Course pages (optional)** — `courseUrl` can be added to each teaching
      entry in `src/content/academic.ts`; only the institutions are linked now.
- [ ] **arXiv profile** — hidden because the author search returns no results;
      set `hidden: false` in `src/content/person.ts` once a preprint is posted.

## Please review

- **Publication details** — volume, issue and pages (24(8), 1129–1156) come
  from the DOI record at Crossref. The previous site showed the online-first
  pagination (1–28).
- **Talk dates** — the "presented on" dates and session details were taken
  from the official programmes (Bachelier 2026: 30 June, VCMF: 11 July 2025,
  SCF: 4 September 2025, LYMC: 12 April 2025).
- **ONIA role** — shown as "Co-founder · Organising Committee", combining the
  previous biography with the Organising Committee listing on onia.pt.
- **JunctionX Lisbon role** — "Event lead, founding edition (2025)", from the
  2025 edition's team page. The 2026 page does not list the organisers.
- **Photo caption** — "Two samples from the same distribution." (the slide
  picker is labelled ω₁, ω₂). Change `photoCaption` in `src/content/person.ts`.

## Pre-existing issues found in hand-written pages (not changed)

- `posts/post2.html` references `blog_images/bachelier-thesis.jpg`, which is
  not in the repository.
- `posts/post40.html` (uncommitted draft) has footnote back-links
  `#fnref1`–`#fnref4` without matching anchors.
- The blogroll link to `gradient.ngo` no longer resolves.
- A Wharton page linked from a post (`~steele/Courses/434/…/IndexTukey.htm`)
  returns 404.
- Blog posts use `<h3>` for section headings directly under the title, and
  notes put an `<h3>` "Contents" heading before their `<h2>` sections. Screen
  readers cope, but the heading outline skips a level.
- `js/post-utilities.js` keeps its own copy of post titles and dates for
  "Related posts", and some differ from the blog index (e.g. post1 and post5).
- Posts not linked from the blog index (drafts or retired):
  post9, 10, 11, 16, 17, 19, 22, 23, 31, 34, 35, 36 (empty), 38 (draft), postX.
  They remain reachable at their URLs, as before.
