import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BlogMarkdown } from './BlogMarkdown';

describe('BlogMarkdown', () => {
  it('renders headings and code blocks', () => {
    render(
      <BlogMarkdown
        content={'## Hello\n\n```python\nprint("hi")\n```\n\n| A | B |\n|---|---|\n| 1 | 2 |'}
      />,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Hello' })).toBeInTheDocument();
  });

  it('strips script tags from raw HTML in markdown', () => {
    const { container } = render(
      <BlogMarkdown content={'<script>alert("xss")</script>\n\nSafe text'} />,
    );
    expect(container.querySelector('script')).toBeNull();
    expect(screen.getByText('Safe text')).toBeInTheDocument();
  });

  it('does not render javascript links', () => {
    const { container } = render(<BlogMarkdown content={'[click](javascript:alert(1))'} />);
    const links = container.querySelectorAll('a[href*="javascript"]');
    expect(links.length).toBe(0);
  });

  it('blocks protocol-relative links', () => {
    const { container } = render(<BlogMarkdown content={'[evil](//evil.com)'} />);
    const link = container.querySelector('a');
    expect(link?.getAttribute('href')).toBe('#');
  });

  it('does not render javascript: image sources', () => {
    const { container } = render(<BlogMarkdown content={'![x](javascript:alert(1))'} />);
    expect(container.querySelector('img')).toBeNull();
  });

  it('does not render data: image sources', () => {
    const { container } = render(<BlogMarkdown content={'![x](data:image/png;base64,abc)'} />);
    expect(container.querySelector('img')).toBeNull();
  });
});
