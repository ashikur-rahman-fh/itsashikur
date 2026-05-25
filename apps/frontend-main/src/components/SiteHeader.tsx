'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { Navbar, type NavbarItem } from '@ashikur-portfolio/shared/ui';

import { siteLinks, withBasePath } from '../config/site-links';
import { navItems } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';

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

function isNavItemActive(
  href: string,
  pathname: string | null,
  activeSection: ReturnType<typeof useActiveSection>,
): boolean {
  const resolved = resolveNavHref(href);
  const currentPath = pathname ?? '';

  if (resolved === withBasePath('/projects')) {
    const projectsPath = withBasePath('/projects');
    return currentPath === projectsPath || currentPath.startsWith(`${projectsPath}/`);
  }

  if (resolved === siteLinks.resumeUrl) {
    return currentPath === siteLinks.resumeUrl;
  }

  if (currentPath !== '/') {
    return false;
  }

  const hashMatch = resolved.match(/^\/#(.+)$/);
  if (hashMatch && activeSection) {
    return hashMatch[1] === activeSection;
  }

  return false;
}

export function SiteHeader() {
  const pathname = usePathname();
  const activeSection = useActiveSection(pathname === '/');

  const items: NavbarItem[] = useMemo(
    () =>
      navItems.map((item) => ({
        label: item.label,
        href: resolveNavHref(item.href),
        active: isNavItemActive(item.href, pathname, activeSection),
      })),
    [pathname, activeSection],
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
