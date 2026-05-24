'use client';

import Link from 'next/link';

import { Button, Navbar } from '@ashikur-portfolio/shared/ui';

import { siteLinks } from '../config/site-links';
import { navItems } from '../data/portfolio';

const APP_NAME = 'Ashikur Rahman';

const homeLogo = (
  <Link
    href="/"
    className="truncate font-display text-ui font-semibold text-foreground transition-colors hover:text-foreground/90"
  >
    {APP_NAME}
  </Link>
);

type SiteHeaderProps = {
  mode: 'home' | 'resume';
};

export function SiteHeader({ mode }: SiteHeaderProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      {mode === 'home' ? (
        <Navbar
          appName={APP_NAME}
          variant="glass"
          items={navItems.map((item) => ({ ...item, active: false }))}
          mobileItems={[
            ...navItems.map((item) => ({ ...item, active: false })),
            { label: 'Resume', href: siteLinks.resumeUrl },
          ]}
          actions={
            <Button
              variant="default"
              size="sm"
              asChild
              className="hidden bg-primary text-primary-foreground shadow-soft hover:bg-primary/90 sm:inline-flex"
            >
              <a
                href={siteLinks.resumeUrl}
                className="text-primary-foreground no-underline visited:text-primary-foreground"
              >
                Resume
              </a>
            </Button>
          }
        />
      ) : (
        <Navbar appName={APP_NAME} variant="glass" items={[]} logo={homeLogo} />
      )}
    </>
  );
}
