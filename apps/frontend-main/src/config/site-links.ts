/**
 * External links — update with your real URLs.
 * Supports NEXT_PUBLIC_* overrides for deployment.
 */

const env = (key: string, fallback: string) =>
  (typeof process !== 'undefined' && process.env[key]) || fallback;

const optionalEnv = (key: string) =>
  typeof process !== 'undefined' ? process.env[key]?.trim() || undefined : undefined;

export const siteLinks = {
  resumeUrl: env('NEXT_PUBLIC_RESUME_URL', '/resume'),
  resumeDownloadUrl: optionalEnv('NEXT_PUBLIC_RESUME_DOWNLOAD_URL'),
  githubUrl: env('NEXT_PUBLIC_GITHUB_URL', 'https://github.com/ashikur-rahman-fh'),
  codeforcesUrl: env('NEXT_PUBLIC_CODEFORCES_URL', 'https://codeforces.com/profile/5-head'),
  linkedinUrl: env('NEXT_PUBLIC_LINKEDIN_URL', 'https://www.linkedin.com/in/ashikur-5h'),
  email: env('NEXT_PUBLIC_CONTACT_EMAIL', 'me@itsashikur.com'),
} as const;

export const mailtoHref = `mailto:${siteLinks.email}`;
