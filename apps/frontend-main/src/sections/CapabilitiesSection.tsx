import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Reveal,
  Section,
} from '@ashikur-portfolio/shared/ui';

import { capabilities, sectionCopy } from '../data/portfolio';

export function CapabilitiesSection() {
  return (
    <Section
      id="capabilities"
      heading={{
        eyebrow: 'Capabilities',
        title: sectionCopy.capabilities.title,
        description: sectionCopy.capabilities.description,
      }}
    >
      <div className="layout-card-grid sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((item, index) => (
          <Reveal key={item.title} delay={index * 50} fill>
            <Card className="portfolio-card flex h-full flex-col">
              <CardHeader className="portfolio-card-header space-y-2">
                <CardTitle className="font-display text-card-title font-semibold">
                  {item.title}
                </CardTitle>
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
