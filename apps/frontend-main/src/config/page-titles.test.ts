import type { Metadata } from 'next';
import { describe, expect, it } from 'vitest';

import { buildLandingPageMetadata, landingPages } from './landing-pages';
import {
  blogHubMetadata,
  blogNotFoundMetadata,
  buildPageMetadata,
  formatBlogPostTitleSegment,
  homeMetadata,
  notFoundMetadata,
  resolveFullTitle,
  resumeMetadata,
  TITLE_MAX_LENGTH,
  META_DESCRIPTION_MAX_LENGTH,
} from './site-metadata';
import { projects, projectsPageTitle } from '../data/portfolio';

function socialTitle(meta: Metadata): string {
  return String(meta.openGraph?.title ?? '');
}

function documentTitle(meta: Metadata, segment: string, absolute = false): string {
  if (meta.title && typeof meta.title === 'object' && 'absolute' in meta.title) {
    return String(meta.title.absolute);
  }
  return resolveFullTitle(segment, { absoluteTitle: absolute });
}

type StaticPageCase = {
  label: string;
  meta: Metadata;
  segment: string;
  absolute?: boolean;
};

const staticPages: StaticPageCase[] = [
  {
    label: '/',
    meta: homeMetadata,
    segment: 'Ashikur Rahman | Software Developer in Canada',
    absolute: true,
  },
  { label: '/resume', meta: resumeMetadata, segment: 'Resume' },
  {
    label: '/projects',
    meta: buildPageMetadata({
      path: '/projects',
      title: projectsPageTitle,
      description: 'Projects hub',
    }),
    segment: projectsPageTitle,
  },
  {
    label: '/contact',
    meta: buildPageMetadata({
      path: '/contact',
      title: 'Contact Ashikur Rahman',
      description: 'Contact page',
      absoluteTitle: true,
    }),
    segment: 'Contact Ashikur Rahman',
    absolute: true,
  },
  { label: '/blog', meta: blogHubMetadata, segment: 'Blog' },
  { label: '/404', meta: notFoundMetadata, segment: 'Page not found' },
  { label: '/blog/not-found', meta: blogNotFoundMetadata, segment: 'Article not found' },
  ...landingPages.map((page) => ({
    label: page.path,
    meta: buildLandingPageMetadata(page),
    segment: page.title,
  })),
  ...projects.map((project) => ({
    label: `/projects/${project.slug}`,
    meta: buildPageMetadata({
      path: `/projects/${project.slug}`,
      title: project.seoTitle,
      description: project.seoDescription,
    }),
    segment: project.seoTitle,
  })),
];

describe('page titles', () => {
  it.each(staticPages)(
    '$label document title is at most 70 characters',
    ({ meta, segment, absolute }) => {
      const full = documentTitle(meta, segment, absolute);
      expect(full.length).toBeLessThanOrEqual(TITLE_MAX_LENGTH);
    },
  );

  it.each(staticPages)('$label OG title matches document title', ({ meta, segment, absolute }) => {
    const full = documentTitle(meta, segment, absolute);
    expect(socialTitle(meta)).toBe(full);
  });

  it.each(staticPages)(
    '$label Twitter title matches document title',
    ({ meta, segment, absolute }) => {
      const full = documentTitle(meta, segment, absolute);
      expect(meta.twitter?.title).toBe(full);
    },
  );

  it('indexed static page titles are unique', () => {
    const indexed = staticPages.filter(
      (page) => page.label !== '/404' && page.label !== '/blog/not-found',
    );
    const titles = indexed.map((page) => documentTitle(page.meta, page.segment, page.absolute));
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('formatBlogPostTitleSegment keeps branded title within limit', () => {
    const longTitle = 'A'.repeat(120);
    const segment = formatBlogPostTitleSegment(longTitle);
    expect(resolveFullTitle(segment).length).toBeLessThanOrEqual(TITLE_MAX_LENGTH);
  });
});

describe('meta descriptions', () => {
  it.each(staticPages.filter((p) => p.label !== '/projects'))(
    '$label description is at most 160 characters',
    ({ meta }) => {
      const description = String(meta.description ?? '');
      expect(description.length).toBeLessThanOrEqual(META_DESCRIPTION_MAX_LENGTH);
    },
  );
});
