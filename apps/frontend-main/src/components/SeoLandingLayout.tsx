import Link from 'next/link';

import { Button, Container, PageShell } from '@ashikur-portfolio/shared/ui';

import type { LandingPageConfig } from '../config/landing-pages';
import { siteLinks } from '../config/site-links';
import { getProjectBySlug } from '../data/portfolio';
import { buildSiteBreadcrumbJsonLd } from '../lib/json-ld';
import { JsonLd } from './JsonLd';
import { SiteFooter } from '../sections/SiteFooter';
import { SiteHeader } from './SiteHeader';

type SeoLandingLayoutProps = {
  page: LandingPageConfig;
};

const relatedLinks = [
  { label: 'Work experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
] as const;

export function SeoLandingLayout({ page }: SeoLandingLayoutProps) {
  const breadcrumbLabel = page.h1.charAt(0).toUpperCase() + page.h1.slice(1);

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
          { name: breadcrumbLabel, path: page.path },
        ])}
      />
      <Container id="main-content" className="py-10 sm:py-14">
        <article className="mx-auto max-w-3xl space-y-10">
          <header className="space-y-4">
            <p className="type-eyebrow text-accent-foreground">Ashikur Rahman</p>
            <h1 className="font-display text-page-title font-bold text-foreground">{page.h1}</h1>
            <p className="text-body leading-relaxed text-muted-foreground">{page.intro}</p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">Contact</Link>
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
                  key={paragraph.slice(0, 48)}
                  className="text-body leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          {page.relatedProjects && page.relatedProjects.length > 0 ? (
            <section className="space-y-4">
              <h2 className="font-display text-section-title font-bold text-foreground">
                Related projects
              </h2>
              <ul className="space-y-4">
                {page.relatedProjects.map((projectLink) => {
                  const project = getProjectBySlug(projectLink.slug);
                  if (!project) return null;
                  return (
                    <li key={projectLink.slug} className="portfolio-surface p-5 sm:p-6">
                      <h3 className="font-display text-card-title font-semibold text-foreground">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="underline-offset-4 hover:underline"
                        >
                          {project.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-body-sm leading-relaxed text-muted-foreground">
                        {projectLink.blurb}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          {page.faqs && page.faqs.length > 0 ? (
            <section className="space-y-4">
              <h2 className="font-display text-section-title font-bold text-foreground">
                Common questions
              </h2>
              <dl className="space-y-6">
                {page.faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="font-display text-card-title font-semibold text-foreground">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-body leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

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
