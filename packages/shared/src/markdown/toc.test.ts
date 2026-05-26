import { describe, expect, it } from 'vitest';

import { extractTableOfContents } from './toc';

describe('extractTableOfContents', () => {
  it('extracts h2 and h3 headings with github-slugger ids', () => {
    const md = `## First Section\n\n### Sub section\n\n## Second`;
    const toc = extractTableOfContents(md);
    expect(toc).toHaveLength(3);
    expect(toc[0]).toMatchObject({ text: 'First Section', level: 2, id: 'first-section' });
    expect(toc[1]).toMatchObject({ text: 'Sub section', level: 3, id: 'sub-section' });
    expect(toc[2]).toMatchObject({ text: 'Second', level: 2, id: 'second' });
  });

  it('deduplicates heading ids like rehype-slug', () => {
    const md = `## Hello\n\n## Hello\n\n### Hello`;
    const toc = extractTableOfContents(md);
    expect(toc.map((t) => t.id)).toEqual(['hello', 'hello-1', 'hello-2']);
  });

  it('handles punctuation in headings', () => {
    const md = '## C++ memory model';
    const toc = extractTableOfContents(md);
    expect(toc[0]?.id).toBe('c-memory-model');
  });

  it('does not leak slug state between calls', () => {
    const first = extractTableOfContents('## Hello');
    const second = extractTableOfContents('## Hello');
    expect(first[0]?.id).toBe('hello');
    expect(second[0]?.id).toBe('hello');
  });

  it('ignores headings inside fenced code blocks', () => {
    const md = '```\n## Not a heading\n```\n\n## Real heading';
    const toc = extractTableOfContents(md);
    expect(toc).toHaveLength(1);
    expect(toc[0]?.text).toBe('Real heading');
  });
});
