import SectionHeading from './SectionHeading';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, CheckCircle, ArrowRight, Zap, RefreshCw, Layers, Building, ShoppingBag, Stethoscope } from 'lucide-react';
import CallDemoPhone from './CallDemoPhone';
import { sectionContainerVariants, staggerItemVariants, defaultSectionViewport } from '../utils/motionVariants';

const STEPS = [
  {
    num: 1,
    title: 'Customer dials your number',
    desc: 'Callers ring your regular UAN helpline, PTCL direct line, or local mobile number. No expensive hardware or SIP migration needed.'
  },
  {
    num: 2,
    title: 'Smart Convo answers in < 850ms',
    desc: 'Picks up on the first ring in natural, conversational bilingual Urdu or English. Capable of fielding 1,000 concurrent callers with zero hold music.'
  },
  {
    num: 3,
    title: 'Intent & High-Ticket Details Captured',
    desc: 'Qualifies buyer budget and timeline for real estate, verifies Cash-on-Delivery addresses for retail, or books physician consultations for clinics.'
  },
  {
    num: 4,
    title: 'Simple CRM Integration & WhatsApp Sync',
    desc: 'The complete caller profile, structured audio recording, and qualified deal status are pushed into your CRM with instant WhatsApp alerts.'
  }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <motion.section 
      id="how-it-works" 
      initial="hidden"
      whileInView="visible"
      viewport={defaultSectionViewport}
      variants={sectionContainerVariants}
      className="py-12 sm:py-24 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div variants={staggerItemVariants} className="text-center max-w-3xl mx-auto mb-6 sm:mb-16">
          <SectionHeading eyebrow="How it works" lead="What does the" accent="Voice AI do?" className="mb-5" />
          <p className="text-zinc-300 ios-subtext sm:text-[16px] max-w-2xl mx-auto leading-relaxed">
            Smart Convo takes every customer call conversationally in Urdu and English, picks up instantly, qualifies high-ticket intent, and syncs directly with simple CRM integration.
          </p>
        </motion.div>

        {/* 4-Step Interactive Flow & Phone Mockup */}
        <motion.div variants={staggerItemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">
          
          {/* Left Column: iPhone call demo (lock screen -> call with Monark) */}
          <div className="lg:col-span-5 lg:order-1 flex justify-center">
            <CallDemoPhone />
          </div>

          {/* Right Column: Steps List */}
          <div className="lg:col-span-7 lg:order-2 space-y-2 sm:space-y-4">
            {STEPS.map((step) => {
              const isActive = activeStep === step.num;
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(step.num)}
                  className={`p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border transition-all cursor-pointer backdrop-blur-md ${
                    isActive
                      ? 'bg-zinc-900 border-zinc-650 border-zinc-700 shadow-xl ring-2 ring-[#D4FF00]'
                      : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900/90 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-[11px] sm:text-sm shrink-0 transition-colors ${
                      isActive ? 'bg-[#D4FF00] text-zinc-950 shadow-[0_0_14px_rgba(212,255,0,0.6)]' : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      {step.num}
                    </div>

                    <div>
                      <h3 className={`text-[13.5px] sm:text-base font-bold leading-snug ${isActive ? 'text-white' : 'text-zinc-200'}`}>
                        {step.title}
                      </h3>
                      <p className={`ios-subtext text-zinc-400 mt-1 leading-relaxed ${isActive ? 'block' : 'hidden sm:block'}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </motion.div>

      </div>
    </motion.section>
  );
}
