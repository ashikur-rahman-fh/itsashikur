'use client';

import { useId, useState } from 'react';

import { Card, CardContent, CardHeader } from '@ashikur-portfolio/shared/ui';

import type { Recommendation } from '../data/recommendations';

type RecommendationCardProps = Pick<
  Recommendation,
  'name' | 'role' | 'relationship' | 'date' | 'quote' | 'fullQuote'
>;

export function RecommendationCard({
  name,
  role,
  relationship,
  date,
  quote,
  fullQuote,
}: RecommendationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const quoteId = useId();
  const hasFullQuote = Boolean(fullQuote && fullQuote !== quote);
  const displayQuote = expanded && fullQuote ? fullQuote : quote;

  return (
    <Card className="portfolio-card flex h-full flex-col">
      <CardHeader className="portfolio-card-header space-y-3">
        <blockquote id={quoteId} className="text-body-sm leading-relaxed text-foreground/90">
          &ldquo;{displayQuote}&rdquo;
        </blockquote>
        {hasFullQuote ? (
          <button
            type="button"
            className="text-left text-ui font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            aria-expanded={expanded}
            aria-controls={quoteId}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? 'Show less' : 'Read full recommendation'}
          </button>
        ) : null}
      </CardHeader>
      <CardContent className="mt-auto flex flex-col gap-1 pt-0">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-body-sm text-muted-foreground">{role}</p>
        <p className="text-body-sm text-muted-foreground/80">
          {relationship}
          {date ? ` · ${date}` : ''}
        </p>
      </CardContent>
    </Card>
  );
}
