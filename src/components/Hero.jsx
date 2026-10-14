import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, PhoneCall, Sparkles } from 'lucide-react';
import { MonarkLogo } from './ClientLogos';
import LogoImg from './LogoImg';
import IPhone16ProMockup from './IPhone16ProMockup';
import { sectionContainerVariants, staggerItemVariants, heroSectionViewport } from '../utils/motionVariants';

function TrustLogos() {
  return (
    <div className="pt-5 sm:pt-8 border-t border-zinc-800 space-y-5 sm:space-y-7">
      <div className="space-y-2.5 sm:space-y-4">
        <div className="text-[10px] sm:text-[12px] font-medium tracking-[0.2em] text-zinc-500 uppercase">Trusted by partners</div>
        <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-9 gap-y-3 sm:gap-y-5">
          {[
            ['partners/aws-startups-dark', 'AWS Startups', 'h-6 sm:h-10'],
            ['partners/cartesia-dark', 'Cartesia', 'h-4 sm:h-6'],
            ['partners/azure-dark', 'Microsoft Azure', 'h-5 sm:h-9'],
            ['partners/elevenlabs-startups-dark', 'ElevenLabs Startups', 'h-6 sm:h-10'],
          ].map(([f, name, h]) => (
            <LogoImg key={f} src={`/logos/${f}.png`} alt={name} className={`${h} w-auto object-contain`} />
          ))}
        </div>
      </div>

      <div className="space-y-2.5 sm:space-y-4">
        <div className="text-[10px] sm:text-[12px] font-medium tracking-[0.2em] text-zinc-500 uppercase">Our clients</div>
        <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-9 gap-y-3 sm:gap-y-5">
          {[
            ['gp-hospital-full-dark', 'General Practice Hospital', 'h-6 sm:h-10'],
            ['canada-govt-fcm-dark', 'Federation of Canadian Municipalities', 'h-5 sm:h-8'],
          ].map(([f, name, h]) => (
            <LogoImg key={f} src={`/logos/${f}.png`} alt={name} className={`${h} w-auto object-contain`} />
          ))}
          <MonarkLogo className="h-5 sm:h-10" />
        </div>
      </div>
    </div>
  );
}

const MARQUEE_LOGOS = [
  ['partners/aws-startups-dark', 'AWS Startups'],
  ['partners/cartesia-dark', 'Cartesia'],
  ['partners/azure-dark', 'Microsoft Azure'],
  ['partners/elevenlabs-startups-dark', 'ElevenLabs Startups'],
  ['gp-hospital-full-dark', 'General Practice Hospital'],
  ['canada-govt-fcm-dark', 'Federation of Canadian Municipalities'],
];

/* Phones & tablets: one slim auto-scrolling strip instead of two logo blocks */
function LogoMarquee() {
  const items = [...MARQUEE_LOGOS, ['__monark', 'Monark']];
  const row = items.map(([f, name]) =>
    f === '__monark' ? (
      <span key={name} className="shrink-0 mr-9 flex items-center"><MonarkLogo className="h-[18px]" /></span>
    ) : (
      <LogoImg key={f} src={`/logos/${f}.png`} alt={name} className={`shrink-0 mr-9 ${f.includes('cartesia') ? 'h-[14px]' : 'h-[18px]'} w-auto object-contain opacity-90`} />
    )
  );
  return (
    <div className="lg:hidden">
      <div className="text-center text-[10px] font-medium tracking-[0.22em] text-zinc-500 uppercase mb-3">Trusted by teams and partners</div>
      <div className="relative overflow-hidden py-3 border-y border-white/[0.07]" style={{ WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)' }}>
        <div className="flex w-max animate-marquee">{row}{row}</div>
      </div>
    </div>
  );
}

export default function Hero({ onOpenModal, onScrollTo }) {
  return (
    <motion.section 
      id="hero" 
      initial="hidden"
      whileInView="visible"
      viewport={heroSectionViewport}
      variants={sectionContainerVariants}
      className="relative pt-9 pb-10 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20 overflow-x-clip bg-transparent"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] lg:hidden" style={{ background: "radial-gradient(60% 70% at 50% 0%, rgba(212,255,0,0.14) 0%, rgba(212,255,0,0) 70%)" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Hero Column */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-7 space-y-5 sm:space-y-7 text-center lg:text-left">
            {/* Headline */}
            <h1 className="text-[30px] sm:text-6xl lg:text-[54px] xl:text-[68px] font-extrabold tracking-tight text-white leading-[1.08]">
              <span className="block">
                {['Answer', 'every'].map((w, i) => (
                  <motion.span
                    key={w}
                    className="inline-block mr-[0.28em]"
                    initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}
                  </motion.span>
                ))}
                <motion.span
                  className="relative inline-block"
                  initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
                >
                  call
                  <span className="text-accent">.</span>
                  {/* live waveform */}
                  <span aria-hidden="true" className="absolute left-0 right-[0.18em] -bottom-[0.22em] h-[0.34em] flex items-end justify-between">
                    {[0.5, 0.9, 0.4, 1, 0.65, 0.85, 0.45, 0.95, 0.6, 0.8, 0.5].map((h, i) => (
                      <motion.span
                        key={i}
                        className="w-[3px] sm:w-[4.5px] rounded-full bg-[#D4FF00] light:bg-[#6d28d9] origin-bottom"
                        style={{ height: '100%' }}
                        animate={{ scaleY: [h * 0.3, h, h * 0.4, h * 0.9, h * 0.3] }}
                        transition={{ duration: 1.1 + (i % 4) * 0.15, repeat: Infinity, ease: 'easeInOut', delay: 0.9 + i * 0.07 }}
                      />
                    ))}
                  </span>
                </motion.span>
              </span>
              <span className="block mt-1 sm:mt-2">
                {['Qualify', 'every'].map((w, i) => (
                  <motion.span
                    key={w}
                    className="inline-block mr-[0.28em]"
                    initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}
                  </motion.span>
                ))}
                <motion.span
                  className="relative inline-block"
                  initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, delay: 0.74, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="shimmer-lime">lead.</span>
                  <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" className="absolute left-0 -bottom-[0.18em] w-full h-[0.2em] overflow-visible">
                    <motion.path
                      d="M2 9 C 40 2, 90 12, 130 6 S 190 4, 198 7"
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, delay: 1.2, ease: 'easeOut' }}
                    />
                  </svg>
                </motion.span>
              </span>
            </h1>

            {/* Subheading in Apple iOS Subtext Style */}
            <p className="text-zinc-400 sm:text-zinc-300 font-normal max-w-xl mx-auto lg:mx-0 text-[13.5px] sm:text-[17px] leading-[1.6]">
              Smart Convo is the human-grade Voice AI agent for high-ticket businesses in Pakistan. It qualifies buyers, confirms COD orders, books patient appointments, and syncs directly with simple CRM integration.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
              <button
                onClick={() => onScrollTo('how-it-works')}
                className="justify-center px-7 py-3 sm:py-3.5 rounded-full bg-[#D4FF00] hover:bg-[#c6ee00] text-zinc-950 font-bold text-sm flex items-center gap-2.5 shadow-[0_4px_22px_rgba(212,255,0,0.45)] hover:shadow-[0_6px_28px_rgba(212,255,0,0.6)] border border-[#bfe800] transition-all cursor-pointer"
              >
                <span>Hear Voice Demos</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => onScrollTo('calculator')}
                className="text-[12.5px] sm:text-sm text-zinc-400 hover:text-accent underline underline-offset-4 decoration-white/20 sm:no-underline sm:text-center sm:px-6 sm:py-3.5 sm:rounded-full sm:bg-zinc-900/90 sm:hover:bg-zinc-800 sm:text-white sm:font-medium sm:border sm:border-zinc-700/80 sm:shadow-md sm:hover:border-zinc-500 transition-all cursor-pointer"
              >
                Calculate lost revenue
              </button>
            </div>

            <LogoMarquee />
            <div className="hidden lg:block">
              <TrustLogos />
            </div>
          </motion.div>

          {/* Right Hero Column: Authentic iPhone 16 Pro Mockup with iOS 26 Dynamic Island & WhatsApp Voice AI */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-5 relative flex justify-center -mt-1 sm:mt-0">
            <IPhone16ProMockup onOpenModal={onOpenModal} />
          </motion.div>


        </div>

      </div>
    </motion.section>
  );
}
