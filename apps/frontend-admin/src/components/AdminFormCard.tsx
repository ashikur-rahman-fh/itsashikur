import { Card, CardContent, CardDescription, CardHeader } from '@ashikur-portfolio/shared/ui';
import type { ReactNode } from 'react';

import { cn } from './cn';

export type AdminFormCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
  headerAlign?: 'center' | 'left';
  titleLevel?: 'h1' | 'h2' | 'h3';
  titleClassName?: string;
  className?: string;
};

export function AdminFormCard({
  title,
  description,
  children,
  headerAlign = 'left',
  titleLevel = 'h3',
  titleClassName,
  className,
}: AdminFormCardProps) {
  const centered = headerAlign === 'center';
  const Title = titleLevel;

  return (
    <Card className={cn('w-full max-w-md shadow-card', className)}>
      <CardHeader className={cn('space-y-2', centered && 'text-center')}>
        <Title
          className={cn(
            'text-card-title font-semibold text-foreground',
            centered && 'font-display text-page-title font-bold',
            titleClassName,
          )}
        >
          {title}
        </Title>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
