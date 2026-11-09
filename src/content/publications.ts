import type { Publication } from '../types.ts';

// Newest first. Bibliographic details are taken from the publisher's DOI
// record (Crossref). Add new items at the top; the homepage, the structured
// data for search engines and the "Cite" panels all derive from this list.

export const publications: Publication[] = [
  {
    id: 'liquidity-pricing-2024',
    type: 'journal-article',
    title: 'Neural network empowered liquidity pricing in a two-price economy under conic finance settings',
    authors: [
      { family: 'Michielon', given: 'Matteo', initials: 'M.' },
      { family: 'Franquinho', given: 'Diogo', initials: 'D.', self: true },
      { family: 'Gentile', given: 'Alessandro', initials: 'A.' },
      { family: 'Khedher', given: 'Asma', initials: 'A.' },
      { family: 'Spreij', given: 'Peter', initials: 'P.' },
    ],
    year: 2024,
    publishedOnline: '2024-08-29',
    venue: 'Quantitative Finance',
    // Issue pagination from the DOI record. (The previous site listed the
    // online-first pagination, pp. 1–28.)
    volume: '24',
    issue: '8',
    pages: '1129–1156',
    doi: '10.1080/14697688.2024.2390947',
    // TODO(content): add the published abstract here if you would like it shown.
    abstract: undefined,
    topics: ['Mathematical finance', 'Conic finance', 'Neural networks'],
    bibKey: 'michielon2024neural',
  },
];
