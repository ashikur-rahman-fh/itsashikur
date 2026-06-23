import { buildPageMetadata, shortMetaKeywords } from './site-metadata';

export type LandingPageSection = {
  title: string;
  paragraphs: string[];
};

export type LandingPageProjectLink = {
  slug: string;
  blurb: string;
};

export type LandingPageFaq = {
  question: string;
  answer: string;
};

export type LandingPageConfig = {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: LandingPageSection[];
  relatedProjects?: LandingPageProjectLink[];
  faqs?: LandingPageFaq[];
};

export const landingPages: LandingPageConfig[] = [
  {
    path: '/software-developer-ottawa',
    title: 'Software Developer in Ottawa',
    description:
      'Software developer in Ottawa building APIs, web apps, and developer tools—with backend, full-stack, and embedded experience at Nokia and earlier product teams.',
    h1: 'Software developer in Ottawa',
    intro:
      "I'm based in Ottawa with four years in industry, currently at Nokia—shipping embedded, backend, and full-stack work where observability and clear APIs matter in production.",
    sections: [
      {
        title: 'Ottawa engineering context',
        paragraphs: [
          'Ottawa teams often blend telecom, SaaS, and public-sector delivery—so I optimize for maintainable services, readable logs, and APIs that other engineers can extend without guesswork.',
          'Whether the work is greenfield or a large shared codebase, I prioritize reproducible debugging, sensible boundaries, and documentation that survives handoffs.',
        ],
      },
      {
        title: 'Production engineering at Nokia',
        paragraphs: [
          'At Nokia I work on structured logging and incident traceability on production systems—less time hunting through logs, easier navigation in large codebases.',
          'RFC-5424-style structured logging on OTOS improved incident traceability and reduced manual troubleshooting time on production paths I supported.',
          'I focus on clear APIs, observable services, and debugging habits that make releases easier to support after they ship.',
        ],
      },
      {
        title: 'Full-stack and CS fundamentals',
        paragraphs: [
          'Earlier work with Django REST Framework, React, and PostgreSQL taught me to keep client/server boundaries clear as products grow.',
          'Data structures, algorithms, and careful debugging show up in both production work and how I tackle hard bugs under time pressure.',
          'I treat tests, API contracts, and incremental delivery as part of the job—not extras once features are “done.”',
        ],
      },
      {
        title: 'Stack I ship with in Ottawa',
        paragraphs: [
          'TypeScript, Next.js, Node.js, PostgreSQL, Python, Rust, and C++—chosen based on constraints, not trends.',
          'Comfortable across Linux servers, Docker-based workflows, and embedded constraints when the problem sits close to the platform.',
        ],
      },
      {
        title: 'How I collaborate on Ottawa teams',
        paragraphs: [
          'I write concise design notes, keep pull requests reviewable, and surface risks early when requirements compete with reliability.',
          'Mentorship and code review are part of how I work—especially when onboarding engineers to logging conventions or API patterns that must stay consistent across services.',
          'If you are hiring a software developer in Ottawa for backend, embedded, or full-stack delivery, the projects and experience pages on this site show representative work samples.',
        ],
      },
    ],
    relatedProjects: [
      {
        slug: 'todo-app',
        blurb: 'Node.js REST API with a React client—clear contracts between UI and persistence.',
      },
      {
        slug: 'shop-management-system',
        blurb: 'Distributed database design with integrity constraints across Oracle nodes.',
      },
    ],
    faqs: [
      {
        question: 'Are you open to Ottawa-area or remote roles in Canada?',
        answer:
          "Yes—I'm based in Ottawa and open to hybrid or remote opportunities across Canada when the team values production discipline and clear communication.",
      },
      {
        question: 'What kind of software developer work do you take on?',
        answer:
          'Backend APIs, embedded/platform tooling, and full-stack web apps—especially when reliability, logging, and debuggability are part of the brief.',
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
      'I build and improve APIs, services, and data layers—with observability, clear contracts, and production debugging habits teams can rely on after launch.',
    sections: [
      {
        title: 'APIs and service boundaries',
        paragraphs: [
          'Recent work includes RFC-5424 structured logging, REST APIs, and service boundaries built for validation and traceability.',
          'I design endpoints and modules so failures are localized, logs tell a coherent story, and on-call engineers can narrow incidents quickly.',
          'At Enosis Solutions, Django REST Framework and PostgreSQL backed HIPAA-aware web products with clearer data modeling and permission boundaries.',
        ],
      },
      {
        title: 'Data layer and PostgreSQL',
        paragraphs: [
          'Schema design, migrations, and query patterns that stay understandable as features accumulate.',
          'I prefer explicit constraints and testable repositories over ad hoc SQL scattered through handlers.',
          'Distributed data problems—like inventory across nodes—show up in my Shop Management System project with integrity rules enforced at the database layer.',
        ],
      },
      {
        title: 'Reliability and delivery',
        paragraphs: [
          'Docker, CI/CD, Linux, and automation keep releases predictable on the platforms I work with.',
          'I narrow production issues with logs and repro steps, document findings, and improve incident response over time.',
          'Structured logging is not cosmetic—it changes how fast a team can answer “what broke?” and “who is affected?”',
        ],
      },
      {
        title: 'Backend debugging mindset',
        paragraphs: [
          'I reproduce issues locally or in staging when possible, bisect changes, and leave notes so the next engineer starts ahead.',
          'That approach transferred from competitive programming practice to production services where downtime has real cost.',
        ],
      },
      {
        title: 'Backend developer hiring context',
        paragraphs: [
          'Teams hiring a backend developer in Canada often need someone who can own a service from schema migrations through on-call—not only greenfield endpoints.',
          'I am comfortable reading existing code, improving test coverage where it is thin, and pairing with frontend engineers on contract changes that affect production clients.',
          'See the experience page for Nokia and Enosis roles, and the projects hub for APIs and database work with measurable outcomes.',
        ],
      },
    ],
    relatedProjects: [
      {
        slug: 'shop-management-system',
        blurb:
          'Oracle-backed distributed schema with constraints that preserve inventory integrity.',
      },
      {
        slug: 'todo-app',
        blurb:
          'REST API with persistent storage and predictable error responses for the React client.',
      },
    ],
    faqs: [
      {
        question: 'Which backend stacks do you work with?',
        answer:
          'Python (Django REST Framework), TypeScript/Node.js, PostgreSQL, and C++ services where platform constraints require it.',
      },
      {
        question: 'Do you handle production incidents?',
        answer:
          'Yes—structured logging, traceable requests, and clear runbooks are part of how I deliver backend work, not an afterthought.',
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
      'I build web products end to end—APIs through React and Next.js UIs—with contracts that stay stable as features grow and teams onboard.',
    sections: [
      {
        title: 'Web applications end to end',
        paragraphs: [
          'Project work spans Node.js REST APIs, React clients, Django REST Framework backends, and PostgreSQL data layers.',
          'I keep API contracts predictable and test UI flows against persistence so features do not drift apart across releases.',
          'This portfolio itself is a Next.js app with shared UI packages, typed API clients, and deployment automation—I dogfood the same patterns I recommend.',
        ],
      },
      {
        title: 'Client and server contracts',
        paragraphs: [
          'Shared types, explicit error shapes, and pagination rules prevent “works on my machine” integrations between frontend and backend teams.',
          'I document breaking changes and favor incremental migrations over big-bang rewrites when users depend on the product daily.',
        ],
      },
      {
        title: 'Next.js and React delivery',
        paragraphs: [
          'Server components where they reduce client JavaScript, client components where interactivity demands it, and metadata routes for SEO on public pages.',
          'Accessible UI, responsive layouts, and performance-conscious asset loading are default requirements—not stretch goals.',
        ],
      },
      {
        title: 'Validation and quality',
        paragraphs: [
          'Automated tests on critical paths, lint/typecheck in CI, and manual verification for flows that are hard to script.',
          'Full-stack ownership means I care about database migrations landing safely the same night the UI ships.',
        ],
      },
      {
        title: 'Full-stack delivery in Canada',
        paragraphs: [
          'Canadian product teams frequently need engineers who can ship a feature across the stack without waiting on handoffs between siloed specialists.',
          'I have delivered HIPAA-aware web products, internal tools, and public portfolios where SEO, accessibility, and API reliability all matter.',
          'If you are evaluating a full-stack developer in Canada, compare project write-ups on this site for how I document constraints, engineering choices, and validation.',
        ],
      },
    ],
    relatedProjects: [
      {
        slug: 'todo-app',
        blurb: 'REST endpoints paired with a React UI and reliable task persistence.',
      },
      {
        slug: 'movie-genre-prediction',
        blurb:
          'Python ML pipeline with clear training/evaluation boundaries—useful contrast to product web work.',
      },
    ],
    faqs: [
      {
        question: 'Do you build admin dashboards and public sites?',
        answer:
          'Yes—this portfolio includes a public Next.js site and a separate admin frontend against a Django API, sharing packages across apps.',
      },
      {
        question: 'How do you split work between frontend and backend?',
        answer:
          'API-first: define contracts, implement server persistence, then build UI against stable endpoints with typed clients.',
      },
    ],
  },
  {
    path: '/embedded-developer-canada',
    title: 'Embedded Developer in Canada',
    description:
      'Embedded and systems developer in Canada with C/C++, Linux, and production experience at Nokia—plus backend and full-stack delivery when products need both.',
    h1: 'Embedded developer in Canada',
    intro:
      'I work close to the hardware and the platform: C/C++, Linux, and production constraints—currently on telecom software at Nokia, with backend and web delivery when products need both.',
    sections: [
      {
        title: 'Embedded and systems work',
        paragraphs: [
          'At Nokia I contribute to production telecom software where logging, resource limits, and large shared codebases matter.',
          'Structured logging on OTOS made incidents easier to trace and cut time spent on manual troubleshooting in paths I maintained.',
          'I respect memory, timing, and failure modes that only show up on real hardware or under load.',
        ],
      },
      {
        title: 'C, C++, and Linux platforms',
        paragraphs: [
          'Systems programming fundamentals carry into how I design modules: minimal coupling, explicit ownership, and tests where the platform allows.',
          'Linux bring-up, build systems, and cross-compilation are familiar territory from academic and industry embedded projects.',
        ],
      },
      {
        title: 'Hardware-aware project work',
        paragraphs: [
          'My Cleaning Car embedded project used sensor feedback and motor control for repeatable path cleaning under hardware constraints.',
          'That work reinforced the gap between simulated behavior and what breaks when sensors drift or power budgets change.',
        ],
      },
      {
        title: 'When embedded meets backend',
        paragraphs: [
          'Many products need device firmware and cloud APIs—I have shipped Django REST Framework and React layers alongside lower-level code.',
          'I can own the interface between firmware telemetry and the services that ingest it, with logging that spans both sides.',
        ],
      },
      {
        title: 'Embedded developer in the Canadian market',
        paragraphs: [
          'Ottawa and other Canadian hubs still employ embedded talent for telecom, defense, IoT, and industrial products where reliability beats feature churn.',
          'I bring production discipline from Nokia—structured logs, careful regression analysis, and respect for long-lived codebases—to embedded and systems roles.',
          'Review the cleaning-car project for hardware-aware control loops and the experience page for how embedded work sits next to backend delivery in my career.',
        ],
      },
    ],
    relatedProjects: [
      {
        slug: 'cleaning-car',
        blurb:
          'Embedded controller with sensor feedback and motor control under real hardware limits.',
      },
      {
        slug: 'shop-management-system',
        blurb: 'Contrasting systems problem—distributed data integrity at the database layer.',
      },
    ],
    faqs: [
      {
        question: 'Do you only do embedded work?',
        answer:
          'No—embedded is a strength, but I also deliver backend APIs and full-stack web apps when the product needs a complete stack.',
      },
      {
        question: 'What embedded environments have you worked in?',
        answer:
          'C/C++ on Linux-class platforms in production telecom software, plus academic embedded control projects with sensors and actuators.',
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

function collectLandingPageCopy(page: LandingPageConfig): string[] {
  return [
    page.title,
    page.description,
    page.intro,
    ...page.sections.flatMap((section) => section.paragraphs),
    ...(page.relatedProjects?.map((project) => project.blurb) ?? []),
    ...(page.faqs?.flatMap((faq) => [faq.question, faq.answer]) ?? []),
  ];
}

/** Searchable copy for SEO coverage tests. */
export const landingPagesSeoCopy = landingPages
  .flatMap((page) => collectLandingPageCopy(page))
  .join('\n');

/** Minimum word count target for landing page substance (SEO). */
export const LANDING_PAGE_MIN_WORD_COUNT = 340;

export function countLandingPageWords(page: LandingPageConfig): number {
  const text = collectLandingPageCopy(page).join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}
