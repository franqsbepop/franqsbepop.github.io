import type { Talk } from '../types.ts';

// Conference participation, newest first.
//
// Event dates, hosts and venues were checked against each event's official
// website or published programme (November 2026). Presentation titles are
// only filled in where the official programme or book of abstracts lists
// them; the remaining ones are marked TODO and reported by `npm run check`.

export const talks: Talk[] = [
  {
    id: 'bachelier-2026',
    event: 'XIII Bachelier World Congress',
    shortName: 'Bachelier 2026',
    url: 'https://eventi.unibo.it/bachelier',
    start: '2026-06-29',
    end: '2026-07-03',
    type: 'Talk',
    city: 'Bologna',
    country: 'Italy',
    host: 'University of Bologna',
    venue: 'Belmeloro Complex',
    description:
      'The world congress of the Bachelier Finance Society, bringing together academics, practitioners and researchers in quantitative finance to discuss recent advances in financial mathematics.',
    presentationTitle: 'Neural network empowered liquidity pricing in a two-price economy under conic finance settings',
    publicationId: 'liquidity-pricing-2024',
    presentedOn: '2026-06-30',
    source: { label: 'Congress programme', url: 'https://bfs2026-programme.netlify.app' },
  },
  {
    id: 'cmu-pde-probability-2026',
    event: 'Topics at the Interface of PDE and Probability',
    shortName: 'CNA RTG Summer School 2026',
    url: 'https://www.math.cmu.edu/~gautam/c/2026-pde-prob-ss/',
    start: '2026-06-15',
    end: '2026-06-19',
    type: 'Poster',
    city: 'Pittsburgh',
    country: 'United States',
    host: 'Carnegie Mellon University',
    venue: 'Hall of Arts, Room 160',
    description:
      'A summer school of the Center for Nonlinear Analysis research training group, with lecture series by Scott Armstrong, Ivan Corwin, Yu Gu and Lenya Ryzhik on problems where partial differential equations and probability meet.',
    todo: ['Confirm the poster title.'],
  },
  {
    id: 'winter-school-2026',
    event: '23rd Winter School on Mathematical Finance',
    shortName: 'Winter School 2026',
    url: 'https://staff.fnwi.uva.nl/a.khedher/winterschool/WS2026brochure.pdf',
    start: '2026-01-19',
    end: '2026-01-21',
    type: 'Poster',
    city: 'Soesterberg',
    country: 'Netherlands',
    organiser: 'University of Amsterdam',
    venue: 'Conference Hotel Kontakt der Kontinenten',
    description:
      'The annual Dutch winter school in mathematical finance, meeting point for academia and industry. The 2026 edition featured minicourses on reinforcement learning and rough volatility.',
    source: { label: '2026 brochure', url: 'https://staff.fnwi.uva.nl/a.khedher/winterschool/WS2026brochure.pdf' },
    todo: ['Confirm the poster title.'],
  },
  {
    id: 'scf-2025',
    event: 'Stochastics & Computational Finance 2025: New Trends from Academia to Real-World Applications',
    shortName: 'SCF 2025',
    url: 'https://scf2025.iseg.ulisboa.pt/',
    start: '2025-09-02',
    end: '2025-09-05',
    type: 'Talk',
    city: 'Lisbon',
    country: 'Portugal',
    host: 'ISEG, Universidade de Lisboa',
    description:
      'An international conference organised by ISEG and CEMAPRE on recent advances in financial mathematics, held in honour of Albert Shiryaev and Ernst Eberlein.',
    presentationTitle: 'Neural network empowered liquidity pricing in a two-price economy under conic finance settings',
    publicationId: 'liquidity-pricing-2024',
    presentedOn: '2025-09-04',
    source: { label: 'Conference programme', url: 'https://scf2025.iseg.ulisboa.pt/Program_SCF_2025_Sep_2-5_b.pdf' },
  },
  {
    id: 'vcmf-2025',
    event: 'Vienna Congress on Mathematical Finance (VCMF)',
    shortName: 'VCMF 2025',
    url: 'https://fam.tuwien.ac.at/events/vcmf2025/',
    start: '2025-07-09',
    end: '2025-07-11',
    type: 'Talk',
    city: 'Vienna',
    country: 'Austria',
    host: 'WU Vienna University of Economics and Business',
    venue: 'Campus of WU Vienna',
    description:
      'The third edition of an international congress covering the breadth of mathematical finance, from stochastic control and optimal transport to machine learning in finance and insurance.',
    presentationTitle: 'Neural network empowered liquidity pricing in a two-price economy under conic finance settings',
    publicationId: 'liquidity-pricing-2024',
    presentedOn: '2025-07-11',
    source: { label: 'Congress programme', url: 'https://fam.tuwien.ac.at/events/vcmf2025/program.php' },
  },
  {
    id: 'lymc-2025',
    event: 'Lisbon Young Mathematicians Conference (LYMC)',
    shortName: 'LYMC 2025',
    url: 'https://lymc2025.iseg.ulisboa.pt/',
    start: '2025-04-11',
    end: '2025-04-12',
    type: 'Talk',
    city: 'Lisbon',
    country: 'Portugal',
    host: 'ISEG, Universidade de Lisboa',
    description:
      'A conference for students and young researchers in mathematics, statistics and their applications, aimed at fostering discussion and collaboration early in research careers.',
    presentationTitle: 'Neural network empowered liquidity pricing in a two-price economy under conic finance settings',
    publicationId: 'liquidity-pricing-2024',
    presentedOn: '2025-04-12',
    source: { label: 'Conference programme', url: 'https://lymc2025.iseg.ulisboa.pt/Program_LYMC_2025.pdf' },
  },
];
