import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  it('preserves custom typography utilities when semantic text colors are merged', () => {
    expect(cn('text-section-title text-foreground')).toBe('text-section-title text-foreground');
    expect(cn('text-card-title text-muted-foreground')).toBe(
      'text-card-title text-muted-foreground',
    );
  });

  it('still merges conflicting standard Tailwind classes', () => {
    expect(cn('px-2 px-4 rounded-md rounded-lg')).toBe('px-4 rounded-lg');
  });
});
