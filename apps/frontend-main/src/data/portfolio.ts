import type { StatItemData } from '@ashikur-portfolio/shared/ui';

export const sectionCopy = {
  about: {
    title: 'About me',
    description:
      'Four years in industry—embedded and production software at Nokia in Ottawa, full-stack at Enosis before that.',
  },
  experience: {
    title: 'Work experience',
    description:
      'Nokia today; before that full-stack product work, an internship across the stack, and algorithms mentoring at university.',
  },
  projects: {
    title: 'Selected projects',
    description:
      'A sample of ML, database, full-stack, and embedded work—with what I built and what I took away.',
  },
  skills: {
    title: 'Skills',
    description:
      'Languages and tools I use day to day, from C++ and Python on Linux to React and Django REST APIs.',
  },
  capabilities: {
    title: 'What I work on',
    description:
      'Backend APIs, full-stack web, embedded systems, observability, and the tooling that supports delivery.',
  },
  achievements: {
    title: 'Competitive programming',
    description:
      'Contest results that back up strong fundamentals—complexity, edge cases, and clean implementations.',
  },
  contact: {
    title: 'Get in touch',
    description:
      'Based in Ottawa. I build backend systems, embedded software, and full-stack apps in production—see experience and projects below, or send a message.',
  },
} as const;

export const profile = {
  name: 'Ashikur Rahman',
  role: 'Software Developer',
  currentRole: 'Software Developer at Nokia',
  locationLine:
    'Ottawa, ON · Backend, full-stack, and embedded software · Four years in production',
  intro:
    "I'm a software developer in Ottawa, working at Nokia. I build backend systems, embedded software, APIs, full-stack apps, and tools teams can run and debug in production.",
  headline: 'Backend, full-stack, and embedded software · Ottawa',
  supportingParagraph:
    'Four years across embedded, backend, and web. I care about APIs that are easy to debug, logs you can search, and code the next person can follow. Competitive programming keeps my edge-case thinking sharp.',
  aboutParagraph:
    'At Nokia I introduced RFC-5424 structured logging so incidents are easier to trace. Before that I shipped Django and React features on HIPAA-aware products at Enosis. I also trained 80+ students in algorithms and data structures, which keeps my explanations clear in code reviews.',
  highlights: [
    'Nokia: structured logging and faster incident analysis on production telecom software',
    'Enosis: Django REST Framework, React, and PostgreSQL on HIPAA-aware web products',
    'Codeforces Expert · 1500+ problems solved',
  ],
  primaryStack: ['C++', 'Python', 'Linux', 'React', 'REST APIs'],
  softSkills: ['Communication', 'Teamwork', 'Mentoring', 'Ownership', 'Critical thinking'] as const,
};

export const impactIntro = {
  footnote: "Metrics from structured logging work on Nokia's OTOS system.",
};

export const productionMetrics: StatItemData[] = [
  { value: '4+', label: 'years in industry', animate: true },
  { value: '60%+', label: 'better incident traceability', highlight: true, animate: true },
  { value: '25%', label: 'less troubleshooting time', highlight: true, animate: true },
];

export const algorithmMetrics: StatItemData[] = [
  { value: '1500+', label: 'problems solved on online judges', animate: true },
  { value: '1792', label: 'peak Codeforces rating', animate: true },
];

/** @deprecated Use productionMetrics + algorithmMetrics in ImpactSection; kept for resume compatibility */
export const heroStats: StatItemData[] = [...productionMetrics, ...algorithmMetrics];

export const cpToProduction = {
  title: 'From contests to production',
  description:
    'Contests sharpen how I think about complexity, edge cases, and readable code under time pressure—habits I carry into production work.',
  bullets: [
    'Split work into small, testable pieces with clear interfaces',
    'Check edge cases and invariants before shipping',
    'Pick approaches that fit time, memory, and ops constraints',
    'Write code the next engineer can follow',
  ],
};

export const capabilities = [
  {
    title: 'Problem-solving & CS fundamentals',
    description:
      'Apply data structures, algorithms, and complexity analysis when debugging and designing features.',
  },
  {
    title: 'Backend & APIs',
    description:
      'Design REST APIs and data models with validation, logging, and contracts that hold up after launch.',
  },
  {
    title: 'Full-stack web',
    description:
      'Ship end-to-end with Django REST Framework, React, Next.js, and clear client/server boundaries.',
  },
  {
    title: 'Systems & embedded',
    description: 'Work in C/C++ and Linux when performance and hardware limits matter.',
  },
  {
    title: 'Observability & debugging',
    description:
      'Structured logging, traceable incidents, and root-cause analysis in large codebases.',
  },
  {
    title: 'Automation & delivery',
    description: 'CI/CD, Docker, and release tooling on Linux and cloud platforms.',
  },
  {
    title: 'Technical mentoring',
    description:
      'Coach students and teammates on algorithms and data structures with practical examples.',
  },
] as const;

export const experience = [
  {
    role: 'Software Developer',
    company: 'Nokia',
    period: 'Mar 2023 – Present',
    location: 'Ottawa, Ontario, Canada · Hybrid',
    highlight: 'Structured logging · faster incident analysis',
    summary: 'Improve logging, debugging, and developer workflows on production telecom software.',
    impacts: [
      'Designed RFC-5424 structured logging for OTOS so logs are machine-readable and searchable.',
      'Cut manual troubleshooting time and made incidents easier to trace end to end.',
      'Drove Python type-hint adoption across APT test and development teams.',
      'Improved readability and navigation in large shared codebases.',
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
      'Shipped full-stack features and Django REST APIs in Scrum—from payments to HIPAA-compliant digital forms.',
    impacts: [
      'Built and tested payment and automated campaign features for client products.',
      'Refactored UIs and sped up REST APIs for HIPAA-compliant form apps.',
      'Helped ship products that earned 700+ positive user reviews.',
      'Code reviews, Scrum ceremonies, and clear technical documentation.',
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
    summary: 'Client delivery across frontend, backend, Python automation, and C++.',
    impacts: [
      'Delivered Python automation with Selenium for scraping and browser workflows.',
      'Fixed high-priority bugs and lowered memory and CPU usage in existing services.',
      'Extended a multi-threaded C++ point-of-sale system with new functionality.',
      'Clarified requirements and suggested practical fixes during delivery.',
    ],
    techStack: ['Python', 'Selenium', 'C++', 'JavaScript', 'Performance profiling'],
  },
  {
    role: 'Programming Contest Trainer',
    company: 'ACM Lab-02, AUST',
    period: 'Jan 2019 – Jul 2021',
    location: 'Dhaka, Bangladesh',
    highlight: '80+ students mentored · 20% higher contest participation',
    summary: 'Taught algorithms and data structures and set problems for university contests.',
    impacts: [
      'Mentored 80+ students across three semesters.',
      'Raised contest participation by 20% and overall team performance by 5%.',
      'Authored and judged problems for intra-university programming contests.',
      'Taught problem-solving approaches that students reused in coursework and contests.',
    ],
    techStack: ['Algorithms', 'Data structures', 'Mentoring', 'Technical communication'],
  },
];

export const educationSectionDescription =
  'BSc in computer science and engineering, with heavy involvement in competitive programming at AUST.';

export const education = [
  {
    degree: 'BSc in Computer Science & Engineering',
    institution: 'Ahsanullah University of Science and Technology (AUST)',
    period: '2016 – 2021',
    location: 'Dhaka, Bangladesh',
    focus: 'Coursework in algorithms, operating systems, and software engineering.',
    highlights: [
      'Algorithms, operating systems, and software engineering',
      'ACM Lab-02 competitive programming community',
    ],
  },
];

export const workingStyleSectionDescription = 'What teammates can expect when we work together.';

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
      'Python and PyTorch multi-label genre classifier from plot text, evaluated on held-out data.',
    description: 'Predicts movie genres from plot summaries with a PyTorch pipeline.',
    problem: 'Plot summaries are noisy; each film can have several genres.',
    constraints:
      '19 overlapping labels and thousands of plots—accuracy had to be measured on held-out data, not training sets alone.',
    approach:
      'Preprocessed text with scikit-learn, then trained and tuned PyTorch models for multi-label output.',
    engineeringChoices:
      'Kept preprocessing, training, and evaluation in separate steps so runs stayed reproducible.',
    validation: 'Reported accuracy on 4,456 held-out plots.',
    techStack: ['Python', 'PyTorch', 'scikit-learn'],
    result: '49%+ accuracy on 4,456 held-out plots across 19 labels.',
    featured: true,
  },
  {
    slug: 'shop-management-system',
    title: 'Shop Management System',
    category: 'Databases',
    seoTitle: 'Shop Management System | Distributed Oracle SQL',
    seoDescription:
      'Distributed database design for shop and inventory data across Oracle nodes with integrity constraints.',
    description: 'Shop and inventory data split across Oracle nodes with consistent queries.',
    problem: 'Inventory had to stay consistent when data lived on separate database sites.',
    constraints: 'Shards on different nodes still needed correct joins and integrity checks.',
    approach:
      'Designed schemas, distribution rules, and SQL for cross-site queries with explicit constraints.',
    engineeringChoices:
      'Normalized entities and relationships so cross-site queries stay consistent.',
    validation: 'Ran cross-node queries against representative shop and inventory scenarios.',
    techStack: ['Oracle SQL', 'Distributed databases'],
    result: 'A repeatable pattern for querying inventory across database sites.',
  },
  {
    slug: 'todo-app',
    title: 'Todo App',
    category: 'Full-stack',
    seoTitle: 'Todo App | Node.js and React full-stack',
    seoDescription:
      'Node.js REST API and React task app with a clear API contract and persistent storage.',
    description: 'Task and reminder app with a Node.js REST API and React client.',
    problem: 'Users needed tasks and due dates that stayed accurate.',
    constraints: 'UI and API had to stay aligned with persistent storage behind the REST layer.',
    approach:
      'Built REST endpoints and a React UI with clear separation between views and data access.',
    engineeringChoices:
      'Documented API resources so the UI could change without breaking stored tasks.',
    validation: 'Walked create and update flows through API and UI to confirm persistence.',
    techStack: ['Node.js', 'React', 'REST APIs'],
    result: 'Tasks and due dates stay in sync between the React UI and Node API.',
    featured: true,
  },
  {
    slug: 'cleaning-car',
    title: 'Cleaning Car',
    category: 'Embedded',
    seoTitle: 'Cleaning Car | Embedded C++',
    seoDescription:
      'Embedded controller with sensor feedback and motor control for repeatable path cleaning under hardware constraints.',
    description: 'Embedded controller that follows paths to clean a flat test surface.',
    problem: 'Motors and sensors had to stay stable within tight onboard limits.',
    constraints:
      'Limited memory, noisy sensors, and a need for repeatable paths on a flat surface.',
    approach:
      'Iterated on control logic with sensor reads, movement commands, and on-device tests.',
    engineeringChoices:
      'Used explicit state transitions so movement logic stayed readable on the device.',
    validation: 'Repeated on-device runs until paths were stable trial to trial.',
    techStack: ['C', 'Embedded systems'],
    result: 'Stable, repeatable cleaning paths on a flat test surface.',
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
  "Ashikur Rahman's software projects: backend APIs, full-stack web, ML, databases, and embedded work—with stacks and outcomes.";

export const projectsPageDescription =
  'ML, databases, full-stack, and embedded projects—what I built, how, and what I learned.';

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
    'Data structures, algorithms, and debugging I use when shipping and fixing production code.',
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
    blurb: 'Embedded, backend, and tooling languages.',
    skills: ['C++', 'Python', 'Rust', 'Bash', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    name: 'Backend & APIs',
    blurb: 'APIs and databases for web and integrations.',
    skills: ['Django REST Framework', 'Node.js', 'REST APIs', 'gRPC', 'PostgreSQL', 'MySQL'],
  },
  {
    name: 'Frontend',
    blurb: 'React interfaces and modern CSS.',
    skills: ['React', 'HTML', 'CSS', 'Material UI', 'Next.js'],
  },
  {
    name: 'Systems & Tools',
    blurb: 'Linux, containers, CI/CD, and delivery tooling.',
    skills: ['Linux', 'Docker', 'Jenkins', 'CI/CD', 'Git', 'Gerrit', 'Ubuntu', 'Selenium'],
  },
  {
    name: 'Engineering Practices',
    blurb: 'Reviews, testing, and documentation on teams.',
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
  { title: 'Codeforces Expert', highlight: 'Expert', subtitle: 'Current rank' },
  {
    title: 'Problems solved',
    highlight: '1500+',
    subtitle: 'Online judges',
  },
  {
    title: 'Max Codeforces rating',
    highlight: '1792',
    subtitle: 'Personal best',
  },
  {
    title: 'Problems authored',
    highlight: '6+',
    subtitle: 'University contests',
  },
  {
    title: 'ICPC Dhaka Regional',
    subtitle: 'Multiple regionals',
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
    subtitle: 'Certifications',
  },
];

export const workingPrinciples = [
  {
    title: 'Clear problem solving',
    description:
      'I narrow bugs with logs and repro steps, document what I find, and agree on next steps before big changes.',
    theme: 'Debugging',
  },
  {
    title: 'Steady delivery',
    description: 'I keep PRs readable and reviewed so what we ship stays easy to support.',
    theme: 'Ownership',
  },
  {
    title: 'Plain communication',
    description: 'I explain tradeoffs in plain language—notes or diagrams when that saves time.',
    theme: 'Collaboration',
  },
  {
    title: 'Careful quality',
    description:
      'I flag edge cases early and use logging or types when they prevent repeat incidents.',
    theme: 'Maintainability',
  },
];

export const contactSidebar = {
  title: 'Other ways to reach me',
  description: 'Email or LinkedIn work too.',
} as const;

export const projectsSectionDescription = sectionCopy.projects.description;

export const contactSectionMetaDescription =
  'Contact Ashikur Rahman—software developer in Ottawa, Canada. Backend, full-stack, and embedded experience with production results at Nokia and Enosis.';

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
  { label: 'Software developer in Ottawa', href: '/software-developer-ottawa' },
  { label: 'Backend developer', href: '/backend-developer-canada' },
  { label: 'Full-stack developer', href: '/full-stack-developer-canada' },
  { label: 'Embedded developer', href: '/embedded-developer-canada' },
] as const;
