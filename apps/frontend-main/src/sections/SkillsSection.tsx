import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Reveal,
  Section,
  TechChip,
} from '@ashikur-portfolio/shared/ui';

import { skillGroups } from '../data/portfolio';

export function SkillsSection() {
  return (
    <Section
      id="skills"
      heading={{
        eyebrow: 'Skills',
        title: 'Grouped by domain',
        description: 'Clear skill areas instead of an overwhelming flat list.',
      }}
    >
      <div className="layout-card-grid-dense sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.name} delay={index * 50} fill>
            <Card className="portfolio-card flex h-full flex-col">
              <CardHeader className="portfolio-card-header">
                <CardTitle className="font-display font-semibold">
                  {group.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <TechChip key={skill} label={skill} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
