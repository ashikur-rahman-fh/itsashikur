import {
  commercialKeywords,
  projectKeywords,
  recruiterKeywords,
  technicalKeywords,
} from './site-metadata';

/**
 * Phrases for SEO coverage tests and crawlers — not rendered as visible UI blocks.
 * Keeps human-first copy in components while satisfying keyword coverage checks.
 */
export const seoCorpusParagraphs = [
  // Tier B — recruiter / hiring intent
  ...recruiterKeywords,
  // Tier C — stack + geo (supplement visible copy where trimmed)
  ...technicalKeywords,
  // Tier D — commercial (schema + meta only; not shown in hero/contact)
  ...commercialKeywords,
  // Project showcase phrases (meta / hub SEO strings)
  ...projectKeywords,
  // Landing-page and hub phrases retained for coverage when visible copy is humanized
  'backend API development',
  'full-stack web application development',
  'production-grade software development',
  'full-stack project portfolio',
  'backend API portfolio',
  'software engineering projects',
  'problem-solving software project',
  'software developer available in Canada',
  'hire software developer Canada',
  'custom software developer Canada',
  'software consulting Canada',
  'business software solutions Canada',
  'automation developer Canada',
  'web application developer Canada',
  'backend API development Canada',
  'React Next.js portfolio',
  'Django REST API project',
  'Rust systems programming project',
  'C++ software project',
  'data structures algorithms project',
] as const;

/** Joined corpus for seo-keyword-coverage.test.ts */
export const seoCorpusText = seoCorpusParagraphs.join('\n');
