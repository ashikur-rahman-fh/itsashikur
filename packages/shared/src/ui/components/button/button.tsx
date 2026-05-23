import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { ShadcnButton, type ShadcnButtonProps } from '../../primitives/shadcn/button';
import { cn } from '../../utils/cn';

const buttonVariants = cva('', {
  variants: {
    variant: {
      default: '',
      secondary: '',
      outline: '',
      ghost: '',
      destructive: '',
      accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
      muted: 'bg-muted text-foreground hover:bg-muted/90',
      warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
      success: 'bg-success text-success-foreground hover:bg-success/90',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const sizeMap = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
} as const;

const variantMap = {
  default: 'default',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
  destructive: 'destructive',
  accent: 'default',
  muted: 'secondary',
  warning: 'default',
  success: 'default',
} as const;

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;

const customVariants = new Set<ButtonVariant>(['accent', 'muted', 'warning', 'success']);

export type ButtonProps = Omit<ShadcnButtonProps, 'size' | 'variant'> &
  VariantProps<typeof buttonVariants> & {
    size?: 'sm' | 'md' | 'lg';
    variant?: ButtonVariant;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const shadcnVariant: ShadcnButtonProps['variant'] = variantMap[variant];
    const shadcnSize = sizeMap[size];
    const customVariantClass = customVariants.has(variant) ? buttonVariants({ variant }) : '';

    return (
      <ShadcnButton
        ref={ref}
        variant={shadcnVariant}
        size={shadcnSize}
        className={cn(customVariantClass, className)}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
