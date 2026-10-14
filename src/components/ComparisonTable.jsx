import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { sectionContainerVariants, staggerItemVariants, defaultSectionViewport } from '../utils/motionVariants';
import { SmartConvoMark } from './SmartConvoLogo';

const OPTIONS = [
  { id: 'callCenter', label: 'Call centers' },
  { id: 'chatbots', label: 'Chatbots' },
  { id: 'usTools', label: 'US voice tools' },
];

const ROWS = [
  { feature: 'Urdu & English fluency', smartConvo: 'Native, code-switching', callCenter: 'Depends on the agent', chatbots: 'Text only', usTools: 'English only' },
  { feature: 'Response time', smartConvo: 'Under 850 ms', callCenter: '15–45 sec ring wait', chatbots: 'Not a voice channel', usTools: '2,200 ms+ server delay' },
  { feature: 'Pakistani numbers (UAN / PTCL)', smartConvo: true, callCenter: true, chatbots: false, usTools: 'US numbers only' },
  { feature: 'CRM & WhatsApp sync', smartConvo: 'Automatic, every call', callCenter: 'Manual data entry', chatbots: 'Limited', usTools: 'Needs custom code' },
  { feature: 'Handling busy periods', smartConvo: 'Answers every call at once', callCenter: 'Callers wait on hold', chatbots: 'Chats pile up', usTools: 'Rate limited' },
  { feature: 'Accuracy & price guardrails', smartConvo: true, callCenter: 'Prone to human error', chatbots: 'Rigid scripts', usTools: 'Prompt-injection risk' },
  { feature: 'Cost', smartConvo: 'Up to 70% lower', callCenter: 'Salaries & overhead', chatbots: 'Cheap, low conversion', usTools: 'Per-minute USD billing' },
  { feature: 'Time to go live', smartConvo: 'Same day', callCenter: '4–6 weeks of training', chatbots: '2–3 weeks of flow setup', usTools: 'Developer setup' },
  { feature: 'Nights & weekends', smartConvo: '24/7/365', callCenter: 'Costly night shifts', chatbots: '24/7, text only', usTools: '24/7' },
];

function Value({ v, strong = false }) {
  if (v === true) {
    return (
      <span className={`inline-flex items-center gap-2 ${strong ? 'text-white' : 'text-zinc-400'}`}>
        <Check className={`w-[18px] h-[18px] ${strong ? 'text-accent' : 'text-zinc-500'}`} strokeWidth={2.5} />
        Yes
      </span>
    );
  }
  if (v === false) {
    return (
      <span className="inline-flex items-center gap-2 text-zinc-500">
        <X className="w-[18px] h-[18px] text-zinc-600" strokeWidth={2.5} />
        No
      </span>
    );
  }
  return <span>{v}</span>;
}

export default function ComparisonTable() {
  const [active, setActive] = useState('callCenter');
  const [showAll, setShowAll] = useState(false);
  const activeLabel = OPTIONS.find((o) => o.id === active).label;

  return (
    <motion.section
      id="comparison"
      initial="hidden"
      whileInView="visible"
      viewport={defaultSectionViewport}
      variants={sectionContainerVariants}
      className="py-16 sm:py-28 bg-transparent"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div variants={staggerItemVariants} className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-[10.5px] sm:text-[12px] font-medium tracking-[0.22em] text-zinc-500 uppercase mb-3 sm:mb-5">Compare</div>
          <h2 className="text-[25px] sm:text-5xl lg:text-[56px] font-semibold tracking-[-0.03em] leading-[1.08] text-white">
            Built different from<br />
            <span className="bg-gradient-to-r from-[#D4FF00] to-accent-2 light:from-[#5b21b6] light:to-[#8b5cf6] bg-clip-text text-transparent">everything else.</span>
          </h2>
          <p className="mt-3 sm:mt-5 text-zinc-400 text-[13px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
            See how Smart Convo stacks up against the alternatives. Pick one to compare.
          </p>
        </motion.div>

        {/* Segmented control */}
        <motion.div variants={staggerItemVariants} className="flex justify-center mb-10">
          <div className="relative inline-flex p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            {OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => setActive(o.id)}
                className={`relative z-10 px-4 sm:px-6 py-2.5 rounded-full text-[13.5px] sm:text-[14px] font-medium transition-colors cursor-pointer ${
                  active === o.id ? 'text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {active === o.id && (
                  <motion.span
                    layoutId="compare-pill"
                    className="absolute inset-0 rounded-full bg-white light:bg-[#D4FF00]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                {o.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Comparison */}
        <motion.div variants={staggerItemVariants} className="relative hidden sm:block">
          {/* Smart Convo glowing column */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 sm:w-[31.7%] rounded-[28px] bg-gradient-to-b from-[#D4FF00]/[0.10] via-white/[0.035] light:via-[#fff]/70 to-transparent border border-accent/25 shadow-[0_0_90px_-20px_rgba(212,255,0,0.35)]" />

          {/* Column headers */}
          <div className="relative grid grid-cols-2 sm:grid-cols-[1.15fr_1fr_1fr] items-center">
            <div className="hidden sm:block" />
            <div className="px-5 sm:px-8 py-6">
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="block text-[15px] sm:text-[16px] font-medium text-zinc-400"
                >
                  {activeLabel}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="px-5 sm:px-8 py-6 flex items-center gap-2.5">
              <SmartConvoMark size={30} />
              <span className="text-[15px] sm:text-[16px] font-semibold text-white tracking-tight">Smart Convo</span>
            </div>
          </div>

          {/* Rows */}
          <div className="relative">
            {ROWS.map((row, i) => (
              <div
                key={row.feature}
                className="group grid grid-cols-2 sm:grid-cols-[1.15fr_1fr_1fr] items-center border-t border-white/[0.07]"
              >
                <div className="col-span-2 sm:col-span-1 px-5 sm:px-8 pt-5 sm:py-6 text-[14px] sm:text-[16px] font-medium text-zinc-200 group-hover:text-white transition-colors">
                  {row.feature}
                </div>
                <div className="px-5 sm:px-8 py-4 sm:py-6 text-[14px] sm:text-[15px] leading-snug text-zinc-500">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18, delay: i * 0.015 }}
                    >
                      <Value v={row[active]} />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="px-5 sm:px-8 py-4 sm:py-6 text-[14px] sm:text-[15px] leading-snug font-medium text-white">
                  <span className="inline-flex items-center gap-2">
                    {row.smartConvo === true ? (
                      <Value v={true} strong />
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] shadow-[0_0_8px_#D4FF00] shrink-0" />
                        {row.smartConvo}
                      </>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Phone layout: one card per feature */}
        <motion.div variants={staggerItemVariants} className="sm:hidden space-y-2.5">
          {(showAll ? ROWS : ROWS.slice(0, 5)).map((row) => (
            <div key={row.feature} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="text-[12px] font-medium text-zinc-200 mb-2">{row.feature}</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-white/[0.04] px-2.5 py-2 min-w-0">
                  <div className="text-[9px] uppercase tracking-[0.14em] text-zinc-500 mb-0.5">{activeLabel}</div>
                  <div className="text-[11.5px] leading-snug text-zinc-400">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div key={active} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }}>
                        <Value v={row[active]} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="rounded-lg bg-[#D4FF00]/[0.10] border border-accent/30 px-2.5 py-2 min-w-0">
                  <div className="text-[9px] uppercase tracking-[0.14em] text-accent mb-0.5">Smart Convo</div>
                  <div className="text-[11.5px] leading-snug font-medium text-white">
                    <Value v={row.smartConvo} strong />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => setShowAll((v) => !v)}
            className="w-full h-10 rounded-full border border-white/12 text-[12.5px] font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            {showAll ? 'Show less' : `Show all ${ROWS.length} comparisons`}
          </button>
        </motion.div>

      </div>
    </motion.section>
  );
}
