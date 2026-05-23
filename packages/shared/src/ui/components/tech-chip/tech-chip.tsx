import * as React from 'react';

import { Badge } from '../badge';
import { cn } from '../../utils/cn';

export type TechChipProps = React.HTMLAttributes<HTMLSpanElement> & {
  label: string;
};

export function TechChip({ label, className, ...props }: TechChipProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'border-border/80 bg-background text-foreground transition-colors hover:border-accent-foreground/40 hover:bg-accent/60',
        className,
      )}
      {...props}
    >
      {label}
    </Badge>
  );
}
