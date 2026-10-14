import React from 'react';
import { cn } from '../../lib/cn';

export function TrustBadge({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#D4FF00] opacity-75 animate-ping" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4FF00]" />
      </span>
      <span className="text-sm text-zinc-400 font-medium">{text}</span>
    </div>
  );
}
