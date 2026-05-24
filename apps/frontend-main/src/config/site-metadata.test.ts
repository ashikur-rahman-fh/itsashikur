import type { Metadata } from 'next';
import { describe, expect, it } from 'vitest';

import {
  buildPageMetadata,
  homeMetadata,
  homeTitle,
  recruiterKeywords,
  resumeMetadata,
  seoKeywords,
  siteUrl,
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

  it('keeps resume and home descriptions distinct', () => {
    expect(homeMetadata.description).not.toBe(resumeMetadata.description);
    expect(resumeMetadata.title).toBe('Resume | Software Engineer Portfolio Canada');
  });

  it('exports a broad homepage keyword set', () => {
    expect(homeMetadata.keywords?.length).toBeGreaterThanOrEqual(40);
    expect(seoKeywords.length).toBeGreaterThanOrEqual(40);
  });

  it('includes recruiter keywords on the resume page', () => {
    const sample = recruiterKeywords[0];
    expect(resumeMetadata.keywords).toContain(sample);
  });
});
