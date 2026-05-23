import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ashikur-portfolio/shared/ui';
import type { ReactNode } from 'react';

import { cn } from './cn';

export type AdminFormCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
  headerAlign?: 'center' | 'left';
  titleClassName?: string;
  className?: string;
};

export function AdminFormCard({
  title,
  description,
  children,
  headerAlign = 'left',
  titleClassName,
  className,
}: AdminFormCardProps) {
  const centered = headerAlign === 'center';

  return (
    <Card className={cn('w-full max-w-md shadow-card', className)}>
      <CardHeader className={cn('space-y-2', centered && 'text-center')}>
        <CardTitle
          className={cn(centered && 'font-display text-page-title font-bold', titleClassName)}
        >
          {title}
        </CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
