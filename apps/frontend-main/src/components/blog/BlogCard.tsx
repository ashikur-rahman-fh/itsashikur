import type { BlogPostPublicListItem } from '@ashikur-portfolio/shared/api';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ashikur-portfolio/shared/ui';
import Link from 'next/link';

function formatPublishedDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('en-CA', { dateStyle: 'long' }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export type BlogCardProps = {
  post: BlogPostPublicListItem;
};

export function BlogCard({ post }: BlogCardProps) {
  const href = `/blog/${post.slug}`;

  return (
    <Card className="portfolio-card flex h-full flex-col overflow-hidden transition-shadow hover:shadow-card-hover">
      {post.coverImageUrl ? (
        <Link href={href} className="block aspect-[2/1] overflow-hidden bg-muted" tabIndex={-1}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImageUrl}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            loading="lazy"
            width={640}
            height={320}
          />
        </Link>
      ) : null}
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {post.category ? (
            <Badge variant="secondary" className="w-fit">
              {post.category}
            </Badge>
          ) : null}
          {post.isFeatured ? (
            <Badge variant="default" className="w-fit">
              Featured
            </Badge>
          ) : null}
        </div>
        <CardTitle className="font-display text-xl leading-snug">
          <Link href={href} className="text-foreground underline-offset-4 hover:underline">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-3 text-body leading-relaxed">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col gap-3 pt-0">
        <p className="text-body-sm text-muted-foreground">
          {formatPublishedDate(post.publishedAt)} · {post.readingTimeMinutes} min read ·{' '}
          {post.authorName}
        </p>
        {post.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="rounded-full bg-muted px-2.5 py-0.5 text-body-sm text-muted-foreground hover:text-foreground"
              >
                {tag}
              </Link>
            ))}
          </div>
        ) : null}
        <Link
          href={href}
          className="text-body-sm font-medium text-accent-foreground underline-offset-4 hover:underline"
        >
          Read article →
        </Link>
      </CardContent>
    </Card>
  );
}
