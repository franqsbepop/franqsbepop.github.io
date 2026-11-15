// The generated part of book_reviews/list.html: the whole reading list in
// alphabetical order. The build writes it between the `site:books` markers;
// the rest of that page stays hand-written.

import { html, type Html } from '../lib/html.ts';
import type { Book } from '../content/books.ts';

function listItem(b: Book): Html {
  return html`
      <li class="book-review">
        <div class="book-cover" aria-hidden="true">${b.cover ? html`<img src="covers/${encodeURIComponent(b.cover)}" alt="" width="160" height="240" loading="lazy" decoding="async">` : ''}</div>
        <p class="book-review__title">${b.title}</p>
        <p class="book-review__author">${b.author}</p>
        ${b.shelf === 'currently-reading' ? html`<p class="book-review__tags"><span class="book-tag">Reading now</span></p>` : ''}
      </li>`;
}

export function readingListBlock(books: Book[]): Html {
  const count = (shelf: string) => books.filter((b) => b.shelf === shelf).length;

  return html`
    <section class="reading-list" aria-labelledby="reading-list-heading">
      <h2 id="reading-list-heading" class="list-heading">Reading list <span class="list-heading__count">${books.length}</span></h2>
      <p class="list-summary">In alphabetical order: ${count('read')} read, ${count('currently-reading')} in progress, ${count('to-read')} still to read.</p>
      <ul class="book-list">${books.map(listItem)}
      </ul>
    </section>`;
}
