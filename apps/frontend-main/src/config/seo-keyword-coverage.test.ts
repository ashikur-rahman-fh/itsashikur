import { describe, expect, it } from 'vitest';

import { seoVisibleCopy } from '../data/portfolio';
import { buildSeoSchemaCorpus } from '../lib/json-ld';
import {
  commercialKeywords,
  homeDescription,
  homeSeoKeywords,
  homeTitle,
  primaryKeywords,
  projectKeywords,
  recruiterKeywords,
  resumeDescription,
  resumeSeoKeywords,
  resumeTitle,
  seoKeywords,
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
    seoVisibleCopy,
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

  it('includes commercial phrases on the full list only', () => {
    for (const phrase of commercialKeywords) {
      expect(seoKeywords).toContain(phrase);
      expect(homeSeoKeywords).not.toContain(phrase);
    }
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

  it('uses recruiter-heavy keywords on the resume page', () => {
    for (const phrase of [
      'software engineer portfolio Canada',
      'software developer with data structures and algorithms',
    ]) {
      expect(resumeSeoKeywords).toContain(phrase);
    }
  });
});
