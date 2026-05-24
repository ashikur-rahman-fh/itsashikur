import { Button, Reveal, Section } from '@ashikur-portfolio/shared/ui';

import { mailtoHref, siteLinks } from '../config/site-links';
import { profile } from '../data/portfolio';

export function ContactSection() {
  return (
    <Section
      id="contact"
      variant="muted"
      heading={{
        eyebrow: 'Contact',
        title: 'Get in touch',
        description:
          'Feel free to reach out about software engineering roles, collaboration, or a technical discussion.',
      }}
    >
      <Reveal>
        <div className="portfolio-surface max-w-2xl space-y-6 p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button size="lg" asChild className="min-h-11">
              <a href={mailtoHref}>Email Ashikur</a>
            </Button>
            <Button variant="outline" size="lg" asChild className="min-h-11">
              <a href={siteLinks.linkedinUrl} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="min-h-11">
              <a href={siteLinks.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="min-h-11">
              <a href={siteLinks.codeforcesUrl} target="_blank" rel="noopener noreferrer">
                Codeforces
              </a>
            </Button>
          </div>
          <div className="space-y-1 text-body-sm text-muted-foreground">
            <p>
              <a
                href={mailtoHref}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {siteLinks.email}
              </a>
            </p>
            <p>{profile.locationLine}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
