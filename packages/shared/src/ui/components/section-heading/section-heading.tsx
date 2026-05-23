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
        <p className={cn('type-eyebrow mb-2', onDark ? 'text-info' : 'text-accent-foreground')}>
          {eyebrow}
        </p>
      ) : null}
      <TitleTag
        className={cn(
          'font-display text-section-title font-bold',
          onDark ? 'text-surface-technical-foreground' : 'text-foreground',
        )}
      >
        {title}
      </TitleTag>
      {description ? (
        <p
          className={cn(
            'mt-3 text-body leading-relaxed sm:text-lead',
            onDark ? 'text-surface-technical-foreground/80' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
