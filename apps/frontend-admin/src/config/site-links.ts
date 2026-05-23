const env = (key: string, fallback: string) =>
  (typeof process !== 'undefined' && process.env[key]) || fallback;

/** Public portfolio site — used for “back to site” links from admin. */
export const adminSiteLinks = {
  portfolioUrl: env('NEXT_PUBLIC_PORTFOLIO_URL', 'https://itsashikur.com'),
} as const;
