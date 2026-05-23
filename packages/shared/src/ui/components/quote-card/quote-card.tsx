import * as React from 'react';

import { cn } from '../../utils/cn';
import { Badge } from '../badge';
import { Card, CardContent, CardFooter, CardHeader } from '../card';

export type QuoteCardProps = {
  quote: string;
  name: string;
  role: string;
  theme?: string;
  className?: string;
};

export function QuoteCard({ quote, name, role, theme, className }: QuoteCardProps) {
  return (
    <Card className={cn('portfolio-card flex h-full flex-col', className)}>
      <CardHeader className="portfolio-card-header">
        <blockquote className="text-body-sm leading-relaxed text-foreground/90">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col pt-0">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-body-sm text-muted-foreground">{role}</p>
      </CardContent>
      {theme ? (
        <CardFooter className="mt-auto pt-0">
          <Badge variant="secondary">{theme}</Badge>
        </CardFooter>
      ) : null}
    </Card>
  );
}
