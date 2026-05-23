import * as React from 'react';

import { cn } from '../../utils/cn';
import { Container } from '../container';
import { SectionHeading, type SectionHeadingProps } from '../section-heading';

export type SectionVariant = 'default' | 'muted' | 'dark';

export type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id?: string;
  variant?: SectionVariant;
  containerClassName?: string;
  heading?: SectionHeadingProps;
  children: React.ReactNode;
};

const variantClasses: Record<SectionVariant, string> = {
  default: 'bg-background text-foreground',
  muted: 'bg-muted/50 text-foreground',
  dark: 'bg-surface-dark text-surface-dark-foreground',
};

export function Section({
  id,
  variant = 'default',
  className,
  containerClassName,
  heading,
  children,
  ...props
}: SectionProps) {
  const onDark = variant === 'dark';

  return (
    <section
      id={id}
      className={cn('py-16 sm:py-20', variantClasses[variant], className)}
      {...props}
    >
      <Container className={containerClassName}>
        {heading ? (
          <div className="mb-10 sm:mb-12">
            <SectionHeading {...heading} onDark={onDark} />
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
