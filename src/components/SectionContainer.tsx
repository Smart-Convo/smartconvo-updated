import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { sectionContainerVariants, defaultSectionViewport } from '../utils/motionVariants';

interface SectionContainerProps extends HTMLMotionProps<'section'> {
  id?: string;
  className?: string;
  children: React.ReactNode;
  viewport?: typeof defaultSectionViewport;
}

export default function SectionContainer({
  id,
  className = '',
  children,
  viewport = defaultSectionViewport,
  ...props
}: SectionContainerProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={sectionContainerVariants}
      {...props}
    >
      {children}
    </motion.section>
  );
}
