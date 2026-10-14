import React, { useRef, Children } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Scroll-driven card pile.
 * Every card pins at the same spot (with a small step so earlier cards peek out above),
 * and the next card slides up and COVERS it. Earlier cards scale down and dim as they
 * get buried. Purely scroll-linked, so scrolling back up reverses it smoothly.
 */
function StackItem({ index, total, progress, step, scaleStep, dimStep, children }) {
  const reduce = useReducedMotion();
  const n = Math.max(total - 1, 1);

  // card i is untouched until card i+1 starts to arrive, then shrinks a little for every later card
  const inputs = [index / n];
  const scales = [1];
  const dims = [1];
  for (let j = index + 1; j < total; j++) {
    inputs.push(j / n);
    scales.push(1 - (j - index) * scaleStep);
    dims.push(1 - (j - index) * dimStep);
  }
  const flat = inputs.length < 2;
  const scale = useTransform(progress, flat ? [0, 1] : inputs, flat || reduce ? [1, 1] : scales);
  const bright = useTransform(progress, flat ? [0, 1] : inputs, flat || reduce ? [1, 1] : dims);
  const filter = useTransform(bright, (v) => `brightness(${v})`);

  return (
    // The pinned layer is a full-height slot: later slots scroll up over earlier ones.
    <div
      className="sticky"
      style={{
        top: 'var(--stack-top)',
        height: 'var(--stack-slot)',
        zIndex: index + 1,
        paddingTop: index * step,
      }}
    >
      <motion.div style={{ scale, filter, transformOrigin: 'top center', willChange: 'transform' }}>
        {children}
      </motion.div>
    </div>
  );
}

export default function StackedCards({ children, step = 14, scaleStep = 0.04, dimStep = 0.16, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const items = Children.toArray(children);

  return (
    <div
      ref={ref}
      className={`relative [--stack-top:76px] sm:[--stack-top:96px] [--stack-slot:calc(100svh-var(--stack-top)-96px)] sm:[--stack-slot:calc(100svh-var(--stack-top)-24px)] ${className}`}
    >
      {items.map((child, i) => (
        <StackItem key={i} index={i} total={items.length} progress={scrollYProgress} step={step} scaleStep={scaleStep} dimStep={dimStep}>
          {child}
        </StackItem>
      ))}
    </div>
  );
}
