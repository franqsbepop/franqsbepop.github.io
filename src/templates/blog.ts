import { html, raw, extLink, type Html } from '../lib/html.ts';
import { formatDate, formatDateShort } from '../lib/dates.ts';
import { person } from '../content/person.ts';
import { posts, blogIntro, blogTopics, blogroll } from '../content/posts.ts';
import { page, uiIcon } from './layout.ts';
import { section, pageLabel } from './components.ts';
import { blogJsonLd } from './structured-data.ts';
import type { BlogPost } from '../types.ts';

export interface ShelfBook {
  title: string;
  author: string;
  cover: string;
}

function postItem(p: BlogPost): Html {
  return html`<li class="post" data-post data-tags="${p.tags.join(',')}">
  <p class="post__date"><time datetime="${p.date}" title="${formatDate(p.date)}">${formatDateShort(p.date)}</time></p>
  <article class="post__body">
    <h3 class="post__title"><a href="${p.href}">${p.title}</a></h3>
    ${p.deck ? html`<p class="post__deck">${p.deck}</p>` : ''}
    <div class="post__summary">${p.summaryHtml.map((s) => html`<p>${raw(s)}</p>`)}</div>
    <ul class="tags" aria-label="Topics">${p.labels.map((l) => html`<li class="tag">${l}</li>`)}</ul>
  </article>
</li>`;
}

function bookShelf(books: ShelfBook[], total: number): Html {
  return section({
    id: 'book-reviews',
    num: 1,
    label: 'Book Reviews',
    title: 'Book reviews',
    lead: html`<span class="status-pill">Coming soon</span> Reviews will appear here. In the meantime, these are a few of the ${total} books on my reading list.`,
    className: 'section--tinted section--compact',
    body: html`<ul class="bookshelf">
      ${books.map(
        (b) => html`<li class="book">
        <a href="book_reviews/list.html" class="book__link">
          <span class="book__cover"><img src="book_reviews/covers/${encodeURIComponent(b.cover)}" alt="" width="160" height="240" loading="lazy" decoding="async"></span>
          <span class="book__title">${b.title}</span>
          <span class="book__author">${b.author}</span>
        </a>
      </li>`,
      )}
    </ul>
    <p class="section-more"><a class="button" href="book_reviews/list.html">Browse the full reading list ${uiIcon('arrowRight', 16)}</a></p>`,
  });
}

function postsSection(): Html {
  return section({
    id: 'posts',
    num: 2,
    label: 'Latest Posts',
    title: 'Latest posts',
    body: html`<div class="post-tools" data-blog-tools>
      <label class="field" for="search-box">
        <span class="visually-hidden">Search posts</span>
        ${uiIcon('search', 18)}
        <input type="search" id="search-box" placeholder="Search ${posts.length} posts" autocomplete="off">
      </label>
      <div class="topic-filter" role="group" aria-labelledby="topic-filter-label">
        <p class="topic-filter__label" id="topic-filter-label">Filter by topic</p>
        <div class="topic-filter__buttons">
          <button type="button" class="chip" data-tag="all" aria-pressed="true">All posts</button>
          ${blogTopics.map((t) => html`<button type="button" class="chip" data-tag="${t.slug}" aria-pressed="false">${t.label}</button>`)}
        </div>
        <button type="button" class="clear-filters" data-clear hidden>Clear filters</button>
      </div>
      <p class="filter-info" id="filter-info" role="status" aria-live="polite">Showing all ${posts.length} posts</p>
    </div>
    <ol class="posts" id="blog-posts">
      ${posts.map(postItem)}
    </ol>
    <p class="posts__empty" hidden data-posts-empty>No posts match. Try another search or clear the filters.</p>`,
  });
}

function blogrollSection(): Html {
  return section({
    id: 'blogroll',
    num: 3,
    label: 'Blogroll',
    title: 'Elsewhere worth reading',
    lead: 'Here are some pages I find interesting.',
    className: 'section--compact',
    body: html`<dl class="blogroll">
      ${blogroll.map(
        (g) => html`<div class="blogroll__group"><dt>${g.name}</dt><dd><ul>${g.links.map((l) => html`<li>${extLink(l.url, l.label, { arrow: false })}</li>`)}</ul></dd></div>`,
      )}
    </dl>`,
  });
}

export function blogPage(cssVersion: string, shelf: ShelfBook[], readingListTotal: number): Html {
  const intro = html`<header class="page-intro page-intro--blog">
  <div class="wrap page-intro__grid">
    <div class="page-intro__rail">${pageLabel('Blog')}</div>
    <div class="page-intro__content">
      <h1 class="page-title page-title--serif">Beyond Equilibrium</h1>
      <p class="page-byline">by ${person.shortName}</p>
      <p class="page-lead page-lead--prose">${blogIntro}</p>
    </div>
  </div>
</header>`;

  return page(
    {
      path: 'blog.html',
      title: `Beyond Equilibrium — a blog by ${person.shortName}`,
      description:
        'Beyond Equilibrium: informal, exploratory essays at the intersection of mathematics, science, philosophy, finance and society, by Diogo Sousa Franquinho.',
      section: 'blog',
      bodyClass: 'page-blog',
      scripts: ['js/blog.js'],
      jsonLd: [blogJsonLd(posts)],
      cssVersion,
    },
    html`${intro}
${bookShelf(shelf, readingListTotal)}
${postsSection()}
${blogrollSection()}`,
  );
}
