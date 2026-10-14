import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, ShoppingBag, PlusCircle, ArrowUpRight, Zap, CheckCircle2, PhoneCall, Volume2 } from 'lucide-react';
import { sectionContainerVariants, staggerItemVariants, staggerCardGridVariants, cardItemVariants, defaultSectionViewport } from '../utils/motionVariants';

const VERTICAL_CARDS = [
  {
    id: 'property',
    category: 'Real Estate & Developers',
    title: 'Speed-to-Lead Automation',
    copy: 'We call every Meta Ad lead within 5 seconds of form submission. Stop letting 40% of your real estate leads decay because your human sales team is too busy.',
    metric: '< 5 sec response',
    badge: '40% Lead Rescue',
    icon: Building2,
    gradient: 'from-blue-500/10 via-transparent to-transparent',
    accentColor: '#CCFF00',
    demoScript: 'AI: "Assalam-o-Alaikum Hamza! I saw you requested details on DHA Phase 9 Prism 1-Kanal plots. Are you looking for investment or self-construction?"',
    mockSvgIcon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12 text-[#CCFF00]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 56V18L32 8L52 18V56" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 24H26M38 24H42M22 34H26M38 34H42M22 44H26M38 44H42" strokeLinecap="round" />
        <path d="M28 56V46H36V56" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'retail',
    category: 'Retail & D2C Brands',
    title: 'Kill The RTO Penalty',
    copy: 'We call 100% of your COD customers within minutes to confirm addresses. Reduce fake orders and slash your logistics Return-to-Origin waste.',
    metric: '-32% Courier Returns',
    badge: '100% COD Audit',
    icon: ShoppingBag,
    gradient: 'from-amber-500/10 via-transparent to-transparent',
    accentColor: '#CCFF00',
    demoScript: 'AI: "Hi Ayesha! Calling from Sapphire. We received your order for the Embroidered Kurti (PKR 8,900) to Gulberg III, Lahore. Can you confirm dispatch?"',
    mockSvgIcon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12 text-[#CCFF00]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 20H48L52 54H12L16 20Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 24V14C24 9.58 27.58 6 32 6C36.42 6 40 9.58 40 14V24" strokeLinecap="round" />
        <circle cx="32" cy="36" r="4" fill="#CCFF00" fillOpacity="0.2" />
      </svg>
    )
  },
  {
    id: 'healthcare',
    category: 'Clinics & Specialists',
    title: 'Zero Empty Chairs',
    copy: 'We call patients 24 hours before their treatment to verbally confirm. If they cancel, the AI instantly dials your waitlist to fill the 25k PKR slot.',
    metric: '98.4% Fill Rate',
    badge: '25k PKR Protected',
    icon: PlusCircle,
    gradient: 'from-emerald-500/10 via-transparent to-transparent',
    accentColor: '#CCFF00',
    demoScript: 'AI: "Dr. Farooq\'s Clinic reminder: Your Root Canal session is set for tomorrow at 4:30 PM. Reply 1 to confirm, or 2 to reschedule instantly."',
    mockSvgIcon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12 text-[#CCFF00]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="32" cy="32" r="24" strokeLinecap="round" />
        <path d="M32 20V44M20 32H44" strokeLinecap="round" strokeWidth="2.5" />
      </svg>
    )
  }
];

export default function BentoGrid({ onOpenModal }) {
  const [activeDemo, setActiveDemo] = useState(null);

  return (
    <motion.section 
      id="solutions" 
      initial="hidden"
      whileInView="visible"
      viewport={defaultSectionViewport}
      variants={sectionContainerVariants}
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
    >
      <motion.div variants={staggerItemVariants} className="text-center mb-16">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-4 text-xs font-semibold tracking-wider text-zinc-300"
        >
          <Zap className="w-3.5 h-3.5 text-[#CCFF00]" />
          <span>MISSION-CRITICAL INDUSTRY VERTICALS</span>
        </div>

        <h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-tight text-white mb-4"
        >
          Engineered For <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">High-Ticket Transactions</span>
        </h2>
        <p
          className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg font-light"
        >
          Generic chatbots fail when real money is on the line. Smart Convo deploys specialized Pakistani Urdu & English conversational models tuned for your precise unit economics.
        </p>
      </motion.div>

      {/* The Bento Box 3-Column Layout */}
      <motion.div variants={staggerCardGridVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {VERTICAL_CARDS.map((card) => {
          const Icon = card.icon;
          const isAudioActive = activeDemo === card.id;

          return (
            <motion.div
              key={card.id}
              variants={cardItemVariants}
              whileHover={{ 
                y: -6,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className="relative group rounded-3xl p-7 sm:p-8 bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle top glossy gradient reflection */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

              <div>
                {/* Header Row: Visual Icon & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="relative w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 backdrop-blur-xl group-hover:border-[#CCFF00]/40 transition-colors">
                    {/* SVG Graphic with alt tag metadata specified in prompt */}
                    <div className="relative z-10">
                      {card.mockSvgIcon}
                    </div>
                    {/* Hidden/Decorative image tag storing the exact prompt metadata requested */}
                    <img
                      src={`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>`}
                      alt="Minimalist 3D icon, deep matte black and frosted glass, neon yellow accent, high-end industrial design, Apple style."
                      className="hidden"
                      aria-hidden="true"
                    />
                  </div>

                  <span className="text-[11px] font-mono font-semibold tracking-wider px-3 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                    {card.badge}
                  </span>
                </div>

                {/* Subtitle & Title */}
                <div className="text-xs font-mono tracking-widest text-[#CCFF00] uppercase mb-1">
                  {card.category}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3 group-hover:text-[#CCFF00] transition-colors duration-300">
                  {card.title}
                </h3>

                {/* Copy */}
                <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                  {card.copy}
                </p>
              </div>

              {/* Interactive Audio Simulation Pill */}
              <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
                <div className="p-3.5 rounded-2xl bg-black/60 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveDemo(isAudioActive ? null : card.id)}
                      className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isAudioActive ? 'bg-[#CCFF00] text-black' : 'bg-white/10 text-white'}`}>
                        {isAudioActive ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <PhoneCall className="w-3 h-3" />}
                      </div>
                      <span className="font-medium">{isAudioActive ? 'Simulating Call...' : 'Sample Dialogue'}</span>
                    </button>
                    <span className="text-[10px] font-mono text-zinc-500">{card.metric}</span>
                  </div>

                  <div className="text-[11px] font-mono text-zinc-400 italic bg-white/[0.02] p-2 rounded-lg border border-white/5 leading-normal">
                    {card.demoScript}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenModal && onOpenModal({ industry: card.category })}
                  className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#CCFF00] text-zinc-300 hover:text-black font-semibold text-xs tracking-wide transition-all duration-300 group/btn"
                >
                  <span>Deploy for {card.category.split(' ')[0]}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
