import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'hero',
        'section-title',
        'page-title',
        'card-title',
        'stat',
        'lead',
        'body',
        'body-sm',
        'eyebrow',
        'ui',
        'ui-sm',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
