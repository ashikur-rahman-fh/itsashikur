import { siteLinks } from '../config/site-links';
import { siteUrl, personName, defaultOgImagePath } from '../config/site-metadata';
import { capabilities, profile, projects, skillGroups } from '../data/portfolio';

const PERSON_ID = `${siteUrl}/#person`;
const WEBSITE_ID = `${siteUrl}/#website`;

const csFundamentalsGroup = skillGroups.find((g) => g.featured) ?? skillGroups[0];

const schemaSkillTerms = [
  'Next.js',
  'TypeScript',
  'Node.js',
  'Rust',
  'PostgreSQL',
  'DevOps',
  'Cloud',
  'API development',
  'systems programmer',
] as const;

export const knowsAboutSkills = [
  ...new Set([
    ...(csFundamentalsGroup?.skills ?? []),
    ...profile.primaryStack,
    ...schemaSkillTerms,
    'Problem-solving',
    'Software engineering fundamentals',
    'System design',
    'Performance optimization',
    'Technical interview readiness',
  ]),
];

/** Extra schema-only phrasing for Tier D commercial keywords (not shown in UI cards). */
const serviceSchemaEnhancements: Partial<
  Record<(typeof capabilities)[number]['title'], readonly string[]>
> = {
  'Backend & APIs': ['backend API development Canada'],
  'Full-stack web': [
    'web application developer Canada',
    'full-stack web application development',
    'custom software developer Canada',
    'software consulting Canada',
    'business software solutions Canada',
  ],
  'Automation & delivery': ['automation developer Canada'],
};

function buildServiceDescription(capability: (typeof capabilities)[number]): string {
  const extras = serviceSchemaEnhancements[capability.title];
  if (!extras?.length) return capability.description;
  return `${capability.description} — ${extras.join(', ')}`;
}

export function buildPersonJsonLd() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: personName,
    jobTitle: profile.role,
    url: siteUrl,
    email: siteLinks.email,
    image: new URL(defaultOgImagePath, siteUrl).toString(),
    description:
      'Software engineer in Ottawa, Canada and full-stack engineer Canada — backend developer with CS fundamentals, data structures, algorithms, systematic debugging, and production-ready systems.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ottawa',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Nokia',
    },
    sameAs: [siteLinks.githubUrl, siteLinks.codeforcesUrl, siteLinks.linkedinUrl],
    knowsAbout: knowsAboutSkills,
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: personName,
    url: siteUrl,
    inLanguage: 'en-CA',
    publisher: { '@id': PERSON_ID },
  };
}

export function buildProfilePageJsonLd() {
  return {
    '@type': 'ProfilePage',
    '@id': `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: `${personName} — Software Engineering Portfolio`,
    inLanguage: 'en-CA',
    mainEntity: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };
}

export function buildProjectsItemListJsonLd() {
  return {
    '@type': 'ItemList',
    '@id': `${siteUrl}/#projects`,
    name: 'Selected software engineering projects',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        abstract: [project.approach, project.engineeringChoices, project.validation]
          .filter(Boolean)
          .join(' '),
        keywords: project.techStack.join(', '),
      },
    })),
  };
}

export function buildCapabilitiesItemListJsonLd() {
  return {
    '@type': 'ItemList',
    '@id': `${siteUrl}/#capabilities`,
    name: 'Engineering focus areas',
    itemListElement: capabilities.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: item.title,
        description: buildServiceDescription(item),
        provider: { '@id': PERSON_ID },
        areaServed: {
          '@type': 'Country',
          name: 'Canada',
        },
      },
    })),
  };
}

export function buildHomePageJsonLdGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildPersonJsonLd(),
      buildWebSiteJsonLd(),
      buildProfilePageJsonLd(),
      buildProjectsItemListJsonLd(),
      buildCapabilitiesItemListJsonLd(),
    ],
  };
}

export function buildResumeBreadcrumbJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Resume',
        item: `${siteUrl}/resume`,
      },
    ],
  };
}

/** Serialized JSON-LD strings for SEO coverage tests. */
export function buildSeoSchemaCorpus(): string {
  return JSON.stringify(buildHomePageJsonLdGraph());
}
