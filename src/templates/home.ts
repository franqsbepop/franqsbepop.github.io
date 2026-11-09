import { html, raw, extLink, type Html } from '../lib/html.ts';
import { person, heroFacts, photos, photoCaption } from '../content/person.ts';
import { publications } from '../content/publications.ts';
import { talks } from '../content/talks.ts';
import { affiliationGroups, institutions } from '../content/affiliations.ts';
import { page, canonicalUrl, uiIcon } from './layout.ts';
import { section, sectionLabel, profileCarousel, photoPreload, publicationItem, affiliationStrip, contactBlock } from './components.ts';
import { personJsonLd, publicationJsonLd } from './structured-data.ts';

function hero(): Html {
  const facts = heroFacts.map(
    (f) => html`<div class="facts__item"><dt>${f.label}</dt><dd>${f.href ? html`<a href="${f.href}">${f.value}</a>` : f.value}</dd></div>`,
  );
  return html`<section class="hero" id="introduction" aria-labelledby="hero-name">
  <span id="biography" class="anchor-alias" aria-hidden="true"></span>
  <div class="wrap hero__grid">
    <div class="hero__head">
      ${sectionLabel(1, 'Introduction')}
      <h1 class="hero__name" id="hero-name">${person.name}</h1>
      <p class="hero__role">${person.role}<span class="hero__institutions">${person.institutionsLine}</span></p>
      <p class="hero__headline">${person.headline.before}<em>${person.headline.emphasis}</em>${person.headline.after}</p>
    </div>
    ${profileCarousel(photos, photoCaption)}
    <div class="hero__body">
      <div class="hero__bio">
        ${person.bioHtml.map((p) => html`<p>${raw(p)}</p>`)}
      </div>
      <p class="hero__invite">${person.invitation}</p>
      <p class="hero__actions">
        <a class="button button--primary" href="#contact">Get in touch ${uiIcon('arrowRight', 16)}</a>
        <a class="button" href="academic.html">Research &amp; teaching</a>
      </p>
      <dl class="facts">${facts}</dl>
    </div>
  </div>
</section>`;
}

function publicationsSection(): Html {
  const scholar = person.profiles.find((p) => p.id === 'scholar');
  const orcid = person.profiles.find((p) => p.id === 'orcid');
  const talkCount = (id: string) => talks.filter((t) => t.publicationId === id).length;
  return section({
    id: 'publications',
    num: 2,
    label: 'Publications',
    title: 'Research in print',
    lead: html`Peer-reviewed articles, most recent first. The complete record is kept on ${
      scholar ? extLink(scholar.url, 'Google Scholar', { arrow: false }) : ''
    } and ${orcid ? extLink(orcid.url, 'ORCID', { arrow: false }) : ''}.`,
    body: html`<ol class="pubs" reversed>
      ${publications.map((p) => publicationItem(p, talkCount(p.id), 'academic.html#talks'))}
    </ol>`,
  });
}

function affiliationsSection(): Html {
  return section({
    id: 'affiliations',
    num: 3,
    label: 'Affiliations & Contact',
    title: 'Where to find me',
    lead: 'My doctoral research is carried out jointly between Amsterdam and Lisbon.',
    className: 'section--tinted',
    body: html`${affiliationStrip(affiliationGroups, institutions)}
    ${contactBlock(person.contactNote, person.emails, person.profiles)}`,
  });
}

export function homePage(cssVersion: string): Html {
  return page(
    {
      path: 'index.html',
      title: `${person.name} — Mathematician · Stochastic analysis & optimal transport`,
      description:
        'Diogo Sousa Franquinho is a joint PhD candidate in Mathematics at Instituto Superior Técnico (Universidade de Lisboa) and the University of Amsterdam, working on stochastic analysis and optimal transport, motivated by mathematical finance.',
      section: 'home',
      ogType: 'profile',
      bodyClass: 'page-home',
      head: photoPreload(photos[0]),
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          '@id': canonicalUrl('index.html') + '#page',
          url: canonicalUrl('index.html'),
          name: person.name,
          mainEntity: personJsonLd(),
        },
        ...publications.map(publicationJsonLd),
      ],
      cssVersion,
    },
    html`${hero()}
${publicationsSection()}
${affiliationsSection()}`,
  );
}
