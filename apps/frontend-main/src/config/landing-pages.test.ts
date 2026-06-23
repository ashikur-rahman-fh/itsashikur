import { describe, expect, it } from 'vitest';

import { countLandingPageWords, landingPages, LANDING_PAGE_MIN_WORD_COUNT } from './landing-pages';

describe('landing pages content', () => {
  it.each(landingPages.map((page) => [page.path, page] as const))(
    '%s has at least the minimum word count',
    (_path, page) => {
      const words = countLandingPageWords(page);
      expect(words, `${page.path} only has ${words} words`).toBeGreaterThanOrEqual(
        LANDING_PAGE_MIN_WORD_COUNT,
      );
    },
  );
});
