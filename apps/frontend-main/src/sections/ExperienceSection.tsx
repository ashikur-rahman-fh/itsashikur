import { ExperienceCard, Reveal, Section } from '@ashikur-portfolio/shared/ui';

import { experience } from '../data/portfolio';

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      heading={{
        eyebrow: 'Experience',
        title: 'Work experience',
        description:
          'From embedded and production software at Nokia to full-stack product work and technical mentoring.',
      }}
    >
      <div className="relative space-y-8">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-border lg:block" aria-hidden />
        {experience.map((item, index) => (
          <Reveal key={`${item.company}-${item.period}`} delay={index * 80}>
            <div className="relative lg:pl-12">
              <span
                className="absolute left-[0.8125rem] top-7 hidden size-3 rounded-full border-2 border-info bg-card lg:block"
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
