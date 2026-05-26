import { buildPageMetadata, shortMetaKeywords } from './site-metadata';

export type LandingPageSection = {
  title: string;
  paragraphs: string[];
};

export type LandingPageConfig = {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: LandingPageSection[];
};

export const landingPages: LandingPageConfig[] = [
  {
    path: '/software-developer-ottawa',
    title: 'Software Developer in Ottawa, Canada | Ashikur Rahman',
    description:
      'Software developer in Ottawa, Ontario, Canada with backend and full-stack experience building production APIs, web applications, and developer tools.',
    h1: 'Software developer in Ottawa',
    intro:
      'I’m based in Ottawa with over four years of industry experience across embedded, backend, and full-stack software—currently at Nokia.',
    sections: [
      {
        title: 'Production engineering',
        paragraphs: [
          'At Nokia, I improved structured logging and incident traceability on production systems—work that reduced manual troubleshooting and made large codebases easier to navigate.',
          'I care about reliable delivery: clear APIs, observable services, and debugging practices that help teams ship with confidence.',
        ],
      },
      {
        title: 'Full-stack and fundamentals',
        paragraphs: [
          'Earlier full-stack work with Django REST Framework, React, and PostgreSQL taught me how to design maintainable client/server boundaries.',
          'Strong data structures, algorithms, and systematic debugging show up in both production engineering and how I approach hard problems.',
        ],
      },
    ],
  },
  {
    path: '/backend-developer-canada',
    title: 'Backend Developer in Canada | Ashikur Rahman',
    description:
      'Backend developer in Canada specializing in APIs, structured logging, PostgreSQL, Python, TypeScript, Node.js, and production debugging for reliable services.',
    h1: 'Backend developer in Canada',
    intro:
      'I build and improve APIs, services, and data layers with a focus on observability, API design, and production debugging.',
    sections: [
      {
        title: 'APIs and services',
        paragraphs: [
          'Recent work includes RFC-5424 structured logging, REST APIs, and service boundaries designed for validation, traceability, and maintainability.',
          'At Enosis Solutions, Django REST Framework and PostgreSQL backed HIPAA-aware web products with clearer data modeling.',
        ],
      },
      {
        title: 'Reliability and delivery',
        paragraphs: [
          'Docker, CI/CD, Linux, and automation keep releases predictable on the platforms I work with.',
          'Production debugging and structured logging are core skills—narrowing issues, documenting findings, and improving incident response.',
        ],
      },
    ],
  },
  {
    path: '/full-stack-developer-canada',
    title: 'Full-Stack Developer in Canada | Ashikur Rahman',
    description:
      'Full-stack developer in Canada building web applications with TypeScript, Next.js, React, Node.js, PostgreSQL, and clear client/server contracts.',
    h1: 'Full-stack developer in Canada',
    intro:
      'I ship web products end to end—from API design through React and Next.js interfaces—with architecture that stays maintainable as features grow.',
    sections: [
      {
        title: 'Web applications',
        paragraphs: [
          'Project work spans Node.js REST APIs, React clients, Django REST Framework backends, and PostgreSQL data layers.',
          'I prioritize predictable API contracts, readable code, and validation so UI and persistence stay aligned as products evolve.',
        ],
      },
      {
        title: 'Featured projects',
        paragraphs: [
          'The Todo App pairs REST endpoints with a React UI and reliable task persistence.',
          'See the projects hub for machine learning, database, and embedded work that complements full-stack delivery.',
        ],
      },
    ],
  },
];

export const landingPagesByPath = Object.fromEntries(
  landingPages.map((page) => [page.path, page]),
) as Record<string, LandingPageConfig>;

export function buildLandingPageMetadata(page: LandingPageConfig) {
  return buildPageMetadata({
    path: page.path,
    title: page.title,
    description: page.description,
    keywords: shortMetaKeywords,
  });
}

/** Searchable copy for SEO coverage tests. */
export const landingPagesSeoCopy = landingPages
  .flatMap((page) => [
    page.title,
    page.description,
    page.intro,
    ...page.sections.flatMap((s) => s.paragraphs),
  ])
  .join('\n');
