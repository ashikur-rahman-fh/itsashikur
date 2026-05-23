import { Reveal, Section } from '@ashikur-portfolio/shared/ui';

import { cpToProduction } from '../data/portfolio';

export function CpToProductionSection() {
  return (
    <Section
      id="cp-engineering"
      variant="muted"
      heading={{
        eyebrow: 'Signature',
        title: cpToProduction.title,
        description: cpToProduction.description,
      }}
    >
      <Reveal>
        <ul className="layout-card-grid sm:grid-cols-2">
          {cpToProduction.bullets.map((bullet) => (
            <li
              key={bullet}
              className="portfolio-surface flex h-full gap-3 p-4 text-body-sm leading-relaxed text-card-foreground"
            >
              <span
                className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-info"
                aria-hidden
              >
                ✓
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
