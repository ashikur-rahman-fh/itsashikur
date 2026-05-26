import Link from 'next/link';

import { Container } from '@ashikur-portfolio/shared/ui';

import { siteLinks } from '../config/site-links';
import { footerNavItems, footerSeoNavItems, profile } from '../data/portfolio';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <div className="border-t border-border py-8">
      <Container className="space-y-6 text-center">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {footerNavItems.map((item) => {
              const className =
                'text-body-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline';

              if (item.href === '__resume__') {
                return (
                  <li key={item.label}>
                    <Link href={siteLinks.resumeUrl} className={className}>
                      {item.label}
                    </Link>
                  </li>
                );
              }

              if (item.href.startsWith('/')) {
                return (
                  <li key={item.label}>
                    <Link href={item.href} className={className}>
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <a href={item.href} className={className}>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <nav aria-label="Focus areas" className="border-t border-border pt-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {footerSeoNavItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-body-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-body-sm text-muted-foreground">
          {profile.name} — Software developer · Ottawa, Ontario
        </p>
        <p className="text-body-sm text-muted-foreground">
          <a
            href={siteLinks.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            LinkedIn
          </a>
          {' · '}
          <a
            href={siteLinks.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            GitHub
          </a>
        </p>
        <p className="text-body-sm text-muted-foreground">
          © {year} {profile.name}. All rights reserved.
        </p>
      </Container>
    </div>
  );
}
