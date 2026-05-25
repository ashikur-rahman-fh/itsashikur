import Link from 'next/link';

import { Button, ProjectCard, Reveal, Section } from '@ashikur-portfolio/shared/ui';

import { featuredProjects, projectsSectionDescription } from '../data/portfolio';

export function ProjectsSection() {
  return (
    <Section
      id="featured-projects"
      variant="muted"
      heading={{
        eyebrow: 'Featured projects',
        title: 'Selected software development projects',
        description: projectsSectionDescription,
      }}
    >
      <div className="layout-card-grid md:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 60} fill>
            <ProjectCard
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
          </Reveal>
        ))}
      </div>
      <div className="mt-10 flex justify-center sm:mt-12">
        <Button size="lg" asChild>
          <Link href="/projects">View all projects</Link>
        </Button>
      </div>
    </Section>
  );
}
