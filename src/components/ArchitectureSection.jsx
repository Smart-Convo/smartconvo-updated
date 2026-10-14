import React from 'react';
import { motion } from 'framer-motion';
import { Network, Database, Cpu, PhoneIncoming, Zap, Check } from 'lucide-react';
import { sectionContainerVariants, staggerItemVariants, staggerCardGridVariants, cardItemVariants, defaultSectionViewport } from '../utils/motionVariants';

export default function ArchitectureSection({ onOpenModal }) {
  const PIPELINE_STEPS = [
    {
      step: '01',
      name: 'Telephony Ingestion',
      time: '35 ms',
      detail: 'PTCL, Jazz, Zong SIP trunk interception. Inbound rings answered on 1st tone.'
    },
    {
      step: '02',
      name: 'Bilingual ASR & Dialect',
      time: '280 ms',
      detail: 'Specialized deep learning model trained on Pakistani Urdu accents and colloquialisms.'
    },
    {
      step: '03',
      name: 'LLM Intent & Business Rules',
      time: '340 ms',
      detail: 'Qualifies lead budget, appointment time, or order address with zero hallucination.'
    },
    {
      step: '04',
      name: 'Neural Voice TTS',
      time: '220 ms',
      detail: 'Ultra-low latency streaming voice with natural breath pauses and human inflection.'
    },
    {
      step: '05',
      name: 'Simple CRM Webhook Sync',
      time: '60 ms',
      detail: 'Lead status, full call transcript, audio recording, and booked slots injected instantly.'
    }
  ];

  return (
    <motion.section 
      id="architecture" 
      initial="hidden"
      whileInView="visible"
      viewport={defaultSectionViewport}
      variants={sectionContainerVariants}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <div className="rounded-3xl p-8 sm:p-12 bg-black/40 backdrop-blur-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#CCFF00]/5 blur-[100px] pointer-events-none" />

        <motion.div variants={staggerItemVariants} className="max-w-2xl mb-12">
          <div className="text-xs font-mono text-[#CCFF00] tracking-wider uppercase mb-2">
            TELEPHONY STACK & PIPELINE
          </div>
          <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
            How Smart Convo Achieves <span className="font-bold">&lt;940ms Latency</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
            Human conversations break when latency exceeds 1,200ms. We re-engineered the entire stack from telecom gateway to CRM webhooks to deliver zero awkward pauses.
          </p>
        </motion.div>

        {/* Horizontal Pipeline Grid */}
        <motion.div variants={staggerCardGridVariants} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {PIPELINE_STEPS.map((step) => (
            <motion.div
              key={step.step}
              variants={cardItemVariants}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
                  <span>STEP {step.step}</span>
                  <span className="text-[#CCFF00] font-bold">{step.time}</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-2">{step.name}</h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">{step.detail}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom banner */}
        <motion.div variants={staggerItemVariants} className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
            <span>Simple CRM integration: Ginko, GTEC, Zoho, HubSpot, Salesforce, and custom REST API webhooks pre-configured.</span>
          </div>
          <button
            type="button"
            onClick={onOpenModal}
            className="text-white hover:text-[#CCFF00] font-semibold underline underline-offset-4 cursor-pointer"
          >
            Review enterprise SLA & documentation &rarr;
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
