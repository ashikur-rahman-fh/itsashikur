import { Button, Reveal, Section } from '@ashikur-portfolio/shared/ui';

import { mailtoHref, siteLinks } from '../config/site-links';
import { contactSidebar, profile, sectionCopy } from '../data/portfolio';
import { ContactForm } from './contact';

export function ContactSection() {
  return (
    <Section
      id="contact"
      variant="muted"
      heading={{
        eyebrow: 'Contact',
        title: sectionCopy.contact.title,
        description: sectionCopy.contact.description,
      }}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10">
        <Reveal>
          <div className="portfolio-surface p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="portfolio-surface flex h-full flex-col justify-between gap-6 p-6 sm:p-8">
            <div className="space-y-4">
              <h3 className="text-card-title font-semibold text-foreground">
                {contactSidebar.title}
              </h3>
              <p className="text-body-sm text-muted-foreground">{contactSidebar.description}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button size="lg" asChild className="min-h-11">
                  <a href={mailtoHref}>Email me directly</a>
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
                  <a href={siteLinks.youtubeUrl} target="_blank" rel="noopener noreferrer">
                    YouTube
                  </a>
                </Button>
              </div>
            </div>
            <div className="space-y-1 border-t border-border pt-6 text-body-sm text-muted-foreground">
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
      </div>
    </Section>
  );
}
