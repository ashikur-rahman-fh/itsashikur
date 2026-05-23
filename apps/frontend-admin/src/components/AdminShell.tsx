import { PageShell, type PageShellProps } from '@ashikur-portfolio/shared/ui';
import Link from 'next/link';

import { adminSiteLinks } from '@/config/site-links';

import { AdminSkipLink } from './AdminSkipLink';
import { cn } from './cn';

const adminGlassFooterClassName =
  'border-border/60 bg-card/40 backdrop-blur-md supports-[backdrop-filter]:bg-card/30';

export type AdminShellProps = Omit<PageShellProps, 'className'> & {
  className?: string;
  showFooter?: boolean;
};

export function AdminShell({
  children,
  className,
  contentClassName,
  showFooter = true,
  footer,
  header,
  ...props
}: AdminShellProps) {
  const defaultFooter = showFooter ? (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
      <p className="text-body-sm text-muted-foreground">Ashikur Portfolio — Admin</p>
      <Link
        href={adminSiteLinks.portfolioUrl}
        className="text-ui-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        View portfolio
      </Link>
    </div>
  ) : null;

  return (
    <PageShell
      className={cn('surface-grid-admin', className)}
      footerClassName={adminGlassFooterClassName}
      header={
        <>
          <AdminSkipLink />
          {header}
        </>
      }
      contentClassName={cn('py-8 sm:py-10', contentClassName)}
      footer={showFooter ? (footer ?? defaultFooter) : footer}
      {...props}
    >
      <div id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </div>
    </PageShell>
  );
}
