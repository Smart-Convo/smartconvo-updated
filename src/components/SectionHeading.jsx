import React from 'react';

/**
 * Shared modern section heading: small eyebrow, large tight headline with a
 * gradient accent on the second line.
 */
export default function SectionHeading({ eyebrow, lead, accent, align = 'center', size = 'lg', tone = 'light', className = '' }) {
  const alignCls = align === 'left' ? 'text-left' : 'text-center';
  const sizeCls = size === 'md'
    ? 'text-[22px] sm:text-[40px] leading-[1.12]'
    : 'text-[25px] sm:text-5xl lg:text-[56px] leading-[1.1]';
  return (
    <div className={`${alignCls} ${className}`}>
      {eyebrow && (
        <div className={`text-[10.5px] sm:text-[12px] font-medium tracking-[0.22em] uppercase mb-3 sm:mb-5 ${tone === 'dark' ? 'text-zinc-900/60' : 'text-zinc-500'}`}>{eyebrow}</div>
      )}
      <h2 className={`${sizeCls} font-semibold tracking-[-0.03em] ${tone === 'dark' ? 'text-zinc-950' : 'text-white'}`}>
        {lead}
        {accent && (
          <>
            <br />
            <span className={tone === 'dark' ? 'text-zinc-950/55' : 'bg-gradient-to-r from-[#D4FF00] to-accent-2 light:from-[#5b21b6] light:to-[#8b5cf6] bg-clip-text text-transparent'}>{accent}</span>
          </>
        )}
      </h2>
    </div>
  );
}
