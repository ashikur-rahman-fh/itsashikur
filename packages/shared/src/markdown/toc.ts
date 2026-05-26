import GithubSlugger from 'github-slugger';

export type TableOfContentsItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

/** Extract h2/h3 headings from markdown; IDs match rehype-slug / github-slugger. */
export function extractTableOfContents(markdown: string): TableOfContentsItem[] {
  const slugger = new GithubSlugger();
  const items: TableOfContentsItem[] = [];

  let inCodeFence = false;

  for (const line of markdown.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(trimmed);
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/\s+#+\s*$/, '').trim();
    if (!text) continue;
    const id = slugger.slug(text);
    if (!id) continue;
    items.push({ id, text, level });
  }

  return items;
}
