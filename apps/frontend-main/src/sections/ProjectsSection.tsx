import { ProjectCard, Reveal, Section } from '@ashikur-portfolio/shared/ui';

import { projects } from '../data/portfolio';

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      variant="muted"
      heading={{
        eyebrow: 'Projects',
        title: 'Selected projects',
        description:
          'Examples across machine learning, databases, full-stack apps, and embedded systems.',
      }}
    >
      <div className="layout-card-grid md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 60} fill>
            <ProjectCard {...project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
