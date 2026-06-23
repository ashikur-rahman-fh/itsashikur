'use client';

import { PageShell } from '@ashikur-portfolio/shared/ui';

import { SiteHeader } from '../components/SiteHeader';
import {
  CapabilitiesSection,
  CpToProductionSection,
  HeroSection,
  PortfolioExploreSection,
  ProjectsSection,
  RecommendationsSection,
  SiteFooter,
  SkillsSection,
  TestimonialsSection,
} from '../sections';

export function HomePage() {
  return (
    <PageShell
      contentClassName="max-w-none px-0 py-0"
      header={<SiteHeader />}
      footer={<SiteFooter />}
    >
      <div id="main-content">
        <HeroSection />
        <PortfolioExploreSection />
        <ProjectsSection />
        <RecommendationsSection />
        <SkillsSection />
        <CapabilitiesSection />
        <CpToProductionSection />
        <TestimonialsSection />
      </div>
    </PageShell>
  );
}
