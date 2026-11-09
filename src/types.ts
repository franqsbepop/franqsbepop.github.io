// Content model for the site. Every page is rendered from data that satisfies
// these types; editing content means editing the files in src/content/.
//
// Conventions
// - Dates are ISO strings: 'YYYY-MM-DD' (or 'YYYY-MM' / 'YYYY' when only that
//   much is known).
// - Optional fields left undefined are simply not rendered. Fields that are
//   known to be missing are listed in `TODO` comments and reported by
//   `npm run check` as content to complete; they are never invented.
// - Fields ending in `Html` contain trusted, hand-written markup and are
//   emitted verbatim. Every other string is escaped.

export interface Link {
  label: string;
  url: string;
}

// ---------------------------------------------------------------------------
// Identity & contact
// ---------------------------------------------------------------------------

export interface Profile {
  id: 'scholar' | 'orcid' | 'linkedin' | 'github' | 'arxiv' | (string & {});
  label: string;
  url: string;
  /** Hidden profiles stay in the data but are not shown on the site. */
  hidden?: boolean;
  /** Why the profile is hidden — shown by `npm run check`. */
  note?: string;
}

export interface EmailAddress {
  address: string;
  /** Short context shown next to the address, e.g. "University of Amsterdam". */
  context: string;
}

export interface Person {
  name: string;
  shortName: string;
  givenName: string;
  familyName: string;
  role: string;
  institutionsLine: string;
  headline: { before: string; emphasis: string; after: string };
  /** Biography paragraphs (trusted markup). */
  bioHtml: string[];
  invitation: string;
  /** Short note above the contact details. */
  contactNote: string;
  emails: EmailAddress[];
  profiles: Profile[];
  knowsAbout: string[];
  siteUrl: string;
}

export interface HeroFact {
  label: string;
  value: string;
  href?: string;
}

export interface Photo {
  id: string;
  /** Base path without size/extension, e.g. 'images/profile/formal'. */
  base: string;
  alt: string;
  /** Short accessible description of the slide, e.g. "Academic portrait". */
  label: string;
  portraitWidths: number[];
  squareWidths: number[];
}

// ---------------------------------------------------------------------------
// Affiliations
// ---------------------------------------------------------------------------

export interface Logo {
  src: string;
  /** Optional WebP alternative for raster logos. */
  webp?: string;
  /** Intrinsic dimensions of the file (used to reserve space). */
  width: number;
  height: number;
  /** Rendered height in CSS pixels, tuned per logo for optical balance. */
  displayHeight: number;
}

export interface Institution {
  id: string;
  name: string;
  shortName?: string;
  url: string;
  logo?: Logo;
}

export interface AffiliationGroup {
  city: string;
  /** Institutions shown as logos, in display order. */
  logos: string[];
  /** Units listed in text under the logos (institutes, groups, universities). */
  units: { name: string; url?: string; parent?: string }[];
}

// ---------------------------------------------------------------------------
// Research output
// ---------------------------------------------------------------------------

export interface Author {
  family: string;
  initials: string;
  given?: string;
  /** Marks the site owner so the name can be emphasised. */
  self?: boolean;
}

export interface Publication {
  id: string;
  type: 'journal-article' | 'preprint' | 'conference-paper' | 'book-chapter' | 'thesis';
  title: string;
  authors: Author[];
  year: number;
  /** Date of first online publication, if known. */
  publishedOnline?: string;
  venue: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  /** Short abstract — only ever copied from the published paper. */
  abstract?: string;
  topics: string[];
  /** BibTeX key used by the "Cite" panel. */
  bibKey: string;
}

export type PresentationType = 'Talk' | 'Poster' | 'Invited talk' | 'Seminar';

export interface Talk {
  id: string;
  event: string;
  /** Short name used in compact contexts, e.g. "VCMF 2025". */
  shortName?: string;
  url: string;
  start: string;
  end?: string;
  type: PresentationType;
  city: string;
  country: string;
  /** Institution hosting the event on its own premises. */
  host?: string;
  /** Organising institution, when the event is held elsewhere (e.g. a hotel). */
  organiser?: string;
  /** Physical venue when it differs from, or refines, the host. */
  venue?: string;
  description: string;
  /** Confirmed presentation title; leave undefined until confirmed. */
  presentationTitle?: string;
  /** Publication the presentation is based on, if confirmed. */
  publicationId?: string;
  /** Date of the presentation itself, when confirmed from the programme. */
  presentedOn?: string;
  /** Where the presentation details were confirmed (programme, abstract book). */
  source?: Link;
  todo?: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  field: string;
  start: number;
  end?: number;
  institutions: { name: string; url: string }[];
  /** Units within the institutions (research groups, institutes). */
  units?: { name: string; url?: string }[];
  supervisors?: { name: string; url?: string }[];
  coSupervisors?: { name: string; url?: string }[];
  note?: string;
  current?: boolean;
}

export interface TeachingEntry {
  /** Academic year, e.g. '2025/26'. */
  year: string;
  term: 'Fall' | 'Spring' | 'Full year';
  course: string;
  courseUrl?: string;
  role: string;
  institutionId: string;
}

export interface TeachingInstitution {
  id: string;
  name: string;
  shortName: string;
  url: string;
}

export interface ResearchArea {
  id: string;
  name: string;
  /** Mathematical notation used as the area's typographic emblem (trusted markup). */
  emblemHtml: string;
  emblemLabel: string;
  /** The technical description, as published on the previous site. */
  technical: string;
  /** A plain-language explanation for readers outside the field. */
  plain: string;
}

// ---------------------------------------------------------------------------
// Notes
// ---------------------------------------------------------------------------

export interface Note {
  title: string;
  href: string;
  format: 'HTML' | 'PDF';
  updated?: string;
  /** Short description for the library listing. */
  description?: string;
}

export interface NoteSubject {
  id: string;
  name: string;
  /** Folder under /notes that holds the subject's pages. */
  folder: string;
  notes: Note[];
}

export interface NoteShelf {
  id: string;
  name: string;
  description: string;
  subjects: NoteSubject[];
}

// ---------------------------------------------------------------------------
// Outreach
// ---------------------------------------------------------------------------

export interface OutreachItem {
  id: string;
  name: string;
  fullName?: string;
  url?: string;
  role: string;
  period?: string;
  description: string;
  related?: Link[];
  todo?: string[];
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

export interface BlogPost {
  /** Path relative to the site root, e.g. 'posts/post39.html'. */
  href: string;
  title: string;
  deck?: string;
  date: string;
  /** Summary paragraphs (trusted markup copied from the original blog index). */
  summaryHtml: string[];
  /** Filter slugs (the original data-tags attribute). */
  tags: string[];
  /** Visible topic labels. */
  labels: string[];
}

export interface BlogTopic {
  slug: string;
  label: string;
}

export interface BlogrollGroup {
  name: string;
  links: Link[];
}
