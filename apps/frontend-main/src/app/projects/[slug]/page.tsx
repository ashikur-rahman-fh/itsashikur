import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge, Button, Container, PageShell, TechChip } from '@ashikur-portfolio/shared/ui';

import { JsonLd } from '../../../components/JsonLd';
import { buildPageMetadata, shortMetaKeywords } from '../../../config/site-metadata';
import { SiteHeader } from '../../../components/SiteHeader';
import { getProjectBySlug, projectSlugs, type PortfolioProject } from '../../../data/portfolio';
import { buildProjectPageJsonLd } from '../../../lib/json-ld';
import { SiteFooter } from '../../../sections/SiteFooter';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildPageMetadata({
    path: `/projects/${project.slug}`,
    title: project.seoTitle,
    description: project.seoDescription,
    keywords: shortMetaKeywords,
  });
}

function ProjectDetail({ project }: { project: PortfolioProject }) {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-4">
        <Badge variant="secondary" className="w-fit">
          {project.category}
        </Badge>
        <h1 className="font-display text-page-title font-bold text-foreground">{project.title}</h1>
        <p className="text-body leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <TechChip key={tech} label={tech} />
          ))}
        </div>
      </header>

      <section className="space-y-2">
        <h2 className="font-display text-section-title font-bold text-foreground">Problem</h2>
        <p className="text-body leading-relaxed text-muted-foreground">{project.problem}</p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-section-title font-bold text-foreground">Tech stack</h2>
        <p className="text-body leading-relaxed text-muted-foreground">
          {project.techStack.join(', ')}
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-section-title font-bold text-foreground">
          Approach &amp; architecture
        </h2>
        <p className="text-body leading-relaxed text-muted-foreground">{project.approach}</p>
        <p className="text-body leading-relaxed text-muted-foreground">
          {project.engineeringChoices}
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-section-title font-bold text-foreground">
          Features &amp; validation
        </h2>
        <p className="text-body leading-relaxed text-muted-foreground">{project.constraints}</p>
        <p className="text-body leading-relaxed text-muted-foreground">{project.validation}</p>
        {project.result ? (
          <p className="text-body leading-relaxed text-success">{project.result}</p>
        ) : null}
      </section>

      {(project.githubUrl || project.demoUrl) && (
        <div className="flex flex-wrap gap-3">
          {project.githubUrl ? (
            <Button variant="outline" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          ) : null}
          {project.demoUrl ? (
            <Button variant="ghost" asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                Live demo
              </a>
            </Button>
          ) : null}
        </div>
      )}

      <nav className="flex flex-wrap gap-4 border-t border-border pt-8 text-body-sm">
        <Link
          href="/projects"
          className="font-medium text-accent-foreground underline-offset-4 hover:underline"
        >
          All projects
        </Link>
        <Link
          href="/#featured-projects"
          className="font-medium text-accent-foreground underline-offset-4 hover:underline"
        >
          Featured projects on homepage
        </Link>
        <Link
          href="/contact"
          className="font-medium text-accent-foreground underline-offset-4 hover:underline"
        >
          Contact
        </Link>
      </nav>
    </article>
  );
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <PageShell
      className="surface-grid-default"
      contentClassName="max-w-none px-0 py-0"
      header={<SiteHeader />}
      footer={<SiteFooter />}
    >
      <JsonLd data={buildProjectPageJsonLd(project)} />
      <Container id="main-content" className="py-10 sm:py-14">
        <ProjectDetail project={project} />
      </Container>
    </PageShell>
  );
}
