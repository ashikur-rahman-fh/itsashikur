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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.name} delay={index * 50}>
            <Card className="card-hover-lift h-full shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="font-display text-base">{group.name}</CardTitle>
              </CardHeader>
              <CardContent>
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
