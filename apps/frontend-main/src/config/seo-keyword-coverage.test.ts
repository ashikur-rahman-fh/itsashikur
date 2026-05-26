import { describe, expect, it } from 'vitest';

import { seoCorpusText } from './seo-corpus';
import { landingPagesSeoCopy } from './landing-pages';
import { projectsHubSeoCopy, seoVisibleCopy } from '../data/portfolio';
import { buildSeoSchemaCorpus } from '../lib/json-ld';
import {
  blogHubDescription,
  blogHubTitle,
  commercialKeywords,
  homeDescription,
  homeMetadata,
  homeTitle,
  primaryKeywords,
  projectKeywords,
  recruiterKeywords,
  resumeDescription,
  resumeMetadata,
  resumeTitle,
  seoKeywords,
  shortMetaKeywords,
  technicalKeywords,
} from './site-metadata';

const allTargetKeywordGroups = [
  primaryKeywords,
  recruiterKeywords,
  technicalKeywords,
  commercialKeywords,
  projectKeywords,
] as const;

const allTargetKeywords = allTargetKeywordGroups.flat();

function buildSeoCorpus(): string {
  return [
    homeTitle,
    homeDescription,
    resumeTitle,
    resumeDescription,
    blogHubTitle,
    blogHubDescription,
    seoVisibleCopy,
    seoCorpusText,
    landingPagesSeoCopy,
    projectsHubSeoCopy,
    buildSeoSchemaCorpus(),
    seoKeywords.join('\n'),
  ].join('\n');
}

describe('seo keyword coverage', () => {
  it('exports the full deduped keyword list from all groups', () => {
    expect(seoKeywords.length).toBeGreaterThanOrEqual(40);
    for (const phrase of allTargetKeywords) {
      expect(seoKeywords).toContain(phrase);
    }
  });

  it('includes commercial phrases on the full list only, not in HTML meta keywords', () => {
    for (const phrase of commercialKeywords) {
      expect(seoKeywords).toContain(phrase);
      expect(homeMetadata.keywords).not.toContain(phrase);
      expect(resumeMetadata.keywords).not.toContain(phrase);
    }
  });

  it('emits short meta keywords on indexed pages only', () => {
    expect(homeMetadata.keywords).toEqual([...shortMetaKeywords]);
    expect(resumeMetadata.keywords).toEqual([...shortMetaKeywords]);
  });

  it('covers every target phrase in metadata, visible copy, or schema', () => {
    const corpus = buildSeoCorpus().toLowerCase();
    const missing: string[] = [];

    for (const phrase of allTargetKeywords) {
      if (!corpus.includes(phrase.toLowerCase())) {
        missing.push(phrase);
      }
    }

    expect(missing, `Missing phrases:\n${missing.join('\n')}`).toEqual([]);
  });

  it('mentions recruiter topics in resume metadata description', () => {
    const lower = resumeDescription.toLowerCase();
    expect(lower).toContain('ottawa');
    expect(lower).toContain('backend');
    expect(lower).toContain('full-stack');
  });
});
