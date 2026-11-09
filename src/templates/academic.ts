import { html, type Html } from '../lib/html.ts';
import { person } from '../content/person.ts';
import { publications } from '../content/publications.ts';
import { talks } from '../content/talks.ts';
import {
  researchIntro,
  researchAreas,
  education,
  teaching,
  teachingInstitutions,
  outreach,
  outreachIntro,
} from '../content/academic.ts';
import { noteShelves, notesIntro, notesDisclaimer } from '../content/notes.ts';
import { page, canonicalUrl } from './layout.ts';
import {
  section,
  sectionLabel,
  pageLabel,
  researchGrid,
  educationTimeline,
  talkSummary,
  talksArchive,
  teachingRecord,
  notesLibrary,
  outreachList,
} from './components.ts';
import { personJsonLd } from './structured-data.ts';

export const ACADEMIC_SECTIONS = [
  { id: 'research', label: 'Research', short: 'Research' },
  { id: 'education', label: 'Education', short: 'Education' },
  { id: 'talks', label: 'Talks & Conferences', short: 'Talks' },
  { id: 'teaching', label: 'Teaching', short: 'Teaching' },
  { id: 'notes', label: 'Notes & Learning Resources', short: 'Notes' },
  { id: 'outreach', label: 'Science Communication & Outreach', short: 'Outreach' },
] as const;

function subnav(): Html {
  return html`<nav class="subnav" aria-label="On this page" data-subnav>
  <div class="wrap">
    <ol class="subnav__list">
      ${ACADEMIC_SECTIONS.map(
        (s, i) => html`<li><a href="#${s.id}" data-subnav-link><span class="subnav__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>${s.short}</a></li>`,
      )}
    </ol>
  </div>
</nav>`;
}

function intro(): Html {
  return html`<header class="page-intro">
  <div class="wrap page-intro__grid">
    <div class="page-intro__rail">${pageLabel('Academic')}</div>
    <div class="page-intro__content">
      <h1 class="page-title">Academic</h1>
      <p class="page-lead">Research, education, talks, teaching, study notes and outreach — the academic side of my work, gathered in one place.</p>
    </div>
  </div>
</header>`;
}

export function academicPage(cssVersion: string): Html {
  const pubById = (id: string) => publications.find((p) => p.id === id);
  const n = (id: (typeof ACADEMIC_SECTIONS)[number]['id']) => ACADEMIC_SECTIONS.findIndex((s) => s.id === id) + 1;
  const label = (id: (typeof ACADEMIC_SECTIONS)[number]['id']) => ACADEMIC_SECTIONS.find((s) => s.id === id)!.label;

  const body = html`${intro()}
${subnav()}
${section({
  id: 'research',
  num: n('research'),
  label: label('research'),
  title: 'Randomness, geometry and markets',
  lead: researchIntro,
  body: researchGrid(researchAreas),
})}
${section({
  id: 'education',
  num: n('education'),
  label: label('education'),
  title: 'From Lancaster to Amsterdam and Lisbon',
  lead: 'A mathematics degree in England, a master’s in stochastics and financial mathematics in Amsterdam, and a joint doctorate between Lisbon and Amsterdam.',
  body: educationTimeline(education),
})}
${section({
  id: 'talks',
  num: n('talks'),
  label: label('talks'),
  title: 'Talks and conferences',
  lead: 'Presentations at international meetings in mathematical finance, stochastic analysis and partial differential equations.',
  body: html`${talkSummary(talks)}${talksArchive(talks, pubById)}`,
})}
${section({
  id: 'teaching',
  num: n('teaching'),
  label: label('teaching'),
  title: 'In the classroom',
  lead: `Teaching assistantships at ${[...new Set(teaching.map((t) => teachingInstitutions[t.institutionId].name))].join(' and ')}, most recent first.`,
  body: teachingRecord(teaching, teachingInstitutions),
})}
${section({
  id: 'notes',
  num: n('notes'),
  label: label('notes'),
  title: 'A library of study notes',
  lead: notesIntro,
  body: notesLibrary(noteShelves, notesDisclaimer),
})}
${section({
  id: 'outreach',
  num: n('outreach'),
  label: label('outreach'),
  title: 'Beyond the seminar room',
  lead: outreachIntro,
  className: 'section--tinted',
  body: outreachList(outreach),
})}`;

  return page(
    {
      path: 'academic.html',
      title: `Academic — Research, talks, teaching & notes · ${person.name}`,
      description:
        'Research areas, education, conference talks, teaching and study notes of Diogo Sousa Franquinho, joint PhD candidate in Mathematics at IST (Universidade de Lisboa) and the University of Amsterdam.',
      section: 'academic',
      bodyClass: 'page-academic',
      scripts: ['js/academic.js'],
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          url: canonicalUrl('academic.html'),
          name: `Academic — ${person.name}`,
          about: personJsonLd(),
        },
      ],
      cssVersion,
    },
    body,
  );
}

// Re-exported for the legacy-hash map in js/site.js and for checks.
export const academicSectionIds = ACADEMIC_SECTIONS.map((s) => s.id);
export { sectionLabel };
