import { type Variants } from 'framer-motion';

/**
 * Standard Apple/Stripe-grade motion variants for scroll-triggered section reveals.
 * Uses a refined cubic-bezier curve for organic deceleration without abrupt stops.
 */
export const smoothEase = [0.21, 0.47, 0.32, 0.98] as const;

export const sectionContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 44,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: smoothEase,
      when: 'beforeChildren',
      staggerChildren: 0.14,
      delayChildren: 0.06,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: smoothEase,
    },
  },
};

export const staggerCardGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const cardItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: smoothEase,
    },
  },
};

export const defaultSectionViewport = {
  once: true,
  amount: 0.12,
  margin: '-40px',
};

export const heroSectionViewport = {
  once: true,
  amount: 0.02,
};
