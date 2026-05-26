import type { Metadata } from 'next';
import { describe, expect, it } from 'vitest';

import {
  buildPageMetadata,
  commercialKeywords,
  homeMetadata,
  homeTitle,
  resolveFullTitle,
  resumeMetadata,
  resumeTitle,
  seoKeywords,
  shortMetaKeywords,
  siteUrl,
  TITLE_MAX_LENGTH,
  truncateMetaDescription,
} from './site-metadata';

function firstOpenGraphImageUrl(
  images: NonNullable<NonNullable<Metadata['openGraph']>['images']> | undefined,
): string | undefined {
  if (!images) return undefined;
  const list = Array.isArray(images) ? images : [images];
  const first = list[0];
  if (first && typeof first === 'object' && 'url' in first) {
    return String(first.url);
  }
  return undefined;
}

describe('site-metadata', () => {
  it('builds unique canonical and social URLs per path', () => {
    const resume = buildPageMetadata({
      path: '/resume',
      title: 'Resume',
      description: 'Resume page',
    });

    expect(resume.alternates?.canonical).toBe(`${siteUrl}/resume`);
    expect(resume.openGraph?.url).toBe(`${siteUrl}/resume`);
    expect(firstOpenGraphImageUrl(resume.openGraph?.images)).toBe(`${siteUrl}/og-image.png`);
    expect(resume.twitter?.images).toEqual([`${siteUrl}/og-image.png`]);
  });

  it('uses absolute title for homepage metadata', () => {
    expect(homeMetadata.title).toEqual({ absolute: homeTitle });
    expect(homeMetadata.alternates?.canonical).toBe(`${siteUrl}/`);
  });

  it('uses title segment for resume and full title for OG', () => {
    expect(resumeMetadata.title).toBe('Resume');
    expect(resumeMetadata.openGraph?.title).toBe(resolveFullTitle(resumeTitle));
    expect(String(resumeMetadata.openGraph?.title).length).toBeLessThanOrEqual(TITLE_MAX_LENGTH);
  });

  it('keeps resume and home descriptions distinct', () => {
    expect(homeMetadata.description).not.toBe(resumeMetadata.description);
    expect(resumeTitle).toBe('Resume');
  });

  it('uses short meta keywords on indexed pages', () => {
    expect(homeMetadata.keywords).toEqual([...shortMetaKeywords]);
    expect(resumeMetadata.keywords).toEqual([...shortMetaKeywords]);
    expect(homeMetadata.keywords?.length).toBeGreaterThanOrEqual(10);
    expect(homeMetadata.keywords?.length).toBeLessThanOrEqual(15);
    for (const phrase of commercialKeywords) {
      expect(homeMetadata.keywords).not.toContain(phrase);
    }
    expect(seoKeywords.length).toBeGreaterThanOrEqual(40);
  });

  it('truncates long meta descriptions', () => {
    const long = 'x'.repeat(200);
    const result = truncateMetaDescription(long);
    expect(result.length).toBeLessThanOrEqual(160);
    expect(result.endsWith('...')).toBe(true);
  });
});
