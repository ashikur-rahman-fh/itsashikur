'use client';

import { PageShell } from '@ashikur-portfolio/shared/ui';

import { SiteHeader } from '../components/SiteHeader';
import {
  AboutSection,
  AchievementsSection,
  ContactSection,
  CpToProductionSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  SiteFooter,
  SkillsSection,
  TestimonialsSection,
} from '../sections';

export function HomePage() {
  return (
    <PageShell
      contentClassName="max-w-none px-0 py-0"
      header={<SiteHeader mode="home" />}
      footer={<SiteFooter />}
    >
      <div id="main-content">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <SkillsSection />
        <AchievementsSection />
        <CpToProductionSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </PageShell>
  );
}
