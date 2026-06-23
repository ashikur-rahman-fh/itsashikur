'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { Navbar, type NavbarItem } from '@ashikur-portfolio/shared/ui';

import { siteLinks, withBasePath } from '../config/site-links';
import { navItems } from '../data/portfolio';

const APP_NAME = 'Ashikur Rahman';

const homeLogo = (
  <Link
    href="/"
    className="truncate font-display text-ui font-semibold uppercase tracking-wide text-foreground transition-colors hover:text-foreground/90"
  >
    {APP_NAME}
  </Link>
);

function resolveNavHref(href: string): string {
  if (href === '__resume__') {
    return siteLinks.resumeUrl;
  }
  return withBasePath(href);
}

function normalizePath(pathname: string | null): string {
  const current = pathname ?? '/';
  if (current.length > 1 && current.endsWith('/')) {
    return current.slice(0, -1);
  }
  return current || '/';
}

function isNavItemActive(href: string, pathname: string | null): boolean {
  const resolved = resolveNavHref(href);
  const currentPath = normalizePath(pathname);

  if (resolved === withBasePath('/')) {
    return currentPath === '/';
  }

  if (resolved === siteLinks.resumeUrl) {
    return currentPath === siteLinks.resumeUrl;
  }

  return currentPath === resolved || currentPath.startsWith(`${resolved}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  const items: NavbarItem[] = useMemo(
    () =>
      navItems.map((item) => ({
        label: item.label,
        href: resolveNavHref(item.href),
        active: isNavItemActive(item.href, pathname),
      })),
    [pathname],
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <Navbar appName={APP_NAME} variant="glass" items={items} logo={homeLogo} />
    </>
  );
}
