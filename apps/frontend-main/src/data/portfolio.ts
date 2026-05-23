import type { StatItemData } from '@ashikur-portfolio/shared/ui';

export const profile = {
  name: 'Ashikur Rahman',
  role: 'Software Developer at Nokia',
  headline:
    'I build reliable software by combining clean engineering practices, strong problem-solving, and production software experience.',
  supportingParagraph:
    'I focus on writing maintainable code, debugging complex production issues, and collaborating across teams to deliver dependable systems. From integration testing to structured observability, I bring disciplined engineering and competitive programming rigor to real-world software problems.',
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

export const heroStats: StatItemData[] = [
  { value: '3+', label: 'years professional experience', animate: true },
  { value: '1500+', label: 'problems solved', animate: true },
  { value: '1792', label: 'max Codeforces rating', animate: true },
  { value: '60%+', label: 'improved incident traceability', highlight: true, animate: true },
  { value: '25%', label: 'reduced troubleshooting time', highlight: true, animate: true },
];

export const cpToProduction = {
  title: 'Competitive Programming → Production Engineering',
  description:
    'Contest problem solving trains habits that transfer directly to shipping reliable software in production environments.',
  bullets: [
    'Breaking complex problems into smaller, testable parts',
    'Edge-case thinking before code review and release',
    'Choosing efficient algorithms under real constraints',
    'Debugging under pressure with structured hypotheses',
    'Performance optimization without sacrificing clarity',
    'Clean implementation that teammates can maintain',
    'Writing reliable code that survives production load',
  ],
};

export const experience = [
  {
    role: 'Software Developer',
    company: 'Nokia',
    period: 'Present',
    location: 'Finland',
    summary:
      'Building and improving production systems with a focus on observability, developer experience, and cross-team engineering practices.',
    impacts: [
      'Designed and implemented RFC-5424-based structured logging in the OTOS system.',
      'Enabled machine-readable log parsing for faster automated analysis.',
      'Improved incident traceability by 60%+ across troubleshooting workflows.',
      'Reduced manual troubleshooting time by 25%.',
      'Introduced Python type-hinting practices across APT test and developer teams.',
      'Improved code readability, editor navigation, and developer workflow.',
    ],
    techStack: [
      'C++',
      'Python',
      'Linux',
      'Docker',
      'CI/CD',
      'Git',
      'Gerrit',
      'Structured logging',
      'Integration testing',
      'Code review',
    ],
    featured: true,
  },
];

export const projects = [
  {
    title: 'Movie Genre Prediction',
    description:
      'Supervised multi-class classification on movie plot summaries to predict genres from text.',
    problem:
      'Classify movies into multiple genres from unstructured plot text with high label overlap.',
    approach:
      'Built a PyTorch pipeline with scikit-learn preprocessing, feature engineering on text, and tuned multi-class models across 19 genre labels.',
    techStack: ['Python', 'PyTorch', 'scikit-learn'],
    result: '4,456 movie plots, 19 genres, 49%+ accuracy on held-out evaluation.',
  },
  {
    title: 'Shop Management System',
    description:
      'Distributed database system for managing shops across multiple database locations.',
    problem:
      'Coordinate inventory and shop data consistently across geographically distributed Oracle database nodes.',
    approach:
      'Designed relational schemas, distribution strategy, and SQL operations for cross-location queries and data integrity.',
    techStack: ['Oracle SQL', 'Distributed databases'],
    result: 'Demonstrated reliable multi-site shop data management patterns.',
  },
  {
    title: 'Todo App',
    description: 'Full-stack personal todos and reminders application.',
    problem: 'Users need a simple, reliable way to track tasks and reminder deadlines.',
    approach:
      'Node.js REST API with a React front end, persistent storage, and clear separation between UI state and server persistence.',
    techStack: ['Node.js', 'React', 'REST APIs'],
  },
  {
    title: 'Cleaning Car',
    description: 'Embedded system that cleans a flat surface based on programmed instructions.',
    problem:
      'Automate surface cleaning paths with reliable motor control and instruction following.',
    approach:
      'Embedded control logic with sensor input, movement commands, and iterative testing on hardware constraints.',
    techStack: ['C', 'Embedded systems'],
    result: 'Completed autonomous cleaning paths on a flat test surface.',
  },
];

export const skillGroups = [
  {
    name: 'Core Languages',
    skills: ['C++', 'Python', 'Rust', 'Bash', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    name: 'Backend & APIs',
    skills: ['Django REST Framework', 'Node.js', 'REST APIs', 'gRPC', 'PostgreSQL', 'MySQL'],
  },
  {
    name: 'Frontend',
    skills: ['React', 'HTML', 'CSS', 'Material UI'],
  },
  {
    name: 'Systems & Tools',
    skills: ['Linux', 'Docker', 'Jenkins', 'CI/CD', 'Git', 'Gerrit', 'Ubuntu'],
  },
  {
    name: 'Engineering Practices',
    skills: [
      'Debugging',
      'Integration testing',
      'Code review',
      'Design patterns',
      'OOP',
      'Microservices',
    ],
  },
  {
    name: 'Computer Science',
    skills: ['Data structures', 'Algorithms', 'Operating systems', 'Machine learning'],
  },
];

export const achievements = [
  { title: 'Codeforces Expert', highlight: 'Expert', subtitle: 'Competitive programming rank' },
  {
    title: 'Problems solved',
    highlight: '1500+',
    subtitle: 'Across online judges',
  },
  {
    title: 'Max Codeforces rating',
    highlight: '1792',
    subtitle: 'Personal best',
  },
  {
    title: 'Problems authored',
    highlight: '6+',
    subtitle: 'Contest problem setting',
  },
  {
    title: 'ICPC Dhaka Regional',
    subtitle: 'Multiple regional placements',
  },
  {
    title: 'Red.Digital Digi-Thor',
    subtitle: '2nd Runner Up — Programming Contest',
  },
  {
    title: 'Intra AUST Programming Contest',
    subtitle: 'Champion — Spring 2019',
  },
  {
    title: 'HackerRank',
    subtitle: 'Verified skill certifications',
  },
];

/** Draft testimonials — replace with real quotes when available. */
export const testimonials = [
  {
    quote:
      'Ashikur is a deep thinker who breaks down complex problems methodically and communicates solutions clearly to the team.',
    name: 'Team Lead',
    role: 'Engineering Manager · Nokia',
    theme: 'Critical thinker',
  },
  {
    quote:
      'He consistently meets deadlines with high standards, takes ownership of deliverables, and supports teammates during integration.',
    name: 'Senior Engineer',
    role: 'Software Development · Nokia',
    theme: 'Reliable teammate',
  },
  {
    quote:
      'A quick learner who applies strong fundamentals from competitive programming to production debugging and code quality.',
    name: 'Colleague',
    role: 'Software Developer · Nokia',
    theme: 'Technically sound',
  },
  {
    quote:
      'Organized, quality-focused, and proactive in code review — his type-hinting initiative improved readability across our codebase.',
    name: 'Developer',
    role: 'APT / Test Engineering · Nokia',
    theme: 'Quality-focused',
  },
];

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
] as const;
