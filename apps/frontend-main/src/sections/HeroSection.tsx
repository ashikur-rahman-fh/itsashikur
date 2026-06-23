'use client';

import Link from 'next/link';

import { Button, Container, StatGrid } from '@ashikur-portfolio/shared/ui';

import { mailtoHref, siteLinks } from '../config/site-links';
import { heroStats, profile } from '../data/portfolio';

export function HeroSection() {
  return (
    <section className="surface-grid-hero border-b border-border" data-testid="hero-section">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="type-eyebrow text-accent-foreground">{profile.currentRole}</p>
                <h1 className="font-display text-hero font-bold text-foreground">{profile.name}</h1>
                <p className="text-body-sm text-muted-foreground">{profile.headline}</p>
              </div>
              <p className="max-w-xl text-body leading-relaxed text-foreground">{profile.intro}</p>
              <p className="max-w-xl text-body leading-relaxed text-muted-foreground">
                {profile.supportingParagraph}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild className="min-h-11 px-5">
                  <Link href="/experience">View experience</Link>
                </Button>
                <Button size="lg" asChild className="min-h-11 px-5">
                  <Link href={siteLinks.resumeUrl}>View resume</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="min-h-11 px-5">
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild className="min-h-10">
                  <a href={mailtoHref}>Email</a>
                </Button>
                <Button variant="outline" size="sm" asChild className="min-h-10">
                  <a href={siteLinks.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="min-h-10">
                  <a href={siteLinks.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="min-h-10">
                  <a href={siteLinks.youtubeUrl} target="_blank" rel="noopener noreferrer">
                    YouTube
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="min-h-10">
                  <a href={siteLinks.codeforcesUrl} target="_blank" rel="noopener noreferrer">
                    Codeforces
                  </a>
                </Button>
              </div>
              <p className="text-body-sm text-muted-foreground">{profile.locationLine}</p>
            </div>
          </div>

          <div id="impact" className="scroll-mt-14 space-y-4 sm:scroll-mt-16 lg:sticky lg:top-24">
            <h2 className="font-display text-section-title font-bold text-foreground">
              By the numbers
            </h2>
            <StatGrid items={heroStats} columns={5} />
          </div>
        </div>
      </Container>
    </section>
  );
}
