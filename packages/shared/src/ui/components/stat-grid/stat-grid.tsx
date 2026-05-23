'use client';

import * as React from 'react';

import { formatAnimatedStat, useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import { cn } from '../../utils/cn';

export type StatItemData = {
  value: string;
  label: string;
  highlight?: boolean;
  animate?: boolean;
};

export type StatGridProps = {
  items: StatItemData[];
  className?: string;
  columns?: 2 | 3 | 5;
};

function StatItemDisplay({ value, label, highlight, animate }: StatItemData) {
  const parsed = value.match(/([0-9]+)/);
  const numericEnd = parsed ? Number(parsed[1]) : 0;
  const animated = useAnimatedCounter({
    end: numericEnd,
    enabled: Boolean(animate && numericEnd > 0),
  });
  const display = animate && numericEnd > 0 ? formatAnimatedStat(value, animated) : value;

  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-card p-4 shadow-soft',
        highlight && 'border-success/30 bg-success/5',
      )}
    >
      <p
        className={cn(
          'font-display text-2xl font-bold tracking-tight sm:text-3xl',
          highlight ? 'text-success' : 'text-foreground',
        )}
        aria-live={animate ? 'polite' : undefined}
      >
        {display}
      </p>
      <p className="mt-1 text-sm leading-snug text-muted-foreground">{label}</p>
    </div>
  );
}

const columnClasses: Record<NonNullable<StatGridProps['columns']>, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
};

export function StatGrid({ items, className, columns = 5 }: StatGridProps) {
  return (
    <ul className={cn('grid gap-3 sm:gap-4', columnClasses[columns], className)}>
      {items.map((item) => (
        <li key={`${item.value}-${item.label}`}>
          <StatItemDisplay {...item} />
        </li>
      ))}
    </ul>
  );
}
