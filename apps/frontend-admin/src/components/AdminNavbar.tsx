'use client';

import { Navbar } from '@ashikur-portfolio/shared/ui';
import type { ReactNode } from 'react';

import { ADMIN_AUTH_COPY } from '@/auth/messages';

export type AdminNavbarProps = {
  activeHref: '/' | '/change-password';
  actions?: ReactNode;
};

const NAV_ITEMS = [
  { label: 'Profile', href: '/' as const },
  { label: ADMIN_AUTH_COPY.changePassword, href: '/change-password' as const },
];

export function AdminNavbar({ activeHref, actions }: AdminNavbarProps) {
  return (
    <Navbar
      variant="glass"
      appName="Ashikur Portfolio — Admin"
      items={NAV_ITEMS.map((item) => ({
        ...item,
        active: item.href === activeHref,
      }))}
      actions={actions}
    />
  );
}
