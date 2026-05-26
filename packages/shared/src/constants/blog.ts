export const BLOG_CATEGORIES = [
  'Software Engineering',
  'Projects',
  'System Design',
  'Data Structures & Algorithms',
  'Backend Engineering',
  'Frontend Engineering',
  'DevOps & Deployment',
  'Career & Learning',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_STATUSES = ['draft', 'published', 'archived'] as const;

export type BlogStatus = (typeof BLOG_STATUSES)[number];

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
