import { AchievementCard, Reveal, Section } from '@ashikur-portfolio/shared/ui';

import { achievements } from '../data/portfolio';

export function AchievementsSection() {
  return (
    <Section
      id="achievements"
      variant="muted"
      heading={{
        eyebrow: 'Achievements',
        title: 'Contest & fundamentals track record',
        description:
          'Competitive programming results that support data structures, algorithms, and interview-ready problem-solving alongside production engineering.',
      }}
    >
      <div className="layout-card-grid-dense sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((item, index) => (
          <Reveal key={item.title} delay={index * 40} fill>
            <AchievementCard {...item} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
