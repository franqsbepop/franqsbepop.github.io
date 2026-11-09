import type { HeroFact, Person, Photo } from '../types.ts';

export const person: Person = {
  name: 'Diogo Sousa Franquinho',
  shortName: 'Diogo Franquinho',
  givenName: 'Diogo',
  familyName: 'Sousa Franquinho',
  role: 'Joint PhD Candidate in Mathematics',
  institutionsLine: 'Universidade de Lisboa · University of Amsterdam',
  headline: { before: 'Understanding ', emphasis: 'uncertainty', after: ' through mathematics.' },
  bioHtml: [
    'I am a joint PhD candidate in Mathematics at Instituto Superior Técnico, Universidade de Lisboa, and the University of Amsterdam.',
    'My research focuses on stochastic analysis and optimal transport, primarily motivated by problems in mathematical finance. It connects probability theory, functional analysis and partial differential equations, with broader interests in machine learning and the mathematical foundations of learning.',
    'I am interested in the mathematical structures underlying complex stochastic systems: how randomness evolves over time, how it can be measured and compared, and how abstract theory connects with practical applications.',
  ],
  invitation:
    'If you are a student, a researcher, or simply someone who shares these interests, I would be glad to hear from you.',
  contactNote:
    'Email is the best way to reach me, whether about research, possible collaborations, teaching or the notes on this site.',
  // Current addresses, as published on the live site (November 2026).
  emails: [
    { address: 'd.sousafranquinho@uva.nl', context: 'University of Amsterdam · KdVI' },
    { address: 'diogo.franquinho@tecnico.ulisboa.pt', context: 'Instituto Superior Técnico' },
  ],
  profiles: [
    { id: 'scholar', label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=SZKugA4AAAAJ&hl=en' },
    { id: 'orcid', label: 'ORCID', url: 'https://orcid.org/0009-0005-7258-5903' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/diogofranquinho' },
    { id: 'github', label: 'GitHub', url: 'https://github.com/franqsbepop' },
    {
      id: 'arxiv',
      label: 'arXiv',
      url: 'https://arxiv.org/search/?searchtype=author&query=Franquinho%2C+D',
      hidden: true,
      note: 'The arXiv author search currently returns no results; un-hide once a preprint is posted.',
    },
  ],
  knowsAbout: [
    'Stochastic analysis',
    'Optimal transport',
    'Mathematical finance',
    'Conic finance',
    'Probability theory',
    'Machine learning',
  ],
  siteUrl: 'https://diogofranquinho.com/',
};

/** Key facts shown under the introduction, in the style of a colophon. */
export const heroFacts: HeroFact[] = [
  { label: 'Research', value: 'Stochastic analysis · Optimal transport' },
  { label: 'Motivated by', value: 'Mathematical finance · Machine learning' },
  { label: 'Affiliations', value: 'IST, ULisboa · KdVI, UvA', href: '#affiliations' },
];

/** The two photographs that rotate in the introduction. */
export const photos: Photo[] = [
  {
    id: 'formal',
    base: 'images/profile/formal',
    alt: 'Portrait of Diogo Sousa Franquinho in a dark blue shirt against a plain blue-grey background.',
    label: 'Academic portrait',
    portraitWidths: [560, 840, 1120],
    squareWidths: [480, 720, 960],
  },
  {
    id: 'coast',
    base: 'images/profile/coast',
    alt: 'Diogo drinking from a coconut on a grassy clifftop above a rocky tropical coastline, with palm trees and the sea behind him.',
    label: 'Fieldwork by the coast',
    portraitWidths: [560, 840, 960],
    squareWidths: [480, 720, 960],
  },
];

/**
 * Caption shared by the photographs. Each photo is one outcome ω of the same
 * experiment; the slide picker is labelled ω₁, ω₂, …
 */
export const photoCaption = 'Two samples from the same distribution.';
