import { describe, expect, it } from 'vitest';

import { footerNavItems, navItems } from './portfolio';

const hashIds = new Set([
  'about',
  'experience',
  'impact',
  'education',
  'projects',
  'skills',
  'capabilities',
  'achievements',
  'cp-engineering',
  'contact',
  'working-style',
]);

describe('internal hash links', () => {
  it('navItems point to known section ids', () => {
    for (const item of navItems) {
      expect(item.href.startsWith('#')).toBe(true);
      const id = item.href.slice(1);
      expect(hashIds.has(id)).toBe(true);
    }
  });

  it('footer hash links point to known section ids', () => {
    for (const item of footerNavItems) {
      if (item.href.startsWith('#')) {
        const id = item.href.slice(1);
        expect(hashIds.has(id)).toBe(true);
      }
    }
  });
});
