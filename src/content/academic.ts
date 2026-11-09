import type { EducationEntry, OutreachItem, ResearchArea, TeachingEntry, TeachingInstitution } from '../types.ts';

// ---------------------------------------------------------------------------
// Research
// ---------------------------------------------------------------------------

export const researchIntro =
  'My research sits where probability meets analysis. Stochastic analysis provides a language for systems that evolve randomly in time; optimal transport provides a geometry for comparing probability distributions. Mathematical finance and machine learning supply many of the questions that motivate the work.';

export const researchAreas: ResearchArea[] = [
  {
    id: 'stochastic-analysis',
    name: 'Stochastic Analysis',
    emblemHtml: 'dX<sub>t</sub>',
    emblemLabel: 'd X sub t, a stochastic differential',
    technical:
      'Stochastic differential equations, semimartingale theory and stochastic calculus on infinite-dimensional spaces.',
    plain:
      'The calculus of randomness: how to describe, and compute with, quantities that change unpredictably over time.',
  },
  {
    id: 'optimal-transport',
    name: 'Optimal Transport',
    emblemHtml: 'W<sub>2</sub>(μ,&thinsp;ν)',
    emblemLabel: 'W two of mu and nu, the Wasserstein distance',
    technical: 'Wasserstein geometry, martingale optimal transport and connections to partial differential equations.',
    plain:
      'The most efficient way to move one distribution of mass onto another, which gives a natural way of measuring the distance between probability distributions.',
  },
  {
    id: 'mathematical-finance',
    name: 'Mathematical Finance',
    emblemHtml: '𝔼<sup>ℚ</sup>[&thinsp;·&thinsp;]',
    emblemLabel: 'expectation under the pricing measure Q',
    technical: 'Model-independent pricing, conic finance and large financial markets.',
    plain:
      'How to price and hedge financial contracts robustly: when the model itself is uncertain, when buying and selling prices differ, and when markets contain very many assets.',
  },
  {
    id: 'mathematical-machine-learning',
    name: 'Mathematical Machine Learning',
    emblemHtml: '∇<sub>θ</sub>&thinsp;ℒ',
    emblemLabel: 'the gradient of a loss with respect to parameters theta',
    technical: 'Applications of stochastic analysis and optimal transport to learning theory.',
    plain: 'Using the same tools to understand when and why learning algorithms work.',
  },
];

// ---------------------------------------------------------------------------
// Education (verified against the ORCID record and the previous site)
// ---------------------------------------------------------------------------

export const education: EducationEntry[] = [
  {
    id: 'phd',
    degree: 'PhD',
    field: 'Mathematics (joint degree)',
    start: 2024,
    current: true,
    institutions: [
      { name: 'Instituto Superior Técnico, Universidade de Lisboa', url: 'https://tecnico.ulisboa.pt/en/' },
      { name: 'University of Amsterdam', url: 'https://www.uva.nl/en' },
    ],
    units: [
      { name: 'Grupo de Física Matemática (GFM)', url: 'http://gfm.cii.fc.ul.pt/' },
      { name: 'Korteweg-de Vries Institute for Mathematics (KdVI)', url: 'https://kdvi.uva.nl/' },
    ],
    supervisors: [
      { name: 'Ana Bela Cruzeiro', url: 'http://gfm.cii.fc.ul.pt/people/abcruzeiro/' },
      { name: 'Drona Kandhai', url: 'https://www.uva.nl/profiel/k/a/b.d.kandhai/b.d.kandhai.html' },
    ],
    coSupervisors: [
      { name: 'Sven Karbach', url: 'https://sven-karbach.de/' },
      { name: 'Léonard Monsaingeon', url: 'https://sites.google.com/view/lmonsaingeon/home' },
    ],
  },
  {
    id: 'msc',
    degree: 'MSc',
    field: 'Stochastics and Financial Mathematics',
    start: 2020,
    end: 2023,
    institutions: [{ name: 'University of Amsterdam', url: 'https://www.uva.nl/en' }],
  },
  {
    id: 'bsc',
    degree: 'BSc (Hons)',
    field: 'Mathematics',
    start: 2017,
    end: 2020,
    institutions: [{ name: 'Lancaster University', url: 'https://www.lancaster.ac.uk/' }],
  },
];

// ---------------------------------------------------------------------------
// Teaching
// ---------------------------------------------------------------------------

export const teachingInstitutions: Record<string, TeachingInstitution> = {
  novasbe: {
    id: 'novasbe',
    name: 'Nova School of Business and Economics',
    shortName: 'Nova SBE',
    url: 'https://www.novasbe.unl.pt/en/',
  },
  fcul: {
    id: 'fcul',
    name: 'Faculdade de Ciências, Universidade de Lisboa',
    shortName: 'FCUL',
    url: 'https://ciencias.ulisboa.pt/en',
  },
};

// Newest first. `courseUrl` can be added for each course when available.
export const teaching: TeachingEntry[] = [
  { year: '2025/26', term: 'Spring', course: 'Econometrics', role: 'Teaching assistant', institutionId: 'novasbe' },
  { year: '2025/26', term: 'Fall', course: 'Econometrics', role: 'Teaching assistant', institutionId: 'novasbe' },
  { year: '2025/26', term: 'Fall', course: 'Mathematics for Biologists', role: 'Teaching assistant', institutionId: 'fcul' },
  { year: '2024/25', term: 'Spring', course: 'Machine Learning', role: 'Teaching assistant', institutionId: 'novasbe' },
  { year: '2024/25', term: 'Fall', course: 'Computer Programming', role: 'Teaching assistant', institutionId: 'novasbe' },
];

// ---------------------------------------------------------------------------
// Science communication & outreach (roles confirmed on each initiative's site)
// ---------------------------------------------------------------------------

export const outreachIntro =
  'Mathematics, AI and scientific research are also about education, collaboration and community. Alongside research, I help build initiatives that bring students into contact with these fields.';

export const outreach: OutreachItem[] = [
  {
    id: 'onia',
    name: 'ONIA',
    fullName: 'Olimpíadas Nacionais de Inteligência Artificial · Portuguese Olympiads in Artificial Intelligence',
    url: 'https://onia.pt/',
    role: 'Co-founder · Organising Committee',
    description:
      'The national olympiad in artificial intelligence for students from the 7th to the 12th grade in Portugal. It combines a classroom challenge that requires no programming with an olympiad track that selects the team representing Portugal at the International Olympiad in Artificial Intelligence (IOAI).',
  },
  {
    id: 'gradient',
    name: 'Gradient',
    role: 'Co-founder',
    description: 'Co-organiser of the Portuguese Olympiads in Artificial Intelligence, together with TreeTree2.',
    todo: ['Add a link and a one-line description for Gradient, if it has a public website.'],
  },
  {
    id: 'junctionx-lisbon',
    name: 'JunctionX Lisbon',
    url: 'https://lisbon.hackjunction.com/',
    role: 'Event lead, founding edition',
    period: '2025',
    description:
      'The Lisbon chapter of the international JunctionX hackathon series, bringing students, developers, researchers and companies together to build working prototypes for real challenges.',
    related: [{ label: 'How to Organize an Unforgettable Hackathon', url: 'posts/post30.html' }],
  },
];
