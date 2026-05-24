import { Reveal, Section, TechChip } from '@ashikur-portfolio/shared/ui';

import { profile } from '../data/portfolio';

export function AboutSection() {
  return (
    <Section
      id="about"
      variant="muted"
      heading={{
        eyebrow: 'About',
        title: 'What I bring to engineering teams',
        description:
          'Production experience, full-stack delivery, and a strong algorithms foundation for hard technical problems.',
      }}
    >
      <div className="space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <p className="text-body leading-relaxed text-muted-foreground">
              {profile.aboutParagraph}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <div className="portfolio-surface h-full p-5 sm:p-6">
              <h3 className="font-display text-card-title font-semibold text-foreground">
                At a glance
              </h3>
              <ul className="mt-4 space-y-3">
                {profile.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-body-sm leading-relaxed text-foreground/90"
                  >
                    <span className="mt-0.5 shrink-0 text-info" aria-hidden>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <Reveal delay={80}>
          <div>
            <h3 className="text-ui font-semibold text-foreground">Collaboration strengths</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.softSkills.map((skill) => (
                <TechChip key={skill} label={skill} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
