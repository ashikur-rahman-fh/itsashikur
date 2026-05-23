import { ProjectCard, Reveal, Section } from '@ashikur-portfolio/shared/ui';

import { projects } from '../data/portfolio';

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      variant="muted"
      heading={{
        eyebrow: 'Projects',
        title: 'Engineering case studies',
        description:
          'Selected work spanning machine learning, distributed data, full-stack applications, and embedded systems.',
      }}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 60}>
            <ProjectCard {...project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
