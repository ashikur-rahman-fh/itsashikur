import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Reveal,
  Section,
} from '@ashikur-portfolio/shared/ui';

import { workingPrinciples } from '../data/portfolio';

export function TestimonialsSection() {
  return (
    <Section
      id="working-style"
      heading={{
        eyebrow: 'Working style',
        title: 'How I work with teams',
        description:
          'Habits that support reliable delivery, clear communication, and maintainable code on shared codebases.',
      }}
    >
      <div className="layout-card-grid sm:grid-cols-2">
        {workingPrinciples.map((item, index) => (
          <Reveal key={item.title} delay={index * 50} fill>
            <Card className="portfolio-card flex h-full flex-col">
              <CardHeader className="portfolio-card-header space-y-3">
                <Badge variant="secondary" className="w-fit">
                  {item.theme}
                </Badge>
                <CardTitle className="font-display font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-body-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
