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
    <Card className={cn('card-hover-lift shadow-soft', className)}>
      <CardHeader className="pb-2">
        {highlight ? (
          <p className="font-display text-2xl font-bold text-info">{highlight}</p>
        ) : null}
        <CardTitle className={cn('font-display text-lg', highlight && 'text-base')}>
          {title}
        </CardTitle>
        {subtitle ? <CardDescription>{subtitle}</CardDescription> : null}
      </CardHeader>
      {highlight && !subtitle ? null : (
        <CardContent className="pt-0">
          {subtitle && highlight ? (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </CardContent>
      )}
    </Card>
  );
}
