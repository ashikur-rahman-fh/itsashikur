import type { StatItemData } from '@ashikur-portfolio/shared/ui';

export const profile = {
  name: 'Ashikur Rahman',
  role: 'Software Engineer',
  currentRole: 'Software Developer at Nokia',
  locationLine:
    'Ottawa, Canada · Open to software engineering collaboration, or a technical discussion',
  headline:
    'Software developer focused on reliable production systems, clear debugging, and code that teams can maintain and extend.',
  supportingParagraph:
    'Over four years in industry, I have shipped work in embedded environments, backend services, APIs, and web interfaces. I work well in Agile teams and communicate through documentation, reviews, and mentoring.',
  aboutParagraph:
    'Strong debugging and logging are central to how I work. At Nokia, that meant structured logging for OTOS; on earlier products, it meant faster APIs and clearer form flows. I have also mentored 80+ students in algorithms and data structures, which keeps my explanations practical and patient.',
  highlights: [
    'Production software at Nokia: structured logging, better incident traceability, and developer tooling adoption',
    'Full-stack delivery with Django, React, and REST APIs on HIPAA-aware web products',
    'Deep algorithms background: Codeforces Expert, 1500+ problems solved, contest training experience',
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
  title: 'How contest practice supports my engineering work',
  description:
    'Competitive programming is not a substitute for production experience, but it strengthens how I reason about correctness, complexity, and edge cases.',
  bullets: [
    'Break problems into parts that are easier to test and review',
    'Think through edge cases before changes go to production',
    'Choose approaches that respect time and memory limits',
    'Keep implementations readable for the next engineer',
  ],
};

export const experience = [
  {
    role: 'Software Developer',
    company: 'Nokia',
    period: 'Mar 2023 – Present',
    location: 'Ottawa, Ontario, Canada · Hybrid',
    highlight: '60%+ better incident traceability · 25% less troubleshooting time',
    summary:
      'Build and improve software where logging, debugging, and developer workflow matter in large engineering environments.',
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
    role: 'Software Engineer',
    company: 'Enosis Solutions',
    period: 'Nov 2021 – Aug 2022',
    location: 'Dhaka, Bangladesh',
    summary:
      'Delivered full-stack features with developers and QA in Scrum, from payment flows to HIPAA-compliant digital forms.',
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
    focus: 'Strong foundation in algorithms, systems, and software engineering practice.',
    highlights: [
      'Core coursework in algorithms, operating systems, and software engineering',
      'Active in ACM Lab-02 competitive programming community',
    ],
  },
];

export const projects = [
  {
    title: 'Movie Genre Prediction',
    category: 'Machine learning',
    description:
      'Text classifier that predicts movie genres from plot summaries across overlapping labels.',
    problem: 'Plot text is noisy, and titles often belong to several genres at once.',
    approach:
      'Built a PyTorch pipeline with scikit-learn preprocessing, text features, and tuned models for 19 labels.',
    techStack: ['Python', 'PyTorch', 'scikit-learn'],
    result: '49%+ accuracy on 4,456 held-out plots across 19 genres.',
  },
  {
    title: 'Shop Management System',
    category: 'Databases',
    description: 'Distributed database design for shop and inventory data across multiple sites.',
    problem: 'Inventory had to stay consistent across separate Oracle database nodes.',
    approach:
      'Designed schemas, distribution rules, and SQL for cross-site queries with integrity constraints.',
    techStack: ['Oracle SQL', 'Distributed databases'],
    result: 'Demonstrated a maintainable pattern for multi-site shop data.',
  },
  {
    title: 'Todo App',
    category: 'Full-stack',
    description: 'Task and reminder application with a separated API and React client.',
    problem: 'Users needed dependable task tracking with clear due dates.',
    approach:
      'Implemented a Node.js REST API and React UI with persistent storage and explicit client/server boundaries.',
    techStack: ['Node.js', 'React', 'REST APIs'],
    result: 'Reliable task persistence with a straightforward API contract.',
  },
  {
    title: 'Cleaning Car',
    category: 'Embedded',
    description: 'Embedded controller that follows programmed paths to clean a flat surface.',
    problem: 'Motor control and sensor feedback had to stay stable under hardware limits.',
    approach:
      'Wrote control logic with sensor input, movement commands, and iterative on-device testing.',
    techStack: ['C', 'Embedded systems'],
    result: 'Completed repeatable cleaning paths on a flat test surface.',
  },
];

export const skillGroups = [
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
    skills: ['React', 'HTML', 'CSS', 'Material UI'],
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
  {
    name: 'Computer Science',
    blurb: 'Foundations that support performance and correctness decisions.',
    skills: ['Data structures', 'Algorithms', 'Operating systems', 'Machine learning'],
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

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Impact', href: '#impact' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
] as const;
