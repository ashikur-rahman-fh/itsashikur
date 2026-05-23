import { PageShell, type PageShellProps } from '@ashikur-portfolio/shared/ui';
import type { ReactNode } from 'react';

import { AdminSkipLink } from './AdminSkipLink';
import { cn } from './cn';

export type AdminAuthShellProps = {
  children: ReactNode;
  eyebrow?: string;
  brandSubtitle?: string;
  header?: ReactNode;
  centerContent?: boolean;
  /** When false, renders only the inner layout (use inside AdminShell). Default true for login/guards. */
  asPageShell?: boolean;
  className?: string;
  contentClassName?: string;
} & Omit<PageShellProps, 'children' | 'header' | 'contentClassName' | 'className'>;

function AdminAuthShellContent({
  children,
  eyebrow,
  brandSubtitle,
  centerContent = true,
  className,
}: Pick<
  AdminAuthShellProps,
  'children' | 'eyebrow' | 'brandSubtitle' | 'centerContent' | 'className'
>) {
  const hasBrand = Boolean(eyebrow || brandSubtitle);

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-8',
        centerContent && 'mx-auto max-w-md items-center justify-center',
        !centerContent && 'mx-auto w-full max-w-md',
        className,
      )}
    >
      {hasBrand ? (
        <div className={cn('space-y-2', centerContent ? 'text-center' : 'text-left')}>
          {eyebrow ? <p className="type-eyebrow text-accent-foreground">{eyebrow}</p> : null}
          {brandSubtitle ? (
            <p className="text-body-sm text-muted-foreground">{brandSubtitle}</p>
          ) : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function AdminAuthShell({
  children,
  eyebrow,
  brandSubtitle,
  header,
  centerContent = true,
  asPageShell = true,
  contentClassName,
  className,
  ...props
}: AdminAuthShellProps) {
  if (!asPageShell) {
    return (
      <AdminAuthShellContent
        eyebrow={eyebrow}
        brandSubtitle={brandSubtitle}
        centerContent={centerContent}
        className={className}
      >
        {children}
      </AdminAuthShellContent>
    );
  }

  return (
    <PageShell
      className={cn('surface-grid-muted', className)}
      header={
        <>
          <AdminSkipLink />
          {header}
        </>
      }
      contentClassName={cn(
        centerContent && 'flex flex-1 flex-col items-center justify-center px-4 py-12 sm:py-16',
        contentClassName,
      )}
      {...props}
    >
      <div id="main-content" tabIndex={-1} className="outline-none">
        <AdminAuthShellContent
          eyebrow={eyebrow}
          brandSubtitle={brandSubtitle}
          centerContent={centerContent}
        >
          {children}
        </AdminAuthShellContent>
      </div>
    </PageShell>
  );
}
