import { Inbox } from 'lucide-react';
import * as React from 'react';

import { cn } from '../../utils/cn';

export type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'error';
};

export function EmptyState({
  title,
  description,
  action,
  className,
  variant = 'default',
}: EmptyStateProps) {
  const isError = variant === 'error';

  return (
    <div
      role="status"
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-10 text-center shadow-card',
        isError ? 'border-destructive/30 bg-destructive/[0.03]' : 'border-border bg-card',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-md',
          isError ? 'bg-destructive/10' : 'bg-muted',
        )}
      >
        <Inbox
          className={cn('h-6 w-6', isError ? 'text-destructive/80' : 'text-muted-foreground')}
          aria-hidden
        />
      </div>
      <div className="max-w-sm space-y-1">
        <h2 className="text-card-title font-semibold text-foreground">{title}</h2>
        {description ? <p className="text-body-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
