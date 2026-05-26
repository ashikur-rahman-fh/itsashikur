import type { BlogPostPublicListItem } from '@ashikur-portfolio/shared/api';

export function pickRelatedPosts(
  currentSlug: string,
  category: string,
  tags: string[],
  candidates: BlogPostPublicListItem[],
  limit = 3,
): BlogPostPublicListItem[] {
  const others = candidates.filter((p) => p.slug !== currentSlug);
  const tagSet = new Set(tags.map((t) => t.toLowerCase()));

  const scored = others.map((post) => {
    let score = 0;
    if (post.category === category) score += 2;
    for (const tag of post.tags) {
      if (tagSet.has(tag.toLowerCase())) score += 1;
    }
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score || b.post.publishedAt.localeCompare(a.post.publishedAt));

  const picked: BlogPostPublicListItem[] = [];
  for (const { post, score } of scored) {
    if (picked.length >= limit) break;
    if (score > 0 || picked.length === 0) {
      picked.push(post);
    }
  }

  if (picked.length < limit) {
    for (const { post } of scored) {
      if (picked.length >= limit) break;
      if (!picked.some((p) => p.slug === post.slug)) {
        picked.push(post);
      }
    }
  }

  return picked.slice(0, limit);
}
