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
    title: 'Software Developer in Ottawa',
    description:
      'Software developer in Ottawa building APIs, web apps, and developer tools—with backend, full-stack, and embedded experience.',
    h1: 'Software developer in Ottawa',
    intro:
      "I'm in Ottawa, four years in industry, currently at Nokia—embedded, backend, and full-stack.",
    sections: [
      {
        title: 'Production engineering',
        paragraphs: [
          'At Nokia I work on structured logging and incident traceability on production systems—less time hunting through logs, easier navigation in large codebases.',
          'I focus on clear APIs, observable services, and debugging habits that make releases easier to support.',
        ],
      },
      {
        title: 'Full-stack and fundamentals',
        paragraphs: [
          'Earlier work with Django REST Framework, React, and PostgreSQL taught me to keep client/server boundaries clear as products grow.',
          'Data structures, algorithms, and careful debugging show up in both production work and how I tackle hard bugs.',
        ],
      },
    ],
  },
  {
    path: '/backend-developer-canada',
    title: 'Backend Developer in Canada',
    description:
      'Backend developer in Canada specializing in APIs, structured logging, PostgreSQL, Python, TypeScript, Node.js, and production debugging for reliable services.',
    h1: 'Backend developer in Canada',
    intro:
      'I build and improve APIs, services, and data layers—with observability, clear contracts, and production debugging.',
    sections: [
      {
        title: 'APIs and services',
        paragraphs: [
          'Recent work includes RFC-5424 structured logging, REST APIs, and service boundaries built for validation and traceability.',
          'At Enosis Solutions, Django REST Framework and PostgreSQL backed HIPAA-aware web products with clearer data modeling.',
        ],
      },
      {
        title: 'Reliability and delivery',
        paragraphs: [
          'Docker, CI/CD, Linux, and automation keep releases predictable on the platforms I work with.',
          'I narrow production issues with logs and repro steps, document findings, and improve incident response over time.',
        ],
      },
    ],
  },
  {
    path: '/full-stack-developer-canada',
    title: 'Full-Stack Developer in Canada',
    description:
      'Full-stack developer in Canada building web applications with TypeScript, Next.js, React, Node.js, PostgreSQL, and clear client/server contracts.',
    h1: 'Full-stack developer in Canada',
    intro:
      'I build web products end to end—APIs through React and Next.js UIs—with contracts that stay stable as features grow.',
    sections: [
      {
        title: 'Web applications',
        paragraphs: [
          'Project work spans Node.js REST APIs, React clients, Django REST Framework backends, and PostgreSQL data layers.',
          'I keep API contracts predictable and test UI flows against persistence so features do not drift apart.',
        ],
      },
      {
        title: 'Featured projects',
        paragraphs: [
          'The Todo App pairs REST endpoints with a React UI and reliable task persistence.',
          'See the projects hub for machine learning, database, and embedded work alongside full-stack delivery.',
        ],
      },
    ],
  },
  {
    path: '/embedded-developer-canada',
    title: 'Embedded Developer in Canada',
    description:
      'Embedded and systems developer in Canada with C/C++, Linux, and production experience at Nokia—plus backend and full-stack delivery.',
    h1: 'Embedded developer in Canada',
    intro:
      'I work close to the hardware and the platform: C/C++, Linux, and production constraints—currently on telecom software at Nokia.',
    sections: [
      {
        title: 'Embedded & systems',
        paragraphs: [
          'At Nokia I contribute to production telecom software where logging, resource limits, and large shared codebases matter.',
          'Structured logging on OTOS made incidents easier to trace and cut time spent on manual troubleshooting.',
        ],
      },
      {
        title: 'Broader stack',
        paragraphs: [
          'I also ship backend and full-stack work with Python, Django REST Framework, and React when products need APIs and UIs.',
          'See projects for embedded C work, distributed databases, and full-stack apps that sit alongside systems programming.',
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
