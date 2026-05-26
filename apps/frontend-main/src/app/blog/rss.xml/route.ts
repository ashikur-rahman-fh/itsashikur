import {
  isBlogFetchError,
  safeFetchPublicBlogPosts,
} from '@ashikur-portfolio/shared/api/server/blog-fetch';
import type { BlogPostPublicListItem } from '@ashikur-portfolio/shared/api';

import { personName, siteUrl } from '../../../config/site-metadata';

export const revalidate = 60;

const RSS_MAX_POSTS = 50;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatRssDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return new Date().toUTCString();
  }
  return date.toUTCString();
}

export async function GET() {
  try {
    const allPosts: BlogPostPublicListItem[] = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages && allPosts.length < RSS_MAX_POSTS) {
      const response = await safeFetchPublicBlogPosts({ page, pageSize: 20 });
      if (isBlogFetchError(response)) {
        break;
      }
      allPosts.push(...response.results);
      totalPages = response.totalPages;
      page += 1;
    }

    const items = allPosts.slice(0, RSS_MAX_POSTS).map((post) => {
      const link = `${siteUrl}/blog/${post.slug}`;
      return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${link}</link>
  <guid isPermaLink="true">${link}</guid>
  <description>${escapeXml(post.excerpt)}</description>
  <pubDate>${formatRssDate(post.publishedAt)}</pubDate>
  <author>${escapeXml(post.authorName)}</author>
</item>`;
    });

    const lastBuild = allPosts[0]?.publishedAt
      ? formatRssDate(allPosts[0].publishedAt)
      : new Date().toUTCString();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(personName)} — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Software engineering articles on full-stack development, backend systems, and technical learning.</description>
    <language>en-ca</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${items.join('\n')}
  </channel>
</rss>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=60',
      },
    });
  } catch {
    return new Response('Service unavailable', {
      status: 503,
      headers: { 'Cache-Control': 'public, max-age=30' },
    });
  }
}
