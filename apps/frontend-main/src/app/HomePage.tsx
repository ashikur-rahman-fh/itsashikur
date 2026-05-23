'use client';

import { Button, Navbar, PageShell } from '@ashikur-portfolio/shared/ui';

import { siteLinks } from '../config/site-links';
import { navItems } from '../data/portfolio';
import {
  AboutSection,
  AchievementsSection,
  ContactSection,
  CpToProductionSection,
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
      header={
        <>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to main content
          </a>
          <Navbar
            appName="Ashikur Rahman"
            variant="glass"
            items={navItems.map((item) => ({ ...item, active: false }))}
            mobileItems={[
              ...navItems.map((item) => ({ ...item, active: false })),
              { label: 'Resume', href: siteLinks.resumeUrl },
            ]}
            actions={
              <Button
                variant="default"
                size="sm"
                asChild
                className="hidden sm:inline-flex bg-primary text-primary-foreground shadow-soft hover:bg-primary/90"
              >
                <a
                  href={siteLinks.resumeUrl}
                  className="text-primary-foreground no-underline visited:text-primary-foreground"
                >
                  Resume
                </a>
              </Button>
            }
          />
        </>
      }
      footer={<SiteFooter />}
    >
      <div id="main-content">
        <HeroSection />
        <CpToProductionSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <AchievementsSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </PageShell>
  );
}
