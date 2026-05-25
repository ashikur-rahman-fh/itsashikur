import type { Metadata } from 'next';
import Link from 'next/link';

import { Button, Container, PageShell } from '@ashikur-portfolio/shared/ui';

import { buildPageMetadata, shortMetaKeywords } from '../../config/site-metadata';
import { mailtoHref, siteLinks } from '../../config/site-links';
import { SiteHeader } from '../../components/SiteHeader';
import {
  contactSectionDescription,
  contactSectionMetaDescription,
  profile,
} from '../../data/portfolio';
import { SiteFooter } from '../../sections/SiteFooter';
import { ContactForm } from '../../sections/contact';

export const metadata: Metadata = buildPageMetadata({
  path: '/contact',
  title: 'Contact | Ashikur Rahman — Software Engineer in Ottawa, Canada',
  description: contactSectionMetaDescription,
  keywords: shortMetaKeywords,
});

export default function ContactPage() {
  return (
    <PageShell
      className="surface-grid-default"
      contentClassName="max-w-none px-0 py-0"
      header={<SiteHeader />}
      footer={<SiteFooter />}
    >
      <Container id="main-content" className="py-10 sm:py-14">
        <header className="mx-auto mb-8 max-w-2xl space-y-3 text-center">
          <p className="type-eyebrow text-accent-foreground">Contact</p>
          <h1 className="font-display text-page-title font-bold text-foreground">Get in touch</h1>
          <p className="text-body leading-relaxed text-muted-foreground">
            {contactSectionDescription}
          </p>
        </header>
        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="portfolio-surface p-6 sm:p-8">
            <ContactForm />
          </div>
          <div className="portfolio-surface flex flex-col justify-between gap-6 p-6 sm:p-8">
            <div className="space-y-4">
              <h2 className="text-card-title font-semibold text-foreground">
                Other ways to connect
              </h2>
              <p className="text-body-sm text-muted-foreground">
                Prefer email or a professional profile? Reach out directly for software development
                roles in Canada.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button size="lg" asChild>
                  <a href={mailtoHref}>Email me directly</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={siteLinks.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={siteLinks.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Button>
              </div>
            </div>
            <p className="border-t border-border pt-6 text-body-sm text-muted-foreground">
              {profile.locationLine}
            </p>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-body-sm">
          <Link
            href="/"
            className="font-medium text-accent-foreground underline-offset-4 hover:underline"
          >
            Return to portfolio homepage
          </Link>
        </p>
      </Container>
    </PageShell>
  );
}
