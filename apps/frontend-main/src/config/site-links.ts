/**
 * External links — update with your real URLs.
 * Supports NEXT_PUBLIC_* overrides for deployment.
 */

const env = (key: string, fallback: string) =>
  (typeof process !== 'undefined' && process.env[key]) || fallback;

const basePath =
  typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') || '' : '';

/** Prefix a root-relative path with Next.js basePath when configured. */
export function withBasePath(path: string): string {
  if (!path.startsWith('/')) {
    return path;
  }
  return `${basePath}${path}`;
}

export const siteLinks = {
  resumeUrl: withBasePath(env('NEXT_PUBLIC_RESUME_URL', '/resume')),
  resumePdfUrl: withBasePath(env('NEXT_PUBLIC_RESUME_PDF_URL', '/AshikurRahmanResume.pdf')),
  resumeDownloadFilename: 'AshikurRahmanResume.pdf',
  githubUrl: env('NEXT_PUBLIC_GITHUB_URL', 'https://github.com/ashikur-rahman-fh'),
  codeforcesUrl: env('NEXT_PUBLIC_CODEFORCES_URL', 'https://codeforces.com/profile/5-head'),
  linkedinUrl: env('NEXT_PUBLIC_LINKEDIN_URL', 'https://www.linkedin.com/in/ashikur-5h'),
  email: env('NEXT_PUBLIC_CONTACT_EMAIL', 'me@itsashikur.com'),
} as const;

export const mailtoHref = `mailto:${siteLinks.email}`;
