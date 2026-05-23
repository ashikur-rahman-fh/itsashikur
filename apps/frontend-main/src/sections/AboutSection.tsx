import { Reveal, Section, TechChip } from '@ashikur-portfolio/shared/ui';

import { profile } from '../data/portfolio';

export function AboutSection() {
  return (
    <Section
      id="about"
      variant="muted"
      heading={{
        eyebrow: 'About',
        title: 'Engineering with clarity and ownership',
        description:
          'Software developer at Nokia with a strong foundation in C++, Python, full-stack tools, and production debugging — plus a competitive programming background that sharpens how I approach hard problems.',
      }}
    >
      <Reveal>
        <div className="flex flex-wrap gap-2">
          {profile.softSkills.map((skill) => (
            <TechChip key={skill} label={skill} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
