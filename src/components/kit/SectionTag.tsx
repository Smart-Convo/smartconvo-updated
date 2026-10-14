import React from 'react';
import { cn } from '../../lib/cn';

export function SectionTag({ children, className }: { children: React.ReactNode; className?: string; variant?: string; icon?: React.ReactNode }) {
  return (
    <span className={cn('inline-block text-[12px] font-medium tracking-[0.24em] text-zinc-500 uppercase', className)}>
      {children}
    </span>
  );
}
