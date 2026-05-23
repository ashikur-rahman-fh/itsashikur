import * as React from 'react';

import { cn } from '../../utils/cn';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';
import { TechChip } from '../tech-chip';

export type ExperienceCardProps = {
  role: string;
  company: string;
  period: string;
  location?: string;
  summary?: string;
  impacts: string[];
  techStack: string[];
  featured?: boolean;
  className?: string;
};

export function ExperienceCard({
  role,
  company,
  period,
  location,
  summary,
  impacts,
  techStack,
  featured = false,
  className,
}: ExperienceCardProps) {
  return (
    <Card
      className={cn(
        'card-hover-lift shadow-soft',
        featured && 'border-info/40 ring-1 ring-info/20',
        className,
      )}
    >
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="font-display text-xl">{role}</CardTitle>
            <CardDescription className="text-base font-medium text-foreground/90">
              {company}
            </CardDescription>
          </div>
          {featured ? (
            <span className="rounded-md bg-info/15 px-2 py-1 text-xs font-semibold text-info">
              Current
            </span>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground">
          {period}
          {location ? ` · ${location}` : ''}
        </p>
        {summary ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/90">
          {impacts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <TechChip key={tech} label={tech} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
