import { QuoteCard, Reveal, Section } from '@ashikur-portfolio/shared/ui';

import { testimonials } from '../data/portfolio';

export function TestimonialsSection() {
  return (
    <Section
      id="testimonials"
      heading={{
        eyebrow: 'Recommendations',
        title: 'What colleagues highlight',
        description:
          'Draft placeholders reflecting professional themes — replace with verified quotes in portfolio data.',
      }}
    >
      <div className="layout-card-grid sm:grid-cols-2">
        {testimonials.map((item, index) => (
          <Reveal key={item.name + item.theme} delay={index * 50} fill>
            <QuoteCard {...item} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
