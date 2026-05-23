'use client';

import { Button, Container, StatGrid } from '@ashikur-portfolio/shared/ui';

import { siteLinks } from '../config/site-links';
import { heroStats, profile } from '../data/portfolio';

export function HeroSection() {
  return (
    <section className="surface-grid-hero border-b border-border" data-testid="hero-section">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-center lg:gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="type-eyebrow text-accent-foreground">{profile.role}</p>
              <h1 className="font-display text-hero font-bold text-foreground">{profile.name}</h1>
            </div>
            <p className="max-w-xl text-lead font-medium text-foreground">{profile.headline}</p>
            <p className="max-w-xl text-body leading-relaxed text-muted-foreground">
              {profile.supportingParagraph}
            </p>
            <div className="grid w-full max-w-xl grid-cols-2 gap-3 sm:max-w-none sm:flex sm:flex-wrap">
              <Button size="lg" asChild className="col-span-2 min-h-11 px-5 sm:col-span-1">
                <a href="#projects">View Projects</a>
              </Button>
              <Button variant="outline" size="lg" asChild className="min-h-11 px-5">
                <a href={siteLinks.resumeUrl}>Resume</a>
              </Button>
              <Button variant="outline" size="lg" asChild className="min-h-11">
                <a href={siteLinks.githubUrl} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="min-h-11">
                <a href={siteLinks.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="min-h-11 px-5">
                <a href={siteLinks.codeforcesUrl} target="_blank" rel="noopener noreferrer">
                  Codeforces
                </a>
              </Button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none lg:pt-4">
            <StatGrid items={heroStats} columns={5} />
          </div>
        </div>
      </Container>
    </section>
  );
}
