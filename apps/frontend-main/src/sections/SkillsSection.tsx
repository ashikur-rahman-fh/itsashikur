import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Reveal,
  Section,
  TechChip,
} from '@ashikur-portfolio/shared/ui';

import { profile, skillGroups } from '../data/portfolio';

export function SkillsSection() {
  return (
    <Section
      id="skills"
      heading={{
        eyebrow: 'Skills',
        title: 'Technical skills',
        description:
          'Languages, frameworks, and practices used in professional work, with depth in production debugging and algorithms.',
      }}
    >
      <div className="space-y-8">
        <Reveal>
          <div className="portfolio-surface p-5 sm:p-6">
            <h3 className="text-ui font-semibold text-foreground">Primary stack</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.primaryStack.map((skill) => (
                <TechChip key={skill} label={skill} />
              ))}
            </div>
          </div>
        </Reveal>
        <div className="layout-card-grid-dense sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.name} delay={index * 50} fill>
              <Card className="portfolio-card flex h-full flex-col">
                <CardHeader className="portfolio-card-header space-y-2">
                  <CardTitle className="font-display font-semibold">{group.name}</CardTitle>
                  {group.blurb ? (
                    <p className="text-body-sm leading-relaxed text-muted-foreground">
                      {group.blurb}
                    </p>
                  ) : null}
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
      </div>
    </Section>
  );
}
