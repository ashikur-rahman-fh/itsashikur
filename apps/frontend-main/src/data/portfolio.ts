import type { StatItemData } from '@ashikur-portfolio/shared/ui';

export const sectionCopy = {
  about: {
    title: 'About me',
    description:
      'Production experience, CS fundamentals, and full-stack delivery—with an emphasis on maintainable code and clear debugging.',
  },
  experience: {
    title: 'Work experience',
    description:
      'From embedded and production software at Nokia to full-stack product work and technical mentoring.',
  },
  projects: {
    title: 'Selected projects',
    description:
      'A few projects across ML, databases, full-stack web, and embedded work—each with the problem, approach, and outcome.',
  },
  skills: {
    title: 'Skills',
    description:
      'Languages, frameworks, and practices I use in day-to-day work, with solid depth in CS fundamentals and production debugging.',
  },
  capabilities: {
    title: 'What I work on',
    description:
      'Areas I spend most of my engineering time on—grounded in shipping real software, not buzzwords.',
  },
  achievements: {
    title: 'Contest & fundamentals track record',
    description:
      'Competitive programming results that complement production engineering—complexity, edge cases, and clear implementations.',
  },
  contact: {
    title: 'Get in touch',
    description:
      'Based in Ottawa. I’m happy to hear about roles, collaboration, or technical questions—send a note or use the links below.',
  },
} as const;

export const profile = {
  name: 'Ashikur Rahman',
  role: 'Software Developer',
  currentRole: 'Software Developer at Nokia',
  locationLine: 'Ottawa, Ontario · Open to backend, full-stack, and software roles across Canada',
  intro:
    'I’m a software developer in Ottawa, currently at Nokia. I build backend systems, full-stack apps, APIs, and tools that help teams ship reliably.',
  headline: 'Production APIs, dependable web apps, and strong CS fundamentals.',
  supportingParagraph:
    'Over four years in industry, I’ve shipped embedded, backend, and web software with an eye on performance and maintainability. I use data structures, algorithms, and systematic debugging in API design, logging, and production reliability—not just on practice problems.',
  aboutParagraph:
    'Systematic debugging and clear judgment are central to how I work. At Nokia, that meant RFC-5424 structured logging and faster incident analysis; on earlier products, it meant faster REST APIs and clearer form flows. I’ve also mentored 80+ students in algorithms and data structures, which keeps my explanations practical for teammates and students alike.',
  highlights: [
    'Nokia: structured logging, 60%+ better incident traceability, and stronger developer workflows',
    'Full-stack delivery with Django REST Framework, React, and PostgreSQL on HIPAA-aware web products',
    'Codeforces Expert with 1500+ problems solved—CS fundamentals I apply in production',
  ],
  primaryStack: ['C++', 'Python', 'Linux', 'React', 'REST APIs'],
  softSkills: [
    'Communication',
    'Teamwork',
    'Mentoring',
    'Leadership',
    'Ownership',
    'Critical thinking',
    'Reliability',
  ] as const,
};

export const impactIntro = {
  footnote: 'Production metrics from structured logging work on the OTOS system at Nokia.',
};

export const productionMetrics: StatItemData[] = [
  { value: '4+', label: 'years of professional experience', animate: true },
  { value: '60%+', label: 'improved incident traceability', highlight: true, animate: true },
  { value: '25%', label: 'less manual troubleshooting time', highlight: true, animate: true },
];

export const algorithmMetrics: StatItemData[] = [
  { value: '1500+', label: 'competitive programming problems solved', animate: true },
  { value: '1792', label: 'peak Codeforces rating', animate: true },
];

/** @deprecated Use productionMetrics + algorithmMetrics in ImpactSection; kept for resume compatibility */
export const heroStats: StatItemData[] = [...productionMetrics, ...algorithmMetrics];

export const cpToProduction = {
  title: 'How contest practice supports production engineering',
  description:
    'Competitive programming is not a substitute for shipping production software, but it strengthens complexity analysis, edge-case thinking, and readable implementations under constraints.',
  bullets: [
    'Break problems into testable parts with clear interfaces and reviewable steps',
    'Reason about edge cases and invariants before changes reach production',
    'Choose approaches that respect time, memory, and operational limits',
    'Keep code clean and maintainable for the next engineer on the team',
  ],
};

export const capabilities = [
  {
    title: 'Problem-solving & CS fundamentals',
    description:
      'Data structures, algorithms, complexity analysis, and structured debugging applied to real codebases.',
  },
  {
    title: 'Backend & APIs',
    description:
      'REST APIs, service boundaries, and data models—with validation, logging, and contracts that hold up in production.',
  },
  {
    title: 'Full-stack web',
    description:
      'End-to-end web work with Django REST Framework, React, Next.js, and clear client/server boundaries.',
  },
  {
    title: 'Systems & embedded',
    description:
      'C/C++, Linux, and embedded-style constraints where performance and hardware limits matter.',
  },
  {
    title: 'Observability & debugging',
    description:
      'Structured logging, incident traceability, and systematic root-cause analysis in large codebases.',
  },
  {
    title: 'Automation & delivery',
    description:
      'CI/CD, Docker, and delivery tooling that keep releases predictable on Linux and cloud platforms.',
  },
  {
    title: 'Technical mentoring',
    description:
      'Algorithms and data structures coaching for students and teammates, with practical explanations.',
  },
] as const;

export const experience = [
  {
    role: 'Software Developer',
    company: 'Nokia',
    period: 'Mar 2023 – Present',
    location: 'Ottawa, Ontario, Canada · Hybrid',
    highlight: '60%+ better incident traceability · 25% less troubleshooting time',
    summary:
      'Build and improve production software where logging, debugging, and developer workflow matter in large engineering environments.',
    impacts: [
      'Designed RFC-5424 structured logging for OTOS so logs are machine-readable and easier to analyze.',
      'Improved incident traceability by 60%+ and reduced manual troubleshooting time by 25%.',
      'Drove Python type-hint adoption across APT test and development teams.',
      'Raised code readability and day-to-day navigation in shared codebases.',
    ],
    techStack: [
      'C/C++',
      'Python',
      'Embedded systems',
      'Linux',
      'Docker',
      'CI/CD',
      'Git',
      'Gerrit',
      'Structured logging',
      'Design patterns',
      'Integration testing',
      'Code review',
    ],
    featured: true,
  },
  {
    role: 'Software Developer',
    company: 'Enosis Solutions',
    period: 'Nov 2021 – Aug 2022',
    location: 'Dhaka, Bangladesh',
    summary:
      'Delivered full-stack features and Django REST APIs with developers and QA in Scrum—from payment flows to HIPAA-compliant digital forms.',
    impacts: [
      'Built and tested payment and automated campaign features for client products.',
      'Refactored UIs and improved REST API performance for HIPAA-compliant form applications.',
      'Supported products that earned 700+ positive user reviews.',
      'Contributed through code reviews, Scrum ceremonies, and clear technical documentation.',
    ],
    techStack: [
      'Django REST Framework',
      'React',
      'REST APIs',
      'PostgreSQL',
      'Scrum',
      'Code review',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'SammTech',
    period: 'Aug 2020 – Aug 2021',
    location: 'Dhaka, Bangladesh',
    summary: 'Supported client delivery across frontend, backend, automation, and C++ components.',
    impacts: [
      'Delivered Python automation with Selenium for scraping and browser workflows.',
      'Fixed high-priority bugs and lowered memory and CPU usage in existing services.',
      'Extended a multi-threaded C++ point-of-sale system with new functionality.',
      'Clarified requirements and proposed practical improvements during delivery.',
    ],
    techStack: ['Python', 'Selenium', 'C++', 'JavaScript', 'Performance profiling'],
  },
  {
    role: 'Programming Contest Trainer',
    company: 'ACM Lab-02, AUST',
    period: 'Jan 2019 – Jul 2021',
    location: 'Dhaka, Bangladesh',
    highlight: '80+ students mentored · 20% higher contest participation',
    summary:
      'Trained students in algorithms and data structures and supported contests as a problem setter and judge.',
    impacts: [
      'Mentored 80+ students across three semesters.',
      'Raised contest participation by 20% and overall team performance by 5%.',
      'Authored and judged problems for intra-university programming contests.',
      'Taught problem-solving approaches that students reused in coursework and contests.',
    ],
    techStack: ['Algorithms', 'Data structures', 'Mentoring', 'Technical communication'],
  },
];

export const education = [
  {
    degree: 'BSc in Computer Science & Engineering',
    institution: 'Ahsanullah University of Science and Technology (AUST)',
    period: '2016 – 2021',
    location: 'Dhaka, Bangladesh',
    focus: 'Strong foundation in algorithms, systems, and software development practice.',
    highlights: [
      'Core coursework in algorithms, operating systems, and software engineering',
      'Active in ACM Lab-02 competitive programming community',
    ],
  },
];

export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  problem: string;
  constraints: string;
  approach: string;
  engineeringChoices: string;
  validation: string;
  techStack: string[];
  result: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
};

export const projects: PortfolioProject[] = [
  {
    slug: 'movie-genre-prediction',
    title: 'Movie Genre Prediction',
    category: 'Machine learning',
    seoTitle: 'Movie Genre Prediction | Machine learning with PyTorch',
    seoDescription:
      'Multi-label movie genre classifier from plot summaries using Python, PyTorch, and scikit-learn with held-out evaluation.',
    description:
      'Multi-label text classifier that predicts movie genres from plot summaries using a PyTorch pipeline.',
    problem: 'Plot text is noisy, and each title can belong to several genres at once.',
    constraints:
      '19 overlapping labels, thousands of training plots, and held-out evaluation required for fair accuracy reporting.',
    approach:
      'Built preprocessing and feature extraction with scikit-learn, then trained and tuned PyTorch models for multi-label prediction.',
    engineeringChoices:
      'Separated preprocessing, training, and evaluation steps so experiments stayed reproducible and errors were easier to trace.',
    validation: 'Measured accuracy on 4,456 held-out plots rather than training accuracy alone.',
    techStack: ['Python', 'PyTorch', 'scikit-learn'],
    result: '49%+ accuracy on 4,456 held-out plots across 19 genres.',
    featured: true,
  },
  {
    slug: 'shop-management-system',
    title: 'Shop Management System',
    category: 'Databases',
    seoTitle: 'Shop Management System | Distributed Oracle SQL',
    seoDescription:
      'Distributed database design for shop and inventory data across Oracle nodes with integrity constraints.',
    description:
      'Distributed database design for shop and inventory data across multiple Oracle nodes.',
    problem: 'Inventory had to stay consistent across separate database sites.',
    constraints:
      'Data was split across nodes while queries still needed correct joins and integrity rules.',
    approach:
      'Designed schemas, distribution rules, and SQL for cross-site queries with explicit integrity constraints.',
    engineeringChoices:
      'Modeled entities and relationships for maintainable multi-site access instead of ad hoc copies per store.',
    validation:
      'Verified cross-node queries and constraints against representative shop and inventory scenarios.',
    techStack: ['Oracle SQL', 'Distributed databases'],
    result: 'Demonstrated a maintainable pattern for multi-site shop data.',
  },
  {
    slug: 'todo-app',
    title: 'Todo App',
    category: 'Full-stack',
    seoTitle: 'Todo App | Node.js and React full-stack',
    seoDescription:
      'Task and reminder app with a Node.js REST API and React client for dependable tracking and clear API contracts.',
    description: 'Task and reminder app with a Node.js REST API and React client.',
    problem: 'Users needed dependable task tracking with clear due dates.',
    constraints:
      'Client and server had to stay in sync with a stable API contract and persistent storage.',
    approach:
      'Implemented REST endpoints and a React UI with explicit boundaries between presentation and data access.',
    engineeringChoices:
      'Kept API resources predictable and documented so the UI could evolve without breaking persistence.',
    validation:
      'Exercised create/update flows through the API and UI to confirm reliable task persistence.',
    techStack: ['Node.js', 'React', 'REST APIs'],
    result: 'Reliable task persistence with a straightforward API contract.',
    featured: true,
  },
  {
    slug: 'cleaning-car',
    title: 'Cleaning Car',
    category: 'Embedded',
    seoTitle: 'Cleaning Car | Embedded C++',
    seoDescription:
      'Embedded controller with sensor feedback and motor control for repeatable path cleaning under hardware constraints.',
    description: 'Embedded controller that follows programmed paths to clean a flat surface.',
    problem: 'Motor control and sensor feedback had to stay stable under hardware limits.',
    constraints:
      'Limited onboard resources, real-time sensor noise, and repeatable movement on a flat test surface.',
    approach:
      'Wrote control logic with sensor input, movement commands, and iterative on-device testing.',
    engineeringChoices:
      'Structured state transitions so movement commands stayed readable and easier to debug on hardware.',
    validation: 'Ran repeated on-device tests until paths were stable across trials.',
    techStack: ['C', 'Embedded systems'],
    result: 'Completed repeatable cleaning paths on a flat test surface.',
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = (() => {
  const marked = projects.filter((project) => project.featured);
  return marked.length > 0 ? marked : projects.slice(0, 3);
})();

export const projectSlugs = projects.map((project) => project.slug);

export const projectsPageTitle = 'Projects | Ashikur Rahman';

export const projectsPageMetaDescription =
  'Software engineering projects across backend APIs, full-stack web, machine learning, databases, and embedded systems—with problem statements, tech stacks, and outcomes.';

export const projectsPageDescription =
  'Projects across ML, databases, full-stack web, and embedded work—each with the problem, approach, tech stack, and what I learned.';

export const projectsHubSeoCopy = `${projectsPageTitle} ${projectsPageMetaDescription} ${projects.map((p) => `${p.seoTitle} ${p.seoDescription}`).join(' ')}`;

export type SkillGroup = {
  name: string;
  blurb: string;
  skills: string[];
  featured?: boolean;
};

export const csFundamentalsGroup: SkillGroup = {
  name: 'Computer Science Fundamentals',
  featured: true,
  blurb:
    'Core CS topics I use in production—data structures, algorithms, debugging, and design choices that scale.',
  skills: [
    'Data structures',
    'Algorithms',
    'Problem-solving',
    'Complexity analysis',
    'Operating systems',
    'Debugging',
    'Design patterns',
    'OOP',
    'System design',
    'Performance optimization',
    'Machine learning',
  ],
};

export const skillGroups: SkillGroup[] = [
  csFundamentalsGroup,
  {
    name: 'Core Languages',
    blurb: 'Languages used across embedded, backend, and tooling work.',
    skills: ['C++', 'Python', 'Rust', 'Bash', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    name: 'Backend & APIs',
    blurb: 'Services and data layers for web and integration work.',
    skills: ['Django REST Framework', 'Node.js', 'REST APIs', 'gRPC', 'PostgreSQL', 'MySQL'],
  },
  {
    name: 'Frontend',
    blurb: 'Interfaces shipped with React and modern CSS.',
    skills: ['React', 'HTML', 'CSS', 'Material UI', 'Next.js'],
  },
  {
    name: 'Systems & Tools',
    blurb: 'Platforms, automation, and delivery tooling.',
    skills: ['Linux', 'Docker', 'Jenkins', 'CI/CD', 'Git', 'Gerrit', 'Ubuntu', 'Selenium'],
  },
  {
    name: 'Engineering Practices',
    blurb: 'How I keep quality and collaboration high on teams.',
    skills: [
      'Debugging',
      'Integration testing',
      'Code review',
      'Design patterns',
      'OOP',
      'Microservices',
      'Agile',
      'Scrum',
      'Technical documentation',
      'Structured logging',
    ],
  },
];

export const achievements = [
  { title: 'Codeforces Expert', highlight: 'Expert', subtitle: 'Current rank on Codeforces' },
  {
    title: 'Problems solved',
    highlight: '1500+',
    subtitle: 'On online judges',
  },
  {
    title: 'Max Codeforces rating',
    highlight: '1792',
    subtitle: 'Personal best on Codeforces',
  },
  {
    title: 'Problems authored',
    highlight: '6+',
    subtitle: 'For university contests',
  },
  {
    title: 'ICPC Dhaka Regional',
    subtitle: 'Competed in multiple regionals',
  },
  {
    title: 'Red.Digital Digi-Thor',
    subtitle: '2nd runner-up',
  },
  {
    title: 'Intra AUST Programming Contest',
    subtitle: 'Champion, Spring 2019',
  },
  {
    title: 'HackerRank',
    subtitle: 'Skill certifications',
  },
];

export const workingPrinciples = [
  {
    title: 'Clear problem solving',
    description:
      'Teams can expect structured debugging: narrow the issue, document findings, and agree on next steps before large changes.',
    theme: 'Debugging',
  },
  {
    title: 'Steady delivery',
    description:
      'I balance timelines with readable code and thorough reviews so releases stay supportable after they ship.',
    theme: 'Ownership',
  },
  {
    title: 'Plain communication',
    description:
      'Tradeoffs are explained in direct language, with notes, diagrams, or comments when they speed up alignment.',
    theme: 'Collaboration',
  },
  {
    title: 'Careful quality',
    description:
      'Edge cases are considered early, and patterns like structured logging or type hints are used when they reduce future risk.',
    theme: 'Maintainability',
  },
];

export const projectsSectionDescription = sectionCopy.projects.description;

export const contactSectionMetaDescription =
  'Contact Ashikur Rahman, software developer in Ottawa, Canada. Open to roles, collaboration, and technical conversations.';

export const contactSectionDescription = sectionCopy.contact.description;

/** Searchable on-page copy for SEO coverage tests (not rendered directly as a block). */
export const seoVisibleCopy = [
  profile.role,
  projectsPageMetaDescription,
  contactSectionMetaDescription,
  profile.intro,
  profile.headline,
  profile.supportingParagraph,
  profile.aboutParagraph,
  profile.locationLine,
  ...profile.highlights,
  cpToProduction.title,
  cpToProduction.description,
  projectsSectionDescription,
  contactSectionDescription,
  ...capabilities.map((c) => `${c.title} ${c.description}`),
  ...projects.map(
    (p) =>
      `${p.title} ${p.category} ${p.description} ${p.problem ?? ''} ${p.approach ?? ''} ${p.techStack.join(' ')}`,
  ),
  ...experience.map((e) => `${e.role} ${e.summary} ${e.techStack.join(' ')}`),
  ...skillGroups.flatMap((g) => [g.name, g.blurb, ...g.skills]),
].join('\n');

/** Homepage section ids tracked for scroll-aware nav highlighting. */
export const navSectionIds = ['about', 'experience', 'skills', 'contact'] as const;

export type NavSectionId = (typeof navSectionIds)[number];

export const navItems = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Resume', href: '__resume__' },
  { label: 'Contact', href: '/#contact' },
] as const;

/** Footer mirrors primary nav; resume path is resolved in SiteFooter via siteLinks.resumeUrl. */
export const footerNavItems = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Resume', href: '__resume__' },
  { label: 'Contact', href: '/#contact' },
] as const;

export const footerSeoNavItems = [
  { label: 'Ottawa', href: '/software-developer-ottawa' },
  { label: 'Backend work', href: '/backend-developer-canada' },
  { label: 'Full-stack work', href: '/full-stack-developer-canada' },
] as const;
