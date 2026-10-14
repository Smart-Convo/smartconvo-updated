import SectionHeading from './SectionHeading';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { sectionContainerVariants, staggerItemVariants, defaultSectionViewport } from '../utils/motionVariants';

export default function SunsetCta({ onOpenModal }) {
  return (
    <motion.section 
      id="cta" 
      initial="hidden"
      whileInView="visible"
      viewport={defaultSectionViewport}
      variants={sectionContainerVariants}
      className="py-20 bg-transparent px-4 sm:px-6 lg:px-8"
    >
      <motion.div 
        variants={staggerItemVariants}
        data-keep-dark className="max-w-6xl mx-auto rounded-[2.5rem] bg-zinc-950 border border-zinc-800 text-white relative overflow-hidden py-16 sm:py-24 px-6 sm:px-12 text-center shadow-2xl"
      >
        {/* Electric Blue ambient background radial highlight */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0066FF]/25 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-80 h-80 bg-[#D4FF00]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <SectionHeading eyebrow="Get started" lead="Maximise revenue by never" accent="missing a high-ticket call again" />

          <p className="text-zinc-300 ios-subtext sm:text-[17px] max-w-2xl mx-auto leading-relaxed">
            Turn your inbound and overflow phone lines into an automated deal-closing engine with Smart Convo. Setup takes just 5 days.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenModal}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D4FF00] hover:bg-[#c6ee00] text-zinc-950 font-bold text-sm shadow-[0_4px_25px_rgba(212,255,0,0.45)] border border-[#bfe800] transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Book an Executive Demo</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          <div className="ios-footnote text-zinc-500 pt-2 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Live in 5 days · No upfront engineering</span>
          </div>
        </div>

      </motion.div>
    </motion.section>
  );
}
