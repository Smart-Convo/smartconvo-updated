import { useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

/**
 * Scroll progress (0..1) of a tall "track" element that contains a sticky child.
 * 0 when the track's top reaches the top of the screen, 1 when its bottom reaches the bottom.
 * Measured live from getBoundingClientRect, so it can't go stale when layout shifts above it,
 * and it listens to scroll events from any scroller (capture) plus a frame loop while near the screen.
 */
export function useLiveProgress(ref, mode = '') {
  const mv = useMotionValue(0);
  useEffect(() => {
    let raf = 0;
    let near = true;
    let last = -1;
    const read = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
      if (p !== last) { last = p; mv.set(p); }
    };
    const loop = () => { if (near) read(); raf = requestAnimationFrame(loop); };
    read();
    raf = requestAnimationFrame(loop);
    let io;
    if (typeof IntersectionObserver !== 'undefined' && ref.current) {
      io = new IntersectionObserver(([e]) => { near = e.isIntersecting; }, { rootMargin: '100% 0px 100% 0px' });
      io.observe(ref.current);
    }
    window.addEventListener('scroll', read, { passive: true, capture: true });
    window.addEventListener('resize', read);
    return () => {
      cancelAnimationFrame(raf);
      io && io.disconnect();
      window.removeEventListener('scroll', read, { capture: true });
      window.removeEventListener('resize', read);
    };
  }, [ref, mv, mode]);
  return mv;
}
