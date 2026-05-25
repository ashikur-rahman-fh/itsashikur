import Link from 'next/link';

import { Button, Container, PageShell } from '@ashikur-portfolio/shared/ui';

import type { LandingPageConfig } from '../config/landing-pages';
import { siteLinks } from '../config/site-links';
import { SiteFooter } from '../sections/SiteFooter';
import { SiteHeader } from './SiteHeader';

type SeoLandingLayoutProps = {
  page: LandingPageConfig;
};

const relatedLinks = [
  { label: 'Work experience', href: '/#experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
] as const;

export function SeoLandingLayout({ page }: SeoLandingLayoutProps) {
  return (
    <PageShell
      className="surface-grid-default"
      contentClassName="max-w-none px-0 py-0"
      header={<SiteHeader />}
      footer={<SiteFooter />}
    >
      <Container id="main-content" className="py-10 sm:py-14">
        <article className="mx-auto max-w-3xl space-y-10">
          <header className="space-y-4">
            <p className="type-eyebrow text-accent-foreground">Ashikur Rahman</p>
            <h1 className="font-display text-page-title font-bold text-foreground">{page.h1}</h1>
            <p className="text-body leading-relaxed text-muted-foreground">{page.intro}</p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/#contact">Contact</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={siteLinks.resumeUrl}>View resume</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/">Portfolio homepage</Link>
              </Button>
            </div>
          </header>

          {page.sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="font-display text-section-title font-bold text-foreground">
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-body leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <nav aria-label="Related pages" className="border-t border-border pt-8">
            <h2 className="font-display text-card-title font-semibold text-foreground">
              Explore more
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm font-medium text-accent-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </Container>
    </PageShell>
  );
}
