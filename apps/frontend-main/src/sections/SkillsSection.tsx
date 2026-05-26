import Link from 'next/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Reveal,
  Section,
  TechChip,
} from '@ashikur-portfolio/shared/ui';

import { csFundamentalsGroup, profile, sectionCopy, skillGroups } from '../data/portfolio';

const gridGroups = skillGroups.filter((group) => !group.featured);

export function SkillsSection() {
  return (
    <Section
      id="skills"
      heading={{
        eyebrow: 'Skills',
        title: sectionCopy.skills.title,
        description: sectionCopy.skills.description,
      }}
    >
      <div className="space-y-8">
        <Reveal>
          <div className="portfolio-surface border-info/30 p-5 sm:p-6 lg:p-8">
            <h3 className="font-display text-card-title font-semibold text-foreground">
              {csFundamentalsGroup.name}
            </h3>
            <p className="mt-2 max-w-3xl text-body-sm leading-relaxed text-muted-foreground">
              {csFundamentalsGroup.blurb}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {csFundamentalsGroup.skills.map((skill) => (
                <TechChip key={skill} label={skill} />
              ))}
            </div>
            <p className="mt-4 text-body-sm text-muted-foreground">
              Contest background and ratings are in{' '}
              <Link
                href="#achievements"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                achievements
              </Link>{' '}
              and{' '}
              <Link
                href="#cp-engineering"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                how contest practice supports engineering
              </Link>
              .
            </p>
          </div>
        </Reveal>

        <Reveal delay={40}>
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
          {gridGroups.map((group, index) => (
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
