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
        Let&apos;s connect
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-body leading-relaxed text-muted-foreground">
        Interested in software engineering, backend systems, or full-stack work in Canada? Explore
        my projects, resume, or get in touch.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/projects">View my projects</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/resume">See my resume</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/contact">Contact me</Link>
        </Button>
      </div>
    </section>
  );
}
