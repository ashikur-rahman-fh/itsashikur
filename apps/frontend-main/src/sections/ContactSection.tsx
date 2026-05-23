import { Button, Reveal, Section } from '@ashikur-portfolio/shared/ui';

import { mailtoHref, siteLinks } from '../config/site-links';

export function ContactSection() {
  return (
    <Section
      id="contact"
      variant="dark"
      heading={{
        eyebrow: 'Contact',
        title: 'Let’s connect',
        description:
          'Open to software engineering opportunities, collaborations, and technical conversations.',
        onDark: true,
      }}
    >
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button size="lg" asChild className="min-h-11">
            <a href={mailtoHref}>Email me</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="panel-on-technical-interactive min-h-11"
          >
            <a href={siteLinks.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="panel-on-technical-interactive min-h-11"
          >
            <a href={siteLinks.codeforcesUrl} target="_blank" rel="noopener noreferrer">
              Codeforces
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="panel-on-technical-interactive min-h-11"
          >
            <a href={siteLinks.linkedinUrl} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </Button>
        </div>
        <p className="mt-6 text-body-sm text-surface-technical-foreground/75">
          <a href={mailtoHref} className="underline-offset-4 hover:underline">
            {siteLinks.email}
          </a>
        </p>
      </Reveal>
    </Section>
  );
}
