import { cn } from './cn';

export type AdminPageHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

export function AdminPageHeader({ title, description, className }: AdminPageHeaderProps) {
  return (
    <header className={cn('space-y-1', className)}>
      <h1 className="font-display text-page-title font-bold text-foreground">{title}</h1>
      {description ? <p className="text-body-sm text-muted-foreground">{description}</p> : null}
    </header>
  );
}
