import { Reveal, Section } from '@ashikur-portfolio/shared/ui';

import { education } from '../data/portfolio';

export function EducationSection() {
  return (
    <Section
      id="education"
      heading={{
        eyebrow: 'Education',
        title: 'BSc Computer Science & Engineering',
        description:
          'Formal training in computer science, strengthened through competitive programming and mentoring.',
      }}
    >
      <div className="space-y-6">
        {education.map((item, index) => (
          <Reveal key={item.institution} delay={index * 80}>
            <div className="portfolio-surface grid gap-6 p-5 sm:grid-cols-[1fr_1fr] sm:p-6 lg:gap-8">
              <div className="space-y-2">
                <h3 className="font-display text-card-title font-semibold text-foreground">
                  {item.degree}
                </h3>
                <p className="text-body-sm font-medium text-muted-foreground">{item.institution}</p>
                <p className="text-body-sm text-muted-foreground">
                  {item.period}
                  {item.location ? ` · ${item.location}` : ''}
                </p>
                {item.focus ? (
                  <p className="pt-2 text-body-sm leading-relaxed text-foreground/90">
                    {item.focus}
                  </p>
                ) : null}
              </div>
              <ul className="space-y-3">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-body-sm leading-relaxed text-foreground/90"
                  >
                    <span className="mt-0.5 shrink-0 text-info" aria-hidden>
                      ✓
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
