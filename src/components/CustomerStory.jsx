import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { sectionContainerVariants, staggerItemVariants, defaultSectionViewport } from '../utils/motionVariants';

export default function CustomerStory({ onOpenModal }) {
  return (
    <motion.section 
      id="story" 
      initial="hidden"
      whileInView="visible"
      viewport={defaultSectionViewport}
      variants={sectionContainerVariants}
      className="py-24 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div variants={staggerItemVariants} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-700/80 mb-3 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span className="ios-badge text-[11px] font-bold tracking-wider text-blue-400 uppercase">
                ENTERPRISE CASE STUDY
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              See how enterprise leaders<br />are recovering missed pipeline
            </h2>
          </div>

          <p className="text-zinc-300 ios-subtext sm:text-[16px] max-w-md leading-relaxed">
            From high-ticket luxury villas to multi-location retail chains, Smart Convo ensures high-intent callers never hit voicemail.
          </p>
        </motion.div>

        {/* Featured Case Study Card */}
        <motion.div variants={staggerItemVariants} className="rounded-3xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="ios-caption font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Tariq Mehmood
                </span>
                <span className="ios-badge text-sm font-semibold text-blue-400">
                  Sales Director, Premier Estates & Developments · Lahore & Islamabad
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                "The Hardest Part of Luxury Real Estate Was Phone Speed. Smart Convo Solved It in 24 Hours."
              </h3>

              <div className="pt-2">
                <button
                  onClick={onOpenModal}
                  className="inline-flex items-center gap-2 font-bold text-sm text-[#D4FF00] hover:text-[#c6ee00] transition-colors cursor-pointer group"
                >
                  <span>Read full enterprise case study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* 3 Metrics Row */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-800">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    18.5M PKR
                  </div>
                  <div className="ios-caption text-zinc-400 mt-1">
                    Commission recovered from overflow calls
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    4,200+
                  </div>
                  <div className="ios-caption text-zinc-400 mt-1">
                    Calls answered in fluent Urdu & English
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    160+ hrs
                  </div>
                  <div className="ios-caption text-zinc-400 mt-1">
                    Saved by brokers who now focus purely on closing
                  </div>
                </div>
              </div>
            </div>

            {/* Right Video Thumbnail Mockup */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg border border-zinc-800 min-h-[300px] bg-zinc-900 group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Real Estate Villa"
                className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#D4FF00] flex items-center justify-center text-zinc-950 shadow-[0_0_20px_rgba(212,255,0,0.5)] group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-zinc-950 ml-0.5" />
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
