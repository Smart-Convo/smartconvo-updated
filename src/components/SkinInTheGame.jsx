import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, FileX, Zap, DollarSign } from 'lucide-react';
import { sectionContainerVariants, staggerItemVariants, defaultSectionViewport } from '../utils/motionVariants';

export default function SkinInTheGame({ onOpenModal }) {
  return (
    <motion.section 
      id="guarantee" 
      initial="hidden"
      whileInView="visible"
      viewport={defaultSectionViewport}
      variants={sectionContainerVariants}
      className="py-20 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width Apple Grade Midnight Banner with Neon Yellow & Blue Highlights */}
        <div data-keep-dark className="rounded-3xl bg-zinc-950 p-8 sm:p-14 lg:p-16 text-white shadow-2xl relative overflow-hidden border border-zinc-800/80">
          
          {/* Subtle Electric Blue & Neon Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066FF]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#D4FF00]/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Content */}
            <motion.div variants={staggerItemVariants} className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15">
                <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
                <span className="ios-badge text-[10px] font-extrabold tracking-widest text-accent uppercase">
                  WE HAVE GOT SKIN IN THE GAME
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Try Smart Convo for 30 days,<br />or get 100% of your money back.
              </h2>

              <p className="text-zinc-300 ios-subtext sm:text-[16px] max-w-xl font-normal leading-relaxed">
                The only real risk is letting high-ticket callers slip through your phone lines. We connect to your existing PTCL, UAN, or mobile helplines with zero downtime.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6">
                <button
                  onClick={onOpenModal}
                  className="px-8 py-3.5 rounded-full bg-[#D4FF00] hover:bg-[#c6ee00] text-zinc-950 font-bold text-sm shadow-[0_4px_20px_rgba(212,255,0,0.4)] hover:shadow-[0_6px_28px_rgba(212,255,0,0.6)] border border-[#bfe800] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Book an Executive Demo</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <div className="flex items-center gap-2 text-xs text-white">
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="ios-footnote font-semibold text-zinc-200">Rated 4.9/5 by Enterprise Clients</span>
                </div>
              </div>
            </motion.div>

            {/* Right 4 Feature Pills */}
            <motion.div variants={staggerItemVariants} className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center flex flex-col items-center justify-center space-y-2 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#0066FF]/20 text-[#0066FF] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-sm font-bold text-white">30-day money-back</div>
                <div className="ios-caption text-zinc-400">Guaranteed refund</div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center flex flex-col items-center justify-center space-y-2 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-white/10 text-zinc-300 flex items-center justify-center">
                  <FileX className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-white">No Lock-in Contract</div>
                <div className="ios-caption text-zinc-400">Monthly billing</div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center flex flex-col items-center justify-center space-y-2 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#D4FF00]/20 text-accent flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <div className="text-sm font-bold text-white">Same-day setup</div>
                <div className="ios-caption text-zinc-400">Live on your UAN &lt; 24h</div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center flex flex-col items-center justify-center space-y-2 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-white">Zero Setup Fee</div>
                <div className="ios-caption text-zinc-400">Free onboarding</div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </motion.section>
  );
}
