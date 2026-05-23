import * as React from 'react';

import { cn } from '../../utils/cn';
import { Button } from '../button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card';
import { TechChip } from '../tech-chip';

export type ProjectCardProps = {
  title: string;
  description: string;
  problem: string;
  approach: string;
  techStack: string[];
  result?: string;
  githubUrl?: string;
  demoUrl?: string;
  className?: string;
};

export function ProjectCard({
  title,
  description,
  problem,
  approach,
  techStack,
  result,
  githubUrl,
  demoUrl,
  className,
}: ProjectCardProps) {
  return (
    <Card className={cn('portfolio-card flex h-full flex-col', className)}>
      <CardHeader className="portfolio-card-header">
        <CardTitle className="font-display font-semibold">{title}</CardTitle>
        <CardDescription className="leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 text-body-sm">
        <div>
          <p className="font-semibold text-foreground">Problem</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">{problem}</p>
        </div>
        <div>
          <p className="font-semibold text-foreground">Approach</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">{approach}</p>
        </div>
        {result ? (
          <div>
            <p className="font-semibold text-success">Result</p>
            <p className="mt-1 leading-relaxed text-muted-foreground">{result}</p>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <TechChip key={tech} label={tech} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex min-h-9 flex-wrap gap-2 py-0">
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
    </Card>
  );
}
