import { AchievementCard, Reveal, Section } from '@ashikur-portfolio/shared/ui';

import { achievements } from '../data/portfolio';

export function AchievementsSection() {
  return (
    <Section
      id="achievements"
      variant="muted"
      heading={{
        eyebrow: 'Achievements',
        title: 'Competitive programming & contests',
        description:
          'Contest experience that reinforces algorithmic thinking, discipline, and performance under pressure.',
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
