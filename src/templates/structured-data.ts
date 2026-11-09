// schema.org structured data (JSON-LD), derived from the same content files
// as the visible pages so the two can never disagree.

import { person } from '../content/person.ts';
import { education } from '../content/academic.ts';
import type { BlogPost, Publication } from '../types.ts';

const PERSON_ID = person.siteUrl + '#person';

export function personJsonLd(): object {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: person.name,
    givenName: person.givenName,
    familyName: person.familyName,
    alternateName: person.shortName,
    url: person.siteUrl,
    image: person.siteUrl + 'images/profile/formal-portrait-840.jpg',
    jobTitle: person.role,
    email: person.emails.map((e) => `mailto:${e.address}`),
    affiliation: [
      { '@type': 'CollegeOrUniversity', name: 'Instituto Superior Técnico, Universidade de Lisboa', url: 'https://tecnico.ulisboa.pt/' },
      { '@type': 'CollegeOrUniversity', name: 'University of Amsterdam', url: 'https://www.uva.nl/' },
    ],
    alumniOf: education
      .filter((e) => !e.current)
      .flatMap((e) => e.institutions.map((i) => ({ '@type': 'CollegeOrUniversity', name: i.name, url: i.url }))),
    knowsAbout: person.knowsAbout,
    sameAs: person.profiles.filter((p) => !p.hidden).map((p) => p.url),
  };
}

export function publicationJsonLd(pub: Publication): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: pub.title,
    name: pub.title,
    author: pub.authors.map((a) =>
      a.self ? { '@id': PERSON_ID } : { '@type': 'Person', name: [a.given, a.family].filter(Boolean).join(' ') },
    ),
    datePublished: pub.publishedOnline ?? String(pub.year),
    isPartOf: {
      '@type': 'PublicationIssue',
      issueNumber: pub.issue,
      isPartOf: { '@type': ['PublicationVolume', 'Periodical'], name: pub.venue, volumeNumber: pub.volume },
    },
    pagination: pub.pages,
    ...(pub.doi
      ? { identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: pub.doi }, sameAs: `https://doi.org/${pub.doi}`, url: `https://doi.org/${pub.doi}` }
      : {}),
    keywords: pub.topics.join(', '),
  };
}

export function blogJsonLd(posts: BlogPost[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Beyond Equilibrium',
    url: person.siteUrl + 'blog.html',
    author: { '@id': PERSON_ID, '@type': 'Person', name: person.name, url: person.siteUrl },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: person.siteUrl + p.href,
      datePublished: p.date,
      keywords: p.labels.join(', '),
    })),
  };
}
