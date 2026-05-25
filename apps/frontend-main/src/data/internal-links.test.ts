import { describe, expect, it } from 'vitest';

import { footerNavItems, navItems } from './portfolio';

const hashIds = new Set([
  'about',
  'experience',
  'impact',
  'education',
  'featured-projects',
  'skills',
  'capabilities',
  'achievements',
  'cp-engineering',
  'contact',
  'working-style',
]);

function sectionIdFromHref(href: string): string | null {
  if (href.startsWith('/#')) {
    return href.slice(2);
  }
  if (href.startsWith('#')) {
    return href.slice(1);
  }
  return null;
}

describe('internal hash links', () => {
  it('navItems use valid homepage section ids or crawlable routes', () => {
    for (const item of navItems) {
      if (item.href === '__resume__') {
        continue;
      }
      const sectionId = sectionIdFromHref(item.href);
      if (sectionId) {
        expect(hashIds.has(sectionId)).toBe(true);
      } else {
        expect(item.href.startsWith('/')).toBe(true);
      }
    }
  });

  it('footer hash links point to known section ids', () => {
    for (const item of footerNavItems) {
      if (item.href === '__resume__' || !item.href.startsWith('/#')) {
        continue;
      }
      const id = sectionIdFromHref(item.href);
      expect(id).not.toBeNull();
      expect(hashIds.has(id!)).toBe(true);
    }
  });
});
