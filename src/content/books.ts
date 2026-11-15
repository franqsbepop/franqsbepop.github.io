// Reading list, read from the Goodreads library export.
//
// To update: on Goodreads, My Books → Import and export → Export Library
// (https://www.goodreads.com/review/import), save the file over
// book_reviews/goodreads_library_export.csv, run
// `python3 book_reviews/fetch_covers.py` for any new covers, then
// `npm run build`.

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { parseCsv } from '../lib/csv.ts';

export type BookShelfName = 'read' | 'currently-reading' | 'to-read';

export interface Book {
  title: string;
  author: string;
  shelf: BookShelfName;
  /** Goodreads "Date Added" (YYYY/MM/DD), used to pick recent books for the blog shelf. */
  dateAdded: string;
  /** File name in book_reviews/covers/, when a cover was found. */
  cover?: string;
}

/** Title as it is alphabetised: leading quotes and punctuation are ignored. */
function sortKey(title: string): string {
  return title.replace(/^[^\p{L}\p{N}]+/u, '');
}

export function byTitle(a: Book, b: Book): number {
  return sortKey(a.title).localeCompare(sortKey(b.title), 'en', { sensitivity: 'base', numeric: true });
}

/** All books in the export, in alphabetical order by title. */
export function loadBooks(root: string): Book[] {
  const rows = parseCsv(readFileSync(join(root, 'book_reviews/goodreads_library_export.csv'), 'utf8'));
  const manifest: Record<string, string> = JSON.parse(readFileSync(join(root, 'book_reviews/covers/manifest.json'), 'utf8'));

  return rows
    .map((row): Book => {
      const cover = manifest[row.Title];
      return {
        title: row.Title,
        author: row.Author.replace(/\s+/g, ' '),
        shelf: (row['Exclusive Shelf'] || 'to-read') as BookShelfName,
        dateAdded: row['Date Added'] ?? '',
        cover: cover && existsSync(join(root, 'book_reviews/covers', cover)) ? cover : undefined,
      };
    })
    .sort(byTitle);
}
