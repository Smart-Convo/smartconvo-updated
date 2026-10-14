import React from 'react';

/**
 * Smart Convo Official Brand Logo
 * Precision vector recreation of the official brand identity:
 * - Intertwined 3D Chrome dual-loop monogram emblem ("SC" / infinity)
 * - Radiant focal starburst flare glint at the center intersection
 * - 100% transparent, seamless background integration
 * - Authoritative uppercase typography: "SMART CONVO" & "VOICE AI AGENTS"
 */

export function SmartConvoMark({
  size = 44,
  className = '',
  variant = 'dark',
  tone, // 'white' | 'dark' override; defaults to white on dark UI
}) {
  const useDark = tone ? tone === 'dark' : variant === 'light-emblem';
  return (
    <img
      src={useDark ? '/smartconvo-mark-dark.png' : '/smartconvo-mark-white.png'}
      alt="Smart Convo"
      width={size}
      height={Math.round(size * 0.743)}
      className={`shrink-0 object-contain select-none ${className}`}
      draggable={false}
    />
  );
}

/**
 * Full Smart Convo Brand Identity
 * Renders the intertwined 3D chrome emblem with radiant center starburst
 * along with the official "SMART CONVO" and "VOICE AI AGENTS" typography.
 * Supports both horizontal (navbar/footer) and stacked (card/hero) layouts.
 * 
 * Engineered to be 100% SEAMLESS with any background:
 * - Transparent vector canvas (no rectangular box or dark block edges)
 * - Anti-aliased SVG paths with natural drop-shadows and ambient glow
 */
export default function SmartConvoLogo({
  variant = 'dark',
  markSize = 42,
  showText = true,
  layout = 'horizontal', // 'horizontal' | 'stacked'
  className = '',
  textColor,
  subtextColor,
  showStarburst = true,
  showEqualizer = false,
  tone, // 'dark' = dark mark + text, for use on light / lime backgrounds
}) {
  const isDark = variant !== 'light-text';
  const onLight = tone === 'dark';

  const titleColor = textColor || (isDark ? 'text-white' : 'text-slate-900');
  const tagColor = subtextColor || (isDark ? 'text-zinc-300' : 'text-slate-600');

  if (layout === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none bg-transparent ${className}`}>
        {/* Emblem on top */}
        <SmartConvoMark 
          size={markSize} 
          tone={onLight ? 'dark' : undefined}
          variant={variant} 
          showStarburst={showStarburst} 
          showEqualizer={showEqualizer} 
        />

        {/* Official Typography stacked below */}
        {showText && (
          <div className="flex flex-col items-center justify-center mt-3">
            <span
              className={`font-black tracking-[0.1em] uppercase transition-colors text-white ${titleColor}`}
              style={{
                fontSize: `${Math.round(markSize * 0.38)}px`,
                letterSpacing: '0.1em',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", "Inter", sans-serif',
                lineHeight: 1.1,
                color: '#FFFFFF',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5), 0 0 1px rgba(255, 255, 255, 0.3)',
              }}
            >
              SMART CONVO
            </span>
            <span
              className={`font-bold uppercase transition-colors mt-1.5 tracking-[0.28em] ${tagColor}`}
              style={{
                fontSize: `${Math.max(9, Math.round(markSize * 0.17))}px`,
                letterSpacing: '0.28em',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", "Inter", sans-serif',
                lineHeight: 1,
                color: '#CBD5E1',
                opacity: 0.95,
              }}
            >
              VOICE AI AGENTS
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3.5 select-none bg-transparent ${className}`}>
      {/* Intertwined 3D Chrome Ribbon Emblem with Radiant Starburst */}
      <SmartConvoMark 
        size={markSize} 
        tone={onLight ? 'dark' : undefined}
        variant={variant} 
        showStarburst={showStarburst} 
        showEqualizer={showEqualizer} 
      />

      {/* Official Typography from brand reference */}
      {showText && (
        <div className="flex flex-col justify-center leading-none text-left">
          <span
            className={`font-black tracking-[0.08em] uppercase transition-colors text-white ${titleColor}`}
            style={{
              fontSize: `${Math.round(markSize * 0.44)}px`,
              letterSpacing: '0.08em',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", "Inter", sans-serif',
              lineHeight: 1.05,
              color: onLight ? '#0A0A0A' : '#FFFFFF',
              textShadow: onLight ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.45), 0 0 1px rgba(255, 255, 255, 0.25)',
            }}
          >
            SMART CONVO
          </span>
          <span
            className={`font-bold uppercase transition-colors mt-1.5 tracking-[0.24em] ${tagColor}`}
            style={{
              fontSize: `${Math.max(9, Math.round(markSize * 0.19))}px`,
              letterSpacing: '0.24em',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", "Inter", sans-serif',
              lineHeight: 1,
              color: onLight ? '#2B3300' : '#CBD5E1',
              opacity: 0.92,
            }}
          >
            VOICE AI AGENTS
          </span>
        </div>
      )}
    </div>
  );
}
