import Link from 'next/link';

import { Section } from '@ashikur-portfolio/shared/ui';

export const portfolioExploreLinks = [
  { label: 'About me', href: '/about', description: 'Background, approach, and engineering focus' },
  {
    label: 'Experience',
    href: '/experience',
    description: 'Nokia, Enosis, and production software roles',
  },
  {
    label: 'Projects',
    href: '/projects',
    description: 'Backend, embedded, ML, and full-stack work samples',
  },
  {
    label: 'Blog',
    href: '/blog',
    description: 'Engineering notes, debugging lessons, and technical articles',
  },
  { label: 'Resume', href: '/resume', description: 'Downloadable PDF resume' },
  { label: 'Contact', href: '/contact', description: 'Send a message or connect directly' },
] as const;

export function PortfolioExploreSection() {
  return (
    <Section
      id="explore"
      variant="muted"
      heading={{
        eyebrow: 'Portfolio',
        title: 'Explore my portfolio',
        description:
          'Jump to the pages recruiters and collaborators use most—each with its own focus and detail.',
      }}
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioExploreLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="portfolio-surface block h-full p-5 transition-colors hover:border-accent/40 sm:p-6"
            >
              <span className="font-display text-card-title font-semibold text-foreground">
                {link.label}
              </span>
              <span className="mt-2 block text-body-sm leading-relaxed text-muted-foreground">
                {link.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
