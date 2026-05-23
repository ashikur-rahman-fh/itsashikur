import * as React from 'react';

import { cn } from '../../utils/cn';

export type PageShellProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  contentClassName?: string;
  footerClassName?: string;
};

export function PageShell({
  children,
  header,
  footer,
  className,
  contentClassName,
  footerClassName,
  ...props
}: PageShellProps) {
  const hasSurfaceGrid = className?.includes('surface-grid-');

  return (
    <div
      className={cn('flex min-h-screen flex-col', !hasSurfaceGrid && 'bg-background', className)}
      {...props}
    >
      {header}
      <main
        className={cn(
          'mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:py-10',
          contentClassName,
        )}
      >
        {children}
      </main>
      {footer ? (
        <footer
          className={cn('mt-auto border-t border-border bg-background/80 py-6', footerClassName)}
        >
          {footer}
        </footer>
      ) : null}
    </div>
  );
}
