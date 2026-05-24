import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge, Button, Container, PageShell, TechChip } from '@ashikur-portfolio/shared/ui';

import { mailtoHref, siteLinks } from '../../config/site-links';
import {
  achievements,
  algorithmMetrics,
  education,
  experience,
  impactIntro,
  productionMetrics,
  profile,
  projects,
  skillGroups,
} from '../../data/portfolio';
import { PrintResumeButton } from './PrintResumeButton';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume for Ashikur Rahman — Software Engineer with experience in embedded systems, backend and frontend development, production debugging, and algorithms.',
};

export default function ResumePage() {
  const featuredAchievements = achievements.slice(0, 4);

  return (
    <PageShell className="surface-grid-default" contentClassName="max-w-none px-0 py-0">
      <Container className="py-10 sm:py-14">
        <article className="resume-document portfolio-surface mx-auto max-w-5xl p-6 hover:translate-y-0 sm:p-8 lg:p-10">
          <header className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="space-y-4">
              <div>
                <p className="type-eyebrow text-accent-foreground">{profile.currentRole}</p>
                <h1 className="mt-2 font-display text-page-title font-bold text-foreground">
                  {profile.name}
                </h1>
              </div>
              <p className="max-w-3xl text-lead font-medium text-foreground">{profile.headline}</p>
              <p className="max-w-3xl text-body-sm leading-relaxed text-muted-foreground">
                {profile.supportingParagraph}
              </p>
              <p className="text-body-sm text-muted-foreground">{profile.locationLine}</p>
            </div>
            <div className="resume-actions flex flex-wrap gap-3 lg:justify-end">
              {siteLinks.resumeDownloadUrl ? (
                <Button size="lg" asChild>
                  <a href={siteLinks.resumeDownloadUrl} download>
                    Download PDF
                  </a>
                </Button>
              ) : (
                <PrintResumeButton />
              )}
              <Button variant="outline" size="lg" asChild>
                <a href={mailtoHref}>Contact</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/">Portfolio</Link>
              </Button>
            </div>
          </header>

          <section className="space-y-6 border-b border-border py-8">
            <div>
              <h2 className="font-display text-card-title font-semibold text-foreground">Impact</h2>
              <p className="mt-2 text-body-sm text-muted-foreground">
                Production outcomes and algorithms background.
              </p>
            </div>
            <div>
              <h3 className="text-ui font-semibold text-foreground">Production outcomes</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {productionMetrics.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-border bg-background p-4"
                  >
                    <p className="font-mono text-stat font-semibold text-foreground">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-body-sm leading-snug text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-body-sm text-muted-foreground">{impactIntro.footnote}</p>
            </div>
            <div>
              <h3 className="text-ui font-semibold text-foreground">Algorithms and contests</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {algorithmMetrics.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-border bg-background p-4"
                  >
                    <p className="font-mono text-stat font-semibold text-foreground">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-body-sm leading-snug text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 border-b border-border py-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-card-title font-semibold text-foreground">
                Experience
              </h2>
              <p className="mt-2 text-body-sm text-muted-foreground">
                Embedded and production software, full-stack delivery, and technical mentoring.
              </p>
            </div>
            <div className="space-y-6">
              {experience.map((item) => (
                <div key={`${item.company}-${item.period}`} className="space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-card-title font-semibold text-foreground">
                        {item.role}
                      </h3>
                      <p className="text-body-sm text-muted-foreground">
                        {item.company} · {item.period}
                        {item.location ? ` · ${item.location}` : ''}
                      </p>
                    </div>
                    {item.featured ? <Badge variant="info">Current</Badge> : null}
                  </div>
                  {item.summary ? (
                    <p className="text-body-sm leading-relaxed text-muted-foreground">
                      {item.summary}
                    </p>
                  ) : null}
                  {item.highlight ? (
                    <p className="text-body-sm font-medium text-foreground">{item.highlight}</p>
                  ) : null}
                  <ul className="list-disc space-y-2 pl-5 text-body-sm leading-relaxed text-foreground/90">
                    {item.impacts.map((impact) => (
                      <li key={impact}>{impact}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {item.techStack.map((tech) => (
                      <TechChip key={tech} label={tech} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 border-b border-border py-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-card-title font-semibold text-foreground">
                Education
              </h2>
              <p className="mt-2 text-body-sm text-muted-foreground">
                Computer science degree with competitive programming involvement.
              </p>
            </div>
            <div className="space-y-4">
              {education.map((item) => (
                <div key={item.institution} className="space-y-2">
                  <h3 className="font-display text-card-title font-semibold text-foreground">
                    {item.degree}
                  </h3>
                  <p className="text-body-sm text-muted-foreground">
                    {item.institution} · {item.period}
                    {item.location ? ` · ${item.location}` : ''}
                  </p>
                  {item.focus ? (
                    <p className="text-body-sm leading-relaxed text-foreground/90">{item.focus}</p>
                  ) : null}
                  <ul className="list-disc space-y-2 pl-5 text-body-sm leading-relaxed text-foreground/90">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 border-b border-border py-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-card-title font-semibold text-foreground">
                Selected Projects
              </h2>
              <p className="mt-2 text-body-sm text-muted-foreground">
                Sample projects across ML, databases, full-stack apps, and embedded work.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <h3 className="font-display text-card-title font-semibold text-foreground">
                    {project.title}
                  </h3>
                  {project.category ? (
                    <p className="mt-1 text-body-sm text-info">{project.category}</p>
                  ) : null}
                  <p className="mt-2 text-body-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  {project.result ? (
                    <p className="mt-3 text-body-sm leading-relaxed text-success">
                      {project.result}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 py-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-card-title font-semibold text-foreground">
                Skills & Achievements
              </h2>
              <p className="mt-2 text-body-sm text-muted-foreground">
                Tools I use regularly, plus contest highlights in algorithms.
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                {skillGroups.map((group) => (
                  <div key={group.name}>
                    <h3 className="text-ui font-semibold text-foreground">{group.name}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <TechChip key={skill} label={skill} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {featuredAchievements.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-border bg-background p-4"
                  >
                    {item.highlight ? (
                      <p className="font-mono text-card-title font-semibold text-info">
                        {item.highlight}
                      </p>
                    ) : null}
                    <p className="font-semibold text-foreground">{item.title}</p>
                    {item.subtitle ? (
                      <p className="mt-1 text-body-sm text-muted-foreground">{item.subtitle}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </article>
        <div className="resume-actions mt-6 flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/">Back to portfolio</Link>
          </Button>
        </div>
      </Container>
    </PageShell>
  );
}
