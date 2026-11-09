import type { AffiliationGroup, Institution } from '../types.ts';

// Logos are the official assets published on each institution's website.
// See scripts/assets.sh (`logos`) for their exact sources. Each logo is shown
// as large as its cell allows, capped at `displayHeight` CSS pixels so that
// marks with very different proportions read at a similar optical size;
// proportions themselves are never changed.

export const institutions: Record<string, Institution> = {
  uva: {
    id: 'uva',
    name: 'University of Amsterdam',
    shortName: 'UvA',
    url: 'https://www.uva.nl/en',
    logo: { src: 'images/logos/uva.svg', width: 200, height: 42, displayHeight: 34 },
  },
  csl: {
    id: 'csl',
    name: 'Computational Science Lab',
    shortName: 'CSL',
    url: 'https://uva.computationalscience.nl/',
    logo: { src: 'images/logos/csl.png', webp: 'images/logos/csl.webp', width: 640, height: 177, displayHeight: 42 },
  },
  ist: {
    id: 'ist',
    name: 'Instituto Superior Técnico',
    shortName: 'IST',
    url: 'https://tecnico.ulisboa.pt/en/',
    logo: { src: 'images/logos/tecnico.svg', width: 220, height: 33, displayHeight: 31 },
  },
  gfm: {
    id: 'gfm',
    name: 'Grupo de Física Matemática',
    shortName: 'GFM',
    url: 'https://fisica-matematica.pt/en/',
    logo: { src: 'images/logos/gfm.png', webp: 'images/logos/gfm.webp', width: 640, height: 126, displayHeight: 30 },
  },
  ulisboa: {
    id: 'ulisboa',
    name: 'Universidade de Lisboa',
    shortName: 'ULisboa',
    url: 'https://www.ulisboa.pt/en',
    logo: { src: 'images/logos/ulisboa.svg', width: 402, height: 83, displayHeight: 30 },
  },
};

/** Arrangement used on the homepage, modelled on the academic email signature. */
export const affiliationGroups: AffiliationGroup[] = [
  {
    city: 'Amsterdam',
    logos: ['uva', 'csl'],
    units: [
      { name: 'Korteweg-de Vries Institute for Mathematics (KdVI)', url: 'https://kdvi.uva.nl/', parent: 'University of Amsterdam' },
      { name: 'Computational Science Lab', url: 'https://uva.computationalscience.nl/', parent: 'Informatics Institute, University of Amsterdam' },
    ],
  },
  {
    city: 'Lisbon',
    logos: ['ist', 'gfm', 'ulisboa'],
    units: [
      { name: 'Instituto Superior Técnico', url: 'https://tecnico.ulisboa.pt/en/', parent: 'Universidade de Lisboa' },
      { name: 'Grupo de Física Matemática (GFM)', url: 'https://fisica-matematica.pt/en/', parent: 'Instituto Superior Técnico, Universidade de Lisboa' },
    ],
  },
];
