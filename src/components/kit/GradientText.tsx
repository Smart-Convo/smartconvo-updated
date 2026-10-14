import React from 'react';

export function GradientText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`bg-gradient-to-r from-[#D4FF00] to-[#7CFFB2] light:from-[#5b21b6] light:to-[#8b5cf6] bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}
