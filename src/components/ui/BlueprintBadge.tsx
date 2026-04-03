'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function BlueprintBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full bg-bp-surface-low px-3 py-1 text-xs font-semibold text-bp-primary border border-bp-outline-variant/20 shadow-xs uppercase tracking-wider",
      className
    )}>
      {children}
    </span>
  );
}
