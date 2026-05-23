import { Reveal, Section } from '@ashikur-portfolio/shared/ui';

import { cpToProduction } from '../data/portfolio';

export function CpToProductionSection() {
  return (
    <Section
      id="cp-engineering"
      variant="dark"
      heading={{
        eyebrow: 'Signature',
        title: cpToProduction.title,
        description: cpToProduction.description,
        onDark: true,
      }}
    >
      <Reveal>
        <ul className="grid gap-4 sm:grid-cols-2">
          {cpToProduction.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-surface-dark-foreground/90"
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
