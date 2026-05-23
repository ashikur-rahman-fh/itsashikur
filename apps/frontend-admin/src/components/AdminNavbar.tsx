'use client';

import { Navbar } from '@ashikur-portfolio/shared/ui';
import type { ReactNode } from 'react';

import { ADMIN_AUTH_COPY } from '@/auth/messages';

const ADMIN_HOME_HREF = '/' as const;

export type AdminNavbarProps = {
  actions?: ReactNode;
  /** Mark Home active when on the admin home (profile) page. */
  activeHref?: typeof ADMIN_HOME_HREF;
};

export function AdminNavbar({ actions, activeHref }: AdminNavbarProps) {
  return (
    <Navbar
      variant="glass"
      appName="Ashikur Portfolio — Admin"
      items={[
        {
          label: ADMIN_AUTH_COPY.navHome,
          href: ADMIN_HOME_HREF,
          active: activeHref === ADMIN_HOME_HREF,
        },
      ]}
      actions={actions}
    />
  );
}
