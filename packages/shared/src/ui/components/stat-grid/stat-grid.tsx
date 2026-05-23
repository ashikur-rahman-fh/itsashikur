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
        'flex h-full min-h-[5.5rem] flex-col items-center justify-between rounded-lg border border-border bg-card px-4 py-4 text-center shadow-soft sm:py-5',
        highlight && 'border-success/30 bg-success/5',
      )}
    >
      <p
        className={cn(
          'shrink-0 font-display text-2xl font-bold leading-none tabular-nums tracking-tight sm:text-3xl',
          highlight ? 'text-success' : 'text-foreground',
        )}
        aria-live={animate ? 'polite' : undefined}
      >
        {display}
      </p>
      <p className="mt-2 text-balance text-xs leading-snug text-muted-foreground sm:text-sm">
        {label}
      </p>
    </div>
  );
}

function StatGridList({
  items,
  className,
  itemClassName,
}: {
  items: StatItemData[];
  className?: string;
  itemClassName?: string;
}) {
  return (
    <ul className={cn('grid items-stretch gap-3 sm:gap-4', className)}>
      {items.map((item) => (
        <li key={`${item.value}-${item.label}`} className={cn('h-full', itemClassName)}>
          <StatItemDisplay {...item} />
        </li>
      ))}
    </ul>
  );
}

const columnClasses: Record<Exclude<NonNullable<StatGridProps['columns']>, 5>, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
};

function StatGridFive({ items, className }: { items: StatItemData[]; className?: string }) {
  const topRow = items.slice(0, 3);
  const bottomRow = items.slice(3);

  return (
    <div className={cn('flex w-full flex-col gap-3 sm:gap-4', className)} data-stat-layout="3-2">
      <ul className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 sm:gap-4">
        {topRow.map((item, index) => (
          <li
            key={`${item.value}-${item.label}`}
            className={cn(
              'h-full',
              index === 2 &&
                'col-span-2 flex justify-center sm:col-span-1 sm:block [&>div]:w-[calc((100%-0.75rem)/2)] sm:[&>div]:w-full',
            )}
          >
            <StatItemDisplay {...item} />
          </li>
        ))}
      </ul>
      <StatGridList
        items={bottomRow}
        className="mx-auto grid w-full grid-cols-2 sm:w-2/3"
      />
    </div>
  );
}

export function StatGrid({ items, className, columns = 5 }: StatGridProps) {
  if (columns === 5) {
    return <StatGridFive items={items} className={className} />;
  }

  return (
    <StatGridList items={items} className={columnClasses[columns]} />
  );
}
