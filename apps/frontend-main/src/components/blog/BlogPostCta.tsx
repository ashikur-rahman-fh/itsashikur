import { Button } from '@ashikur-portfolio/shared/ui';
import Link from 'next/link';

export function BlogPostCta() {
  return (
    <section
      aria-labelledby="post-cta-heading"
      className="mt-12 rounded-xl border border-border bg-muted/30 p-8 text-center"
    >
      <h2
        id="post-cta-heading"
        className="font-display text-section-title font-bold text-foreground"
      >
        More to explore
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-body leading-relaxed text-muted-foreground">
        Projects, resume, or send a message.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/projects">View projects</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/resume">Resume</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/contact">Contact</Link>
        </Button>
      </div>
    </section>
  );
}
