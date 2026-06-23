import type { Metadata } from 'next';

import { PageShell } from '@ashikur-portfolio/shared/ui';

import { JsonLd } from '../../components/JsonLd';
import { SiteHeader } from '../../components/SiteHeader';
import { experienceMetadata } from '../../config/site-metadata';
import { buildSiteBreadcrumbJsonLd } from '../../lib/json-ld';
import { AchievementsSection, ExperienceSection, SiteFooter } from '../../sections';

export const metadata: Metadata = experienceMetadata;

export default function ExperiencePage() {
  return (
    <PageShell
      className="surface-grid-default"
      contentClassName="max-w-none px-0 py-0"
      header={<SiteHeader />}
      footer={<SiteFooter />}
    >
      <JsonLd
        data={buildSiteBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Experience', path: '/experience' },
        ])}
      />
      <div id="main-content">
        <ExperienceSection />
        <AchievementsSection />
      </div>
    </PageShell>
  );
}
