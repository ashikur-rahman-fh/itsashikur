import * as React from 'react';

import { cn } from '../../utils/cn';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';

export type AchievementCardProps = {
  title: string;
  subtitle?: string;
  highlight?: string;
  className?: string;
};

export function AchievementCard({ title, subtitle, highlight, className }: AchievementCardProps) {
  return (
    <Card className={cn('portfolio-card flex h-full flex-col', className)}>
      <CardHeader className="portfolio-card-header flex-1">
        {highlight ? (
          <p className="font-display text-2xl font-bold text-info">{highlight}</p>
        ) : null}
        <CardTitle className="font-display text-lg">{title}</CardTitle>
        {subtitle && !highlight ? <CardDescription>{subtitle}</CardDescription> : null}
      </CardHeader>
      {subtitle && highlight ? (
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </CardContent>
      ) : null}
    </Card>
  );
}
