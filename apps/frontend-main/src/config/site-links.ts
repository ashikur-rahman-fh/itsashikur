/**
 * External links — update with your real URLs.
 * Supports NEXT_PUBLIC_* overrides for deployment.
 */

const env = (key: string, fallback: string) =>
  (typeof process !== 'undefined' && process.env[key]) || fallback;

export const siteLinks = {
  resumeUrl: env('NEXT_PUBLIC_RESUME_URL', '/resume'),
  githubUrl: env('NEXT_PUBLIC_GITHUB_URL', 'https://github.com/ashikurrahman'),
  codeforcesUrl: env('NEXT_PUBLIC_CODEFORCES_URL', 'https://codeforces.com/profile/ashikurrahman'),
  linkedinUrl: env('NEXT_PUBLIC_LINKEDIN_URL', 'https://www.linkedin.com/in/ashikurrahman'),
  email: env('NEXT_PUBLIC_CONTACT_EMAIL', 'me@itsashikur.com'),
} as const;

export const mailtoHref = `mailto:${siteLinks.email}`;
