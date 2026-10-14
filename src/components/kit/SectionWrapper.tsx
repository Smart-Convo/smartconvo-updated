import React from 'react';
import { cn } from '../../lib/cn';

export function SectionWrapper({ children, className, id }: {
  children: React.ReactNode; className?: string; id?: string; bg?: string; rounded?: boolean; overlaps?: boolean;
}) {
  return (
    <section id={id} className={cn('relative py-12 sm:py-20', className)}>
      <div className="container-large">{children}</div>
    </section>
  );
}
