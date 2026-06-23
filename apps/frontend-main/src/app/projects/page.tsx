import type { Metadata } from 'next';
import Link from 'next/link';

import { ProjectCard, Container, PageShell } from '@ashikur-portfolio/shared/ui';

import { JsonLd } from '../../components/JsonLd';
import { buildPageMetadata, shortMetaKeywords } from '../../config/site-metadata';
import { SiteHeader } from '../../components/SiteHeader';
import {
  projects,
  projectsPageDescription,
  projectsPageMetaDescription,
  projectsPageTitle,
} from '../../data/portfolio';
import { buildSiteBreadcrumbJsonLd } from '../../lib/json-ld';
import { SiteFooter } from '../../sections/SiteFooter';

export const metadata: Metadata = buildPageMetadata({
  path: '/projects',
  title: projectsPageTitle,
  description: projectsPageMetaDescription,
  absoluteTitle: true,
  keywords: shortMetaKeywords,
});

export default function ProjectsHubPage() {
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
          { name: 'Projects', path: '/projects' },
        ])}
      />
      <Container id="main-content" className="py-10 sm:py-14">
        <header className="mx-auto mb-10 max-w-3xl space-y-4 text-center">
          <p className="type-eyebrow text-accent-foreground">Work samples</p>
          <h1 className="font-display text-page-title font-bold text-foreground">Projects</h1>
          <p className="text-body leading-relaxed text-muted-foreground">
            {projectsPageDescription}
          </p>
          <p className="text-body-sm">
            <Link
              href="/"
              className="font-medium text-accent-foreground underline-offset-4 hover:underline"
            >
              Back to home
            </Link>
          </p>
        </header>
        <div className="layout-card-grid mx-auto max-w-5xl md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              category={project.category}
              description={project.description}
              problem={project.problem}
              constraints={project.constraints}
              approach={project.approach}
              engineeringChoices={project.engineeringChoices}
              validation={project.validation}
              techStack={project.techStack}
              result={project.result}
              githubUrl={project.githubUrl}
              demoUrl={project.demoUrl}
              detailsHref={`/projects/${project.slug}`}
            />
          ))}
        </div>
      </Container>
    </PageShell>
  );
}
