import { ExperienceCard, Reveal, Section } from '@ashikur-portfolio/shared/ui';

import { experience } from '../data/portfolio';

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      heading={{
        eyebrow: 'Experience',
        title: 'Impact-first engineering',
        description:
          'Roles focused on measurable outcomes — observability, developer productivity, and reliable production systems.',
      }}
    >
      <div className="relative space-y-8">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-border lg:block" aria-hidden />
        {experience.map((item, index) => (
          <Reveal key={item.company} delay={index * 80}>
            <div className="relative lg:pl-12">
              <span
                className="absolute left-2.5 top-8 hidden h-3 w-3 rounded-full border-2 border-info bg-background lg:block"
                aria-hidden
              />
              <ExperienceCard {...item} />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
