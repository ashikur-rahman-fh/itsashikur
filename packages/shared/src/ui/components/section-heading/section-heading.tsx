import * as React from 'react';

import { cn } from '../../utils/cn';

export type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  titleAs?: 'h2' | 'h3';
  onDark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  titleAs: TitleTag = 'h2',
  onDark = false,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {eyebrow ? (
        <p
          className={cn(
            'mb-2 text-sm font-semibold uppercase tracking-wider',
            onDark ? 'text-info' : 'text-accent-foreground',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <TitleTag
        className={cn(
          'font-display text-3xl font-bold tracking-tight sm:text-4xl',
          onDark ? 'text-surface-dark-foreground' : 'text-foreground',
        )}
      >
        {title}
      </TitleTag>
      {description ? (
        <p
          className={cn(
            'mt-3 text-base leading-relaxed sm:text-lg',
            onDark ? 'text-surface-dark-foreground/80' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
