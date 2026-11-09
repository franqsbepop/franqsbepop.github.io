// Reusable presentation components. Each takes typed content and returns
// markup; none of them hold content of their own.

import { html, raw, extLink, maybeLink, safeUrl, type Html } from '../lib/html.ts';
import { formatDateRange, formatDate, formatMonth, countryShort } from '../lib/dates.ts';
import { uiIcon, brandIcon } from './layout.ts';
import type {
  AffiliationGroup,
  EducationEntry,
  Institution,
  Logo,
  NoteShelf,
  OutreachItem,
  Photo,
  Profile,
  Publication,
  ResearchArea,
  Talk,
  TeachingEntry,
  TeachingInstitution,
  EmailAddress,
} from '../types.ts';

// ---------------------------------------------------------------------------
// Section scaffolding
// ---------------------------------------------------------------------------

export function sectionLabel(num: number, label: string): Html {
  return html`<p class="section-label"><span class="section-label__num">${String(num).padStart(2, '0')}</span><span class="section-label__sep" aria-hidden="true">/</span><span class="section-label__text">${label}</span></p>`;
}

/** Unnumbered label used in page intros. */
export function pageLabel(text: string): Html {
  return html`<p class="section-label"><span class="section-label__text">${text}</span></p>`;
}

/** A numbered page section with the label in a left rail and content on the right. */
export function section(opts: {
  id: string;
  num: number;
  label: string;
  title: string;
  lead?: string | Html;
  className?: string;
  body: Html;
}): Html {
  const lead = opts.lead ? html`<p class="section-lead">${opts.lead}</p>` : '';
  return html`<section class="section ${opts.className ?? ''}" id="${opts.id}" aria-labelledby="${opts.id}-title">
  <div class="wrap section__grid">
    <div class="section__rail">${sectionLabel(opts.num, opts.label)}</div>
    <div class="section__content">
      <h2 class="section-title" id="${opts.id}-title">${opts.title}</h2>
      ${lead}
      ${opts.body}
    </div>
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// Profile carousel
// ---------------------------------------------------------------------------

function srcset(photo: Photo, crop: 'portrait' | 'square', ext: 'webp' | 'jpg'): string {
  const widths = crop === 'portrait' ? photo.portraitWidths : photo.squareWidths;
  return widths.map((w) => `${photo.base}-${crop}-${w}.${ext} ${w}w`).join(', ');
}

const PORTRAIT_SIZES = '(min-width: 1240px) 470px, (min-width: 900px) 38vw, (min-width: 600px) 70vw, 92vw';
const SQUARE_MEDIA = '(max-width: 599px)';
const SQUARE_SIZES = '92vw';

export function photoPicture(photo: Photo, index: number): Html {
  const first = index === 0;
  const fallback = photo.portraitWidths[1] ?? photo.portraitWidths[0];
  const loading = first ? html` fetchpriority="high"` : html` loading="lazy"`;
  return html`<picture>
        <source media="${SQUARE_MEDIA}" type="image/webp" srcset="${srcset(photo, 'square', 'webp')}" sizes="${SQUARE_SIZES}">
        <source media="${SQUARE_MEDIA}" type="image/jpeg" srcset="${srcset(photo, 'square', 'jpg')}" sizes="${SQUARE_SIZES}">
        <source type="image/webp" srcset="${srcset(photo, 'portrait', 'webp')}" sizes="${PORTRAIT_SIZES}">
        <img src="${photo.base}-portrait-${fallback}.jpg" srcset="${srcset(photo, 'portrait', 'jpg')}" sizes="${PORTRAIT_SIZES}" width="800" height="1000" alt="${photo.alt}" decoding="async"${loading}>
      </picture>`;
}

/** Preload hint for the first photograph (the likely LCP element). */
export function photoPreload(photo: Photo): Html {
  return html`<link rel="preload" as="image" type="image/webp" imagesrcset="${srcset(photo, 'portrait', 'webp')}" imagesizes="${PORTRAIT_SIZES}" media="(min-width: 600px)" fetchpriority="high">
  <link rel="preload" as="image" type="image/webp" imagesrcset="${srcset(photo, 'square', 'webp')}" imagesizes="${SQUARE_SIZES}" media="${SQUARE_MEDIA}" fetchpriority="high">`;
}

const SUBSCRIPT_DIGITS = '₀₁₂₃₄₅₆₇₈₉';
const subscript = (n: number) => String(n).split('').map((d) => SUBSCRIPT_DIGITS[Number(d)]).join('');

export function profileCarousel(photos: Photo[], caption: string, intervalMs = 8000): Html {
  const slides = photos.map(
    (photo, i) => html`<div class="carousel__slide${i === 0 ? ' is-active' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${photos.length}: ${photo.label}" data-slide${i === 0 ? '' : html` aria-hidden="true"`}>
      ${photoPicture(photo, i)}
    </div>`,
  );
  const pickers = photos.map(
    (photo, i) => html`<button type="button" class="carousel__pick" data-goto="${i}" aria-label="Show photograph ${i + 1}: ${photo.label}"${i === 0 ? html` aria-current="true"` : ''}><span aria-hidden="true">ω${subscript(i + 1)}</span></button>`,
  );
  return html`<figure class="hero__figure carousel" aria-roledescription="carousel" aria-label="Photographs of Diogo" data-carousel data-interval="${intervalMs}">
    <div class="carousel__frame" aria-live="off" data-viewport>
      ${slides}
    </div>
    <figcaption class="carousel__bar">
      <span class="carousel__caption">${caption}</span>
      <span class="carousel__controls">
        ${pickers}
        <button type="button" class="carousel__toggle" data-toggle aria-label="Pause the slideshow" hidden>
          <span class="carousel__icon carousel__icon--pause">${uiIcon('pause', 16)}</span>
          <span class="carousel__icon carousel__icon--play">${uiIcon('play', 16)}</span>
        </button>
      </span>
    </figcaption>
  </figure>`;
}

// ---------------------------------------------------------------------------
// Publications
// ---------------------------------------------------------------------------

export function authorList(pub: Publication): Html {
  const names = pub.authors.map((a) => {
    const name = `${a.family}, ${a.initials}`;
    return a.self ? html`<span class="pub__self">${name}</span>` : html`${name}`;
  });
  const parts: Html[] = [];
  names.forEach((n, i) => {
    if (i > 0) parts.push(i === names.length - 1 ? html`, &amp; ` : html`, `);
    parts.push(n);
  });
  return html`${parts}`;
}

export function venueLine(pub: Publication): Html {
  const vol = pub.volume ? html`, <span class="pub__volume">${pub.volume}</span>` : '';
  const issue = pub.issue ? html`(${pub.issue})` : '';
  const pages = pub.pages ? html`, ${pub.pages}` : '';
  return html`<cite class="pub__venue">${pub.venue}</cite>${vol}${issue}${pages}`;
}

export function bibtex(pub: Publication): string {
  const authors = pub.authors.map((a) => `${a.family}, ${a.given ?? a.initials}`).join(' and ');
  const fields: [string, string | undefined][] = [
    ['title', `{${pub.title}}`],
    ['author', authors],
    ['journal', pub.venue],
    ['year', String(pub.year)],
    ['volume', pub.volume],
    ['number', pub.issue],
    ['pages', pub.pages?.replace('–', '--')],
    ['doi', pub.doi],
  ];
  const body = fields
    .filter(([, v]) => v)
    .map(([k, v]) => `  ${k.padEnd(9)} = {${v}}`)
    .join(',\n');
  const kind = pub.type === 'journal-article' ? 'article' : 'misc';
  return `@${kind}{${pub.bibKey},\n${body}\n}`;
}

const PUB_TYPE: Record<Publication['type'], string> = {
  'journal-article': 'Journal article',
  preprint: 'Preprint',
  'conference-paper': 'Conference paper',
  'book-chapter': 'Book chapter',
  thesis: 'Thesis',
};

export function publicationItem(pub: Publication, talkCount: number, talksHref: string): Html {
  const href = pub.doi ? `https://doi.org/${pub.doi}` : pub.url;
  const title = href ? extLink(href, pub.title, { className: 'pub__title-link', arrow: false }) : html`${pub.title}`;
  const abstract = pub.abstract ? html`<p class="pub__abstract">${pub.abstract}</p>` : '';
  const doi = pub.doi
    ? html`<li>${extLink(`https://doi.org/${pub.doi}`, html`<span class="pub__action-label">DOI</span> ${pub.doi}`, { className: 'pub__action' })}</li>`
    : '';
  const talks = talkCount
    ? html`<li><a class="pub__action" href="${talksHref}">Presented at ${talkCount} conferences ${uiIcon('arrowRight', 14)}</a></li>`
    : '';
  return html`<li class="pub" id="pub-${pub.id}">
    <div class="pub__meta">
      <span class="pub__year">${pub.year}</span>
      <span class="pub__type">${PUB_TYPE[pub.type]}</span>
    </div>
    <div class="pub__body">
      <h3 class="pub__title">${title}</h3>
      <p class="pub__authors">${authorList(pub)}</p>
      <p class="pub__venue-line">${venueLine(pub)}</p>
      ${abstract}
      <ul class="tags" aria-label="Topics">${pub.topics.map((t) => html`<li class="tag">${t}</li>`)}</ul>
      <ul class="pub__actions">
        ${doi}
        <li>
          <details class="cite">
            <summary class="pub__action">Cite <span class="visually-hidden">this article</span>(BibTeX)</summary>
            <div class="cite__panel">
              <pre class="cite__code" id="bib-${pub.id}" tabindex="0"><code>${bibtex(pub)}</code></pre>
              <button type="button" class="copy-button" data-copy-target="bib-${pub.id}">${uiIcon('copy', 15)}<span data-copy-label>Copy BibTeX</span></button>
            </div>
          </details>
        </li>
        ${talks}
      </ul>
    </div>
  </li>`;
}

// ---------------------------------------------------------------------------
// Affiliations & contact
// ---------------------------------------------------------------------------

export function logoImage(inst: Institution, logo: Logo, root = ''): Html {
  const w = Math.round((logo.width / logo.height) * logo.displayHeight);
  const style = `--logo-h:${logo.displayHeight}px`;
  const img = html`<img src="${root}${logo.src}" width="${w}" height="${logo.displayHeight}" alt="${inst.name}" loading="lazy" decoding="async">`;
  const pic = logo.webp ? html`<picture><source type="image/webp" srcset="${root}${logo.webp}">${img}</picture>` : img;
  return html`<li class="logo" style="${style}">${extLink(inst.url, pic, { arrow: false, className: 'logo__link' })}</li>`;
}

export function affiliationStrip(groups: AffiliationGroup[], institutions: Record<string, Institution>): Html {
  return html`<div class="affiliations">
    ${groups.map(
      (g) => html`<div class="affiliations__group">
      <p class="affiliations__city">${g.city}</p>
      <ul class="logos" style="--cells:${g.logos.length}" aria-label="Institutions in ${g.city}">
        ${g.logos.map((id) => {
          const inst = institutions[id];
          return inst.logo ? logoImage(inst, inst.logo) : '';
        })}
      </ul>
      <ul class="affiliations__units">
        ${g.units.map(
          (u) => html`<li><span class="affiliations__unit">${maybeLink(u.url, u.name)}</span>${u.parent ? html`<span class="affiliations__parent">${u.parent}</span>` : ''}</li>`,
        )}
      </ul>
    </div>`,
    )}
  </div>`;
}

export function contactBlock(intro: string, emails: EmailAddress[], profiles: Profile[]): Html {
  const visible = profiles.filter((p) => !p.hidden);
  return html`<div class="contact" id="contact">
    <div class="contact__intro">
      <h3 class="contact__title">Get in touch</h3>
      <p>${intro}</p>
    </div>
    <dl class="contact__list">
      ${emails.map(
        (e, i) => html`<div class="contact__row">
        <dt>Email <span class="contact__context">${e.context}</span></dt>
        <dd>
          <a class="contact__email" id="email-${i}" href="mailto:${e.address}">${e.address}</a>
          <button type="button" class="copy-button copy-button--icon" data-copy-target="email-${i}" aria-label="Copy ${e.address}">${uiIcon('copy', 16)}<span class="visually-hidden" data-copy-label>Copy address</span></button>
        </dd>
      </div>`,
      )}
      <div class="contact__row">
        <dt>Profiles</dt>
        <dd>
          <ul class="profiles">
            ${visible.map((p) => html`<li>${extLink(p.url, html`${brandIcon(p.id, 16)}<span>${p.label}</span>`, { className: 'profile-link', arrow: false })}</li>`)}
          </ul>
        </dd>
      </div>
    </dl>
  </div>`;
}

// ---------------------------------------------------------------------------
// Academic page components
// ---------------------------------------------------------------------------

export function researchGrid(areas: ResearchArea[]): Html {
  const roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'];
  return html`<ol class="research">
    ${areas.map(
      (a, i) => html`<li class="research__area" id="${a.id}">
      <div class="research__head">
        <span class="research__index" aria-hidden="true">${roman[i]}.</span>
        <span class="research__emblem" role="img" aria-label="${a.emblemLabel}">${raw(a.emblemHtml)}</span>
      </div>
      <h3 class="research__name">${a.name}</h3>
      <p class="research__plain">${a.plain}</p>
      <p class="research__technical"><span class="research__technical-label">In technical terms</span> ${a.technical}</p>
    </li>`,
    )}
  </ol>`;
}

function people(list: { name: string; url?: string }[]): Html {
  const parts: Html[] = [];
  list.forEach((p, i) => {
    if (i > 0) parts.push(html`${i === list.length - 1 ? ' and ' : ', '}`);
    parts.push(maybeLink(p.url, p.name, { arrow: false }));
  });
  return html`${parts}`;
}

export function educationTimeline(entries: EducationEntry[]): Html {
  return html`<ol class="timeline">
    ${entries.map((e) => {
      const years = e.current ? html`${e.start} – <span class="timeline__now">present</span>` : html`${e.start} – ${e.end}`;
      const institutions = e.institutions.map((inst, i) => html`${i > 0 ? html`<span class="timeline__amp"> &amp; </span>` : ''}${maybeLink(inst.url, inst.name, { arrow: false })}`);
      const units = e.units?.length
        ? html`<p class="timeline__units">${e.units.map((u, i) => html`${i > 0 ? ' · ' : ''}${maybeLink(u.url, u.name, { arrow: false })}`)}</p>`
        : '';
      const supervision =
        e.supervisors?.length || e.coSupervisors?.length
          ? html`<dl class="timeline__supervision">
          ${e.supervisors?.length ? html`<div><dt>Supervisors</dt><dd>${people(e.supervisors)}</dd></div>` : ''}
          ${e.coSupervisors?.length ? html`<div><dt>Co-supervisors</dt><dd>${people(e.coSupervisors)}</dd></div>` : ''}
        </dl>`
          : '';
      return html`<li class="timeline__item${e.current ? ' timeline__item--current' : ''}">
      <p class="timeline__years">${years}</p>
      <div class="timeline__body">
        <h3 class="timeline__degree">${e.degree} <span class="timeline__field">${e.field}</span></h3>
        <p class="timeline__inst">${institutions}</p>
        ${units}
        ${supervision}
        ${e.note ? html`<p class="timeline__note">${e.note}</p>` : ''}
      </div>
    </li>`;
    })}
  </ol>`;
}

export function talkSummary(talks: Talk[]): Html {
  const countries = new Set(talks.map((t) => t.country));
  const n = (k: Talk['type']) => talks.filter((t) => t.type === k).length;
  const stats: [number, string][] = [
    [talks.length, 'events'],
    [n('Talk') + n('Invited talk') + n('Seminar'), 'talks'],
    [n('Poster'), 'posters'],
    [countries.size, 'countries'],
  ];
  return html`<dl class="stats">
    ${stats.filter(([v]) => v > 0).map(([v, k]) => html`<div class="stats__item"><dt>${k}</dt><dd>${v}</dd></div>`)}
  </dl>`;
}

export function talkItem(t: Talk, pubById: (id: string) => Publication | undefined): Html {
  const where = t.host ?? (t.organiser ? `Organised by the ${t.organiser}` : '');
  const place = [where, t.venue].filter(Boolean).join(' · ');
  const presentation = t.presentationTitle
    ? html`<p class="talk__presentation"><span class="talk__presentation-label">${t.type === 'Poster' ? 'Poster' : 'Presented'}</span> <q>${t.presentationTitle}</q>${t.presentedOn ? html` <span class="talk__presented-on">· ${formatDate(t.presentedOn)}</span>` : ''}</p>`
    : '';
  const paper = t.publicationId ? pubById(t.publicationId) : undefined;
  return html`<li class="talk" id="talk-${t.id}">
    <p class="talk__when"><time datetime="${t.start}">${formatDateRange(t.start, t.end)}</time> <span aria-hidden="true">·</span> ${t.city}, ${countryShort(t.country)}</p>
    <h4 class="talk__event">${extLink(t.url, t.event, { className: 'talk__link' })}</h4>
    <p class="talk__meta"><span class="badge badge--${t.type.toLowerCase().replace(/\s+/g, '-')}">${t.type}</span> <span class="talk__place">${place}</span></p>
    <p class="talk__desc">${t.description}</p>
    ${presentation}
    ${paper ? html`<p class="talk__paper"><a href="index.html#pub-${paper.id}">Based on the article in <cite>${paper.venue}</cite> (${paper.year})</a></p>` : ''}
  </li>`;
}

export function talksArchive(talks: Talk[], pubById: (id: string) => Publication | undefined): Html {
  const byYear = new Map<string, Talk[]>();
  for (const t of talks) {
    const y = t.start.slice(0, 4);
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(t);
  }
  return html`<div class="talks">
    ${[...byYear.entries()].map(
      ([year, list]) => html`<section class="talks__year" aria-labelledby="talks-${year}">
      <h3 class="talks__year-label" id="talks-${year}">${year}</h3>
      <ol class="talks__list">${list.map((t) => talkItem(t, pubById))}</ol>
    </section>`,
    )}
  </div>`;
}

export function teachingRecord(entries: TeachingEntry[], institutions: Record<string, TeachingInstitution>): Html {
  const byYear = new Map<string, TeachingEntry[]>();
  for (const e of entries) {
    if (!byYear.has(e.year)) byYear.set(e.year, []);
    byYear.get(e.year)!.push(e);
  }
  return html`<table class="record">
    <caption class="visually-hidden">Teaching record, most recent first</caption>
    <thead>
      <tr><th scope="col">Academic year</th><th scope="col">Term</th><th scope="col">Course</th><th scope="col">Role</th><th scope="col">Institution</th></tr>
    </thead>
    ${[...byYear.entries()].map(
      ([year, list]) => html`<tbody>
      ${list.map((e, i) => {
        const inst = institutions[e.institutionId];
        return html`<tr>
        ${i === 0 ? html`<th scope="rowgroup" rowspan="${list.length}" class="record__year">${year}</th>` : ''}
        <td class="record__term">${e.term}</td>
        <td class="record__course">${maybeLink(e.courseUrl, e.course)}</td>
        <td class="record__role">${e.role}</td>
        <td class="record__inst">${extLink(inst.url, html`<abbr title="${inst.name}">${inst.shortName}</abbr>`, { arrow: false })}</td>
      </tr>`;
      })}
    </tbody>`,
    )}
  </table>`;
}

export function notesLibrary(shelves: NoteShelf[], disclaimer: string): Html {
  const total = shelves.reduce((n, s) => n + s.subjects.reduce((m, sub) => m + sub.notes.length, 0), 0);
  return html`<div class="notes" data-notes>
    <div class="disclaimer" role="note" aria-label="Disclaimer">
      <p><strong>Please note.</strong> ${disclaimer}</p>
    </div>
    <div class="notes__tools">
      <label class="field" for="notes-search">
        <span class="visually-hidden">Search the notes</span>
        ${uiIcon('search', 18)}
        <input id="notes-search" type="search" placeholder="Search ${total} notes — e.g. eigenvalues, Bayes, uniform" autocomplete="off" data-notes-search>
      </label>
      <p class="notes__status" role="status" aria-live="polite" data-notes-status></p>
    </div>
    ${shelves.map(
      (shelf) => html`<section class="shelf" aria-labelledby="shelf-${shelf.id}" data-shelf>
      <header class="shelf__head">
        <h3 class="shelf__name" id="shelf-${shelf.id}">${shelf.name}</h3>
        <p class="shelf__desc">${shelf.description}</p>
      </header>
      <div class="shelf__subjects">
        ${shelf.subjects.map(
          (sub) => html`<section class="subject" id="notes-${sub.id}" aria-labelledby="subject-${sub.id}" data-subject>
          <h4 class="subject__name" id="subject-${sub.id}">${sub.name} <span class="subject__count">${sub.notes.length}</span></h4>
          <ul class="subject__notes">
            ${sub.notes.map(
              (n) => html`<li class="note-link" data-note data-search="${`${n.title} ${n.description ?? ''} ${sub.name} ${shelf.name}`.toLowerCase()}">
              <a href="${n.href}">
                <span class="note-link__title">${n.title}</span>
                ${n.format === 'PDF' ? html`<span class="note-link__format">PDF</span>` : ''}
              </a>
              ${n.description ? html`<span class="note-link__desc">${n.description}</span>` : ''}
              ${n.updated ? html`<span class="note-link__updated">Updated ${formatMonth(n.updated)}</span>` : ''}
            </li>`,
            )}
          </ul>
        </section>`,
        )}
      </div>
    </section>`,
    )}
    <p class="notes__empty" hidden data-notes-empty>No notes match your search.</p>
  </div>`;
}

export function outreachList(items: OutreachItem[]): Html {
  return html`<ol class="outreach">
    ${items.map(
      (o) => html`<li class="outreach__item" id="${o.id}">
      <div class="outreach__head">
        <h3 class="outreach__name">${o.url ? extLink(o.url, o.name) : o.name}</h3>
        <p class="outreach__role">${o.role}${o.period ? html` <span class="outreach__period">· ${o.period}</span>` : ''}</p>
      </div>
      <div class="outreach__body">
        ${o.fullName ? html`<p class="outreach__full">${o.fullName}</p>` : ''}
        <p>${o.description}</p>
        ${o.related?.length ? html`<p class="outreach__related">${o.related.map((r) => html`<a href="${r.url.startsWith('http') ? safeUrl(r.url) : r.url}">${r.label}</a>`)}<span class="outreach__related-label"> — on the blog</span></p>` : ''}
      </div>
    </li>`,
    )}
  </ol>`;
}
