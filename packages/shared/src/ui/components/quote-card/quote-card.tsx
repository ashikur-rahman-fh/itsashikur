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
    <Card className={cn('card-hover-lift h-full shadow-soft', className)}>
      <CardHeader className="pb-2">
        <blockquote className="text-sm leading-relaxed text-foreground/90">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </CardContent>
      {theme ? (
        <CardFooter className="pt-0">
          <Badge variant="secondary" className="text-xs">
            {theme}
          </Badge>
        </CardFooter>
      ) : null}
    </Card>
  );
}
