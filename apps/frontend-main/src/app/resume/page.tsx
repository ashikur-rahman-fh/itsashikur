import type { Metadata } from 'next';
import Link from 'next/link';

import { Container, PageShell } from '@ashikur-portfolio/shared/ui';

import { JsonLd } from '../../components/JsonLd';
import { resumeMetadata } from '../../config/site-metadata';
import { SiteHeader } from '../../components/SiteHeader';
import { SiteFooter } from '../../sections/SiteFooter';
import { profile } from '../../data/portfolio';
import { buildResumeBreadcrumbJsonLd } from '../../lib/json-ld';
import { ResumePdfActions } from './ResumePdfActions';
import { ResumePdfViewer } from './ResumePdfViewer';

export const metadata: Metadata = resumeMetadata;

export default function ResumePage() {
  return (
    <PageShell
      className="surface-grid-default"
      contentClassName="max-w-none px-0 py-0"
      header={<SiteHeader />}
      footer={<SiteFooter />}
    >
      <JsonLd data={buildResumeBreadcrumbJsonLd()} />
      <Container id="main-content" className="py-10 sm:py-14">
        <header className="mx-auto mb-8 grid max-w-5xl gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="space-y-3">
            <p className="type-eyebrow text-accent-foreground">Resume</p>
            <h1 className="font-display text-page-title font-bold text-foreground">
              {profile.name}
            </h1>
            <p className="max-w-2xl text-body-sm text-muted-foreground">
              Preview the latest PDF resume below, or download a copy. For projects, skills, and
              contact details, return{' '}
              <Link
                href="/"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                home
              </Link>
              .
            </p>
            <p className="flex flex-wrap gap-x-4 gap-y-2 text-body-sm">
              <Link
                href="/projects"
                className="font-medium text-accent-foreground underline-offset-4 hover:underline"
              >
                View projects
              </Link>
              <Link
                href="/contact"
                className="font-medium text-accent-foreground underline-offset-4 hover:underline"
              >
                Contact
              </Link>
            </p>
          </div>
          <ResumePdfActions />
        </header>

        <div className="mx-auto max-w-5xl">
          <ResumePdfViewer />
        </div>
      </Container>
    </PageShell>
  );
}
