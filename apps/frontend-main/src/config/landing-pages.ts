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
    title: 'Software Engineer in Ottawa, Canada | Ashikur Rahman',
    description:
      'Software engineer in Ottawa, Ontario, Canada with backend and full-stack experience building production APIs, web applications, and developer tools.',
    h1: 'Software Developer in Ottawa, Canada',
    intro:
      'I am a software developer based in Ottawa, Ontario, Canada with over four years of industry experience across embedded, backend, and full-stack software.',
    sections: [
      {
        title: 'Production engineering in Ottawa',
        paragraphs: [
          'At Nokia in Ottawa, I improved structured logging and incident traceability on production systems—work that reduced manual troubleshooting and made large codebases easier to navigate.',
          'I focus on reliable delivery: clear APIs, observable services, and debugging practices that help teams ship with confidence.',
        ],
      },
      {
        title: 'Full-stack and CS fundamentals',
        paragraphs: [
          'Earlier full-stack work with Django REST Framework, React, and PostgreSQL taught me how to design maintainable client/server boundaries.',
          'Strong data structures, algorithms, and systematic debugging support both production engineering and technical interviews.',
        ],
      },
    ],
  },
  {
    path: '/backend-developer-canada',
    title: 'Backend Developer in Canada | Ashikur Rahman',
    description:
      'Backend developer in Canada specializing in APIs, structured logging, PostgreSQL, Python, TypeScript, Node.js, and production debugging for reliable services.',
    h1: 'Backend Developer in Canada',
    intro:
      'As a backend developer in Canada, I build and improve APIs, services, and data layers with an emphasis on observability, API design, and production debugging.',
    sections: [
      {
        title: 'Backend API development',
        paragraphs: [
          'Experience includes RFC-5424 structured logging, REST APIs, and backend API development for validation, traceability, and maintainable service boundaries.',
          'At Enosis Solutions, backend API work with Django REST Framework and PostgreSQL supported HIPAA-aware web products with clearer data modeling.',
        ],
      },
      {
        title: 'Cloud, deployment, and reliability',
        paragraphs: [
          'Docker, CI/CD, Linux, and DevOps-style automation keep releases predictable on cloud and Linux platforms.',
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
    h1: 'Full-Stack Developer in Canada',
    intro:
      'As a full-stack developer in Canada, I deliver full-stack web application development—from API design through React and Next.js interfaces—with maintainable architecture.',
    sections: [
      {
        title: 'Full-stack web application development',
        paragraphs: [
          'Full-stack project portfolio work spans Node.js REST APIs, React clients, Django REST Framework backends, and PostgreSQL data layers.',
          'I prioritize predictable API contracts, readable code, and validation so UI and persistence stay aligned as products evolve.',
        ],
      },
      {
        title: 'Featured full-stack projects',
        paragraphs: [
          'The Todo App full-stack project demonstrates REST endpoints with a React UI and reliable task persistence.',
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
  .flatMap((page) => [page.title, page.description])
  .join('\n');
