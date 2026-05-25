import * as React from 'react';

import { cn } from '../../utils/cn';
import { Badge } from '../badge';
import { Button } from '../button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card';
import { TechChip } from '../tech-chip';

export type ProjectCardProps = {
  title: string;
  category?: string;
  description: string;
  problem: string;
  constraints?: string;
  approach: string;
  engineeringChoices?: string;
  validation?: string;
  techStack: string[];
  result?: string;
  githubUrl?: string;
  demoUrl?: string;
  detailsHref?: string;
  className?: string;
};

type DetailBlockProps = {
  label: string;
  value: string;
  valueClassName?: string;
};

function DetailBlock({ label, value, valueClassName }: DetailBlockProps) {
  return (
    <div>
      <p className="font-semibold text-foreground">{label}</p>
      <p className={cn('mt-1 leading-relaxed text-muted-foreground', valueClassName)}>{value}</p>
    </div>
  );
}

export function ProjectCard({
  title,
  category,
  description,
  problem,
  constraints,
  approach,
  engineeringChoices,
  validation,
  techStack,
  result,
  githubUrl,
  demoUrl,
  detailsHref,
  className,
}: ProjectCardProps) {
  const hasActions = Boolean(githubUrl || demoUrl || detailsHref);

  return (
    <Card className={cn('portfolio-card flex h-full flex-col', className)}>
      <CardHeader className="portfolio-card-header space-y-2">
        {category ? (
          <Badge variant="secondary" className="w-fit">
            {category}
          </Badge>
        ) : null}
        <CardTitle className="font-display font-semibold">{title}</CardTitle>
        <CardDescription className="leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 text-body-sm">
        <DetailBlock label="Problem" value={problem} />
        {constraints ? <DetailBlock label="Constraints" value={constraints} /> : null}
        <DetailBlock label="Approach" value={approach} />
        {engineeringChoices ? (
          <DetailBlock label="Engineering choices" value={engineeringChoices} />
        ) : null}
        {validation ? <DetailBlock label="Validation" value={validation} /> : null}
        {result ? (
          <DetailBlock label="Result" value={result} valueClassName="text-success" />
        ) : null}
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <TechChip key={tech} label={tech} />
          ))}
        </div>
      </CardContent>
      {hasActions ? (
        <CardFooter className="mt-auto flex flex-wrap gap-2">
          {detailsHref ? (
            <Button variant="default" size="sm" asChild>
              <a href={detailsHref}>View details</a>
            </Button>
          ) : null}
          {githubUrl ? (
            <Button variant="outline" size="sm" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          ) : null}
          {demoUrl ? (
            <Button variant="ghost" size="sm" asChild>
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                Demo
              </a>
            </Button>
          ) : null}
        </CardFooter>
      ) : null}
    </Card>
  );
}
