function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className}`} aria-hidden />;
}

export function BlogHubLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-5xl space-y-10" aria-busy="true" aria-label="Loading blog">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <Pulse className="h-10 w-full max-w-md" />
        <Pulse className="h-10 w-48" />
      </div>
      <div className="layout-card-grid md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Pulse key={i} className="h-64 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function BlogPostLoadingSkeleton() {
  return (
    <article className="mx-auto max-w-5xl space-y-8" aria-busy="true" aria-label="Loading article">
      <div className="mx-auto max-w-3xl space-y-4">
        <Pulse className="h-4 w-32" />
        <Pulse className="h-12 w-full" />
        <Pulse className="h-24 w-full" />
        <Pulse className="aspect-[2/1] w-full rounded-xl" />
      </div>
      <div className="mx-auto max-w-3xl space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Pulse key={i} className="h-4 w-full" />
        ))}
      </div>
    </article>
  );
}
