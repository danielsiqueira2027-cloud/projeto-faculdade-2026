'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bp-primary disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-linear-to-br from-bp-primary to-bp-primary-container text-bp-on-primary shadow-[0_4px_12px_rgba(0,50,125,0.2)] hover:shadow-[0_6px_20px_rgba(0,50,125,0.3)] hover:-translate-y-0.5',
        secondary:
          'bg-bp-secondary-container text-bp-on-secondary-container hover:bg-bp-secondary-container/90 shadow-sm',
        outline:
          'border border-bp-outline-variant bg-transparent hover:bg-bp-surface-low text-bp-on-surface',
        ghost: 'hover:bg-bp-surface-low text-bp-primary hover:underline underline-offset-4',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4',
        lg: 'h-14 px-10 text-base',
        xl: 'h-16 px-12 text-lg rounded-[2rem]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const BlueprintButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
BlueprintButton.displayName = 'BlueprintButton';

export { BlueprintButton, buttonVariants };
