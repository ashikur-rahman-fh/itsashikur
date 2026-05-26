'use client';

import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';

function isSafeHref(href: string | undefined): boolean {
  if (!href) return false;
  const lower = href.trim().toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('vbscript:')
  ) {
    return false;
  }
  if (lower.startsWith('//')) return false;
  return true;
}

function isSafeImageSrc(src: string | undefined): boolean {
  if (!src) return false;
  const lower = src.trim().toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('vbscript:')
  ) {
    return false;
  }
  if (lower.startsWith('//')) return false;
  return lower.startsWith('http:') || lower.startsWith('https:') || lower.startsWith('/');
}

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    h1: [...(defaultSchema.attributes?.h1 ?? []), 'id'],
    h2: [...(defaultSchema.attributes?.h2 ?? []), 'id'],
    h3: [...(defaultSchema.attributes?.h3 ?? []), 'id'],
    h4: [...(defaultSchema.attributes?.h4 ?? []), 'id'],
    h5: [...(defaultSchema.attributes?.h5 ?? []), 'id'],
    h6: [...(defaultSchema.attributes?.h6 ?? []), 'id'],
    code: [...(defaultSchema.attributes?.code ?? []), 'className'],
    span: [...(defaultSchema.attributes?.span ?? []), 'className'],
  },
};

const components: Components = {
  a: ({ href, children, ...props }) => {
    const safeHref: string = href && isSafeHref(href) ? href : '#';
    const external = safeHref.startsWith('http');
    return (
      <a
        href={safeHref}
        rel={external ? 'noopener noreferrer' : undefined}
        target={external ? '_blank' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt, ...props }) => {
    const srcUrl = typeof src === 'string' ? src : undefined;
    const safeSrc = srcUrl && isSafeImageSrc(srcUrl) ? srcUrl : undefined;
    if (!safeSrc) return null;
    return (
      <img
        src={safeSrc}
        alt={alt ?? ''}
        loading="lazy"
        className="rounded-lg"
        width={800}
        height={450}
        {...props}
      />
    );
  },
};

export type BlogMarkdownProps = {
  content: string;
  className?: string;
};

export function BlogMarkdown({ content, className = '' }: BlogMarkdownProps) {
  return (
    <div className={`blog-prose ${className}`.trim()}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeHighlight, { detect: true, ignoreMissing: true }],
          [rehypeSanitize, sanitizeSchema],
        ]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
