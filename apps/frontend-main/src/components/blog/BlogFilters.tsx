'use client';

import { BLOG_CATEGORIES } from '@ashikur-portfolio/shared/constants/blog';
import { Button, Input } from '@ashikur-portfolio/shared/ui';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useState, useTransition } from 'react';

export type BlogFiltersProps = {
  currentCategory?: string;
  currentTag?: string;
  currentQuery?: string;
};

export function BlogFilters({ currentCategory, currentTag, currentQuery }: BlogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(currentQuery ?? '');

  const applyParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      params.delete('page');
      startTransition(() => {
        const nextQuery = params.toString();
        router.push(nextQuery ? `${pathname}?${nextQuery}` : pathname);
      });
    },
    [pathname, router, searchParams],
  );

  return (
    <form
      className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
      onSubmit={(e) => {
        e.preventDefault();
        applyParams({ q: query.trim() || undefined });
      }}
    >
      <div className="flex flex-1 flex-col gap-2 sm:max-w-md">
        <label htmlFor="blog-search" className="sr-only">
          Search blog posts
        </label>
        <Input
          id="blog-search"
          name="q"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles…"
          disabled={isPending}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <select
          name="category"
          value={currentCategory ?? ''}
          className="h-10 rounded-md border border-input bg-background px-3 text-body-sm"
          disabled={isPending}
          onChange={(e) => applyParams({ category: e.target.value || undefined })}
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {BLOG_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {currentTag ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isPending}
            onClick={() => applyParams({ tag: undefined })}
          >
            Tag: {currentTag} ×
          </Button>
        ) : null}
        <Button type="submit" size="sm" disabled={isPending}>
          Search
        </Button>
      </div>
    </form>
  );
}
