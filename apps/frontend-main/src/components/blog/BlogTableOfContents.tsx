import type { TableOfContentsItem } from '@ashikur-portfolio/shared/markdown';
import Link from 'next/link';

export type BlogTableOfContentsProps = {
  items: TableOfContentsItem[];
};

export function BlogTableOfContents({ items }: BlogTableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-lg border border-border bg-card/50 p-4 lg:sticky lg:top-24"
    >
      <p className="type-eyebrow mb-3 text-accent-foreground">On this page</p>
      <ol className="space-y-2 text-body-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'ml-4' : undefined}>
            <Link
              href={`#${item.id}`}
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
