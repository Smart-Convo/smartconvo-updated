import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MapPin, FileText, Ticket, PhoneIncoming, ArrowRight } from 'lucide-react';

/* A looping 0..n step counter */
function useLoop(steps, ms) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % steps), ms);
    return () => clearInterval(t);
  }, [steps, ms]);
  return i;
}

const Shell = ({ n, title, text, foot, children }) => (
  <div className="group relative overflow-hidden rounded-[22px] sm:rounded-3xl border border-white/10 bg-panel p-4 sm:p-6 flex flex-col shadow-[0_24px_60px_-34px_rgba(0,0,0,0.9)] light:shadow-[0_24px_60px_-34px_rgba(60,30,120,0.28)] hover:-translate-y-1 hover:border-[#D4FF00]/40 transition-all duration-300">
    <span className="pointer-events-none absolute -top-20 -right-16 w-52 h-52 rounded-full bg-white/[0.04] light:bg-[#7c3aed]/10 blur-[70px] group-hover:bg-[#D4FF00]/15 transition-colors" />
    <div className="relative flex items-center gap-2 mb-3 sm:mb-4">
      <span className="text-[11px] font-mono text-zinc-500">0{n}</span>
      <span className="h-px flex-1 bg-white/10" />
      <span className="text-[10.5px] sm:text-[11px] font-medium text-zinc-400">{foot}</span>
    </div>
    {/* live visual */}
    <div className="relative rounded-2xl border border-white/10 bg-panel-2 p-3 sm:p-4 h-[214px] sm:h-[226px] overflow-hidden">{children}</div>
    <h3 className="relative mt-4 sm:mt-5 text-[15.5px] sm:text-[19px] font-semibold tracking-tight text-white">{title}</h3>
    <p className="relative mt-1.5 text-[12px] sm:text-[13.5px] leading-relaxed text-zinc-400">{text}</p>
  </div>
);

/* 1. CRM sync: call ends -> lead record fills in field by field */
function CrmVisual() {
  const step = useLoop(7, 900);
  const rows = [
    ['Name', 'Tariq Mehmood'],
    ['Budget', 'PKR 80–90M'],
    ['Phase', 'DHA Phase 8'],
    ['Visit', 'Sat · 4:00 PM'],
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-medium text-zinc-300">New lead</span>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors ${step >= 5 ? 'bg-[#D4FF00] text-zinc-950' : 'bg-white/[0.07] text-zinc-400'}`}>
          {step >= 5 ? 'Synced to CRM' : 'Call ended'}
        </span>
      </div>
      <div className="space-y-1 flex-1">
        {rows.map(([k, v], i) => {
          const on = step > i;
          return (
            <div key={k} className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-2.5 py-1 sm:py-1.5">
              <span className="w-12 text-[10px] text-zinc-500">{k}</span>
              <span className="flex-1 text-[11.5px] sm:text-[12.5px] font-medium text-white min-h-[16px]">
                <AnimatePresence mode="wait">
                  {on && (
                    <motion.span key={v} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                      {v}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <Check className={`w-3.5 h-3.5 transition-opacity ${on ? 'opacity-100 text-[#D4FF00] light:text-accent' : 'opacity-0'}`} strokeWidth={3} />
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 flex items-center gap-1.5">
        {['HubSpot', 'Zoho', 'Salesforce'].map((c) => (
          <span key={c} className="text-[9.5px] font-medium text-zinc-400 border border-white/10 rounded-full px-2 py-0.5">{c}</span>
        ))}
      </div>
    </div>
  );
}

/* 2. WhatsApp: messages arrive right after the call */
function WhatsAppVisual() {
  const step = useLoop(8, 1000);
  const items = [
    { icon: MapPin, t: 'Site visit location', s: 'DHA Phase 8 · Sat 4:00 PM' },
    { icon: FileText, t: 'Project brochure.pdf', s: '2.4 MB' },
    { icon: Ticket, t: 'Appointment token #A-118', s: 'Show at reception' },
  ];
  return (
    <div className="h-full flex flex-col gap-1.5">
      <div className="flex items-center gap-2 pb-2 border-b border-white/10">
        <span className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-[10px] font-bold text-[#fff]">SC</span>
        <span className="leading-tight">
          <span className="block text-[11.5px] font-semibold text-white">Smart Convo</span>
          <span className="block text-[9.5px] text-zinc-500">Business account · just now</span>
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-end gap-1.5">
      <AnimatePresence>
        {items.map((it, i) => step > i && (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="flex items-center gap-2.5 rounded-xl rounded-bl-sm bg-[#DCF8C6] text-[#111B21] px-2.5 py-2 w-[88%] shadow-sm"
          >
            <span className="w-7 h-7 rounded-lg bg-[#fff]/70 flex items-center justify-center shrink-0"><it.icon className="w-3.5 h-3.5 text-[#075E54]" strokeWidth={2.2} /></span>
            <span className="leading-tight min-w-0">
              <span className="block text-[11.5px] sm:text-[12.5px] font-semibold truncate">{it.t}</span>
              <span className="block text-[10px] text-[#54656F] truncate">{it.s}</span>
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" /> WhatsApp Cloud API · official green tick
      </div>
    </div>
  );
}

/* 3. Phones: your number forwards to Smart Convo */
function PhoneVisual() {
  const step = useLoop(4, 1100);
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 pt-1">
        <div className="rounded-xl bg-white/[0.05] border border-white/10 px-2.5 py-2 text-center">
          <PhoneIncoming className="w-4 h-4 mx-auto text-zinc-300" />
          <div className="mt-1 text-[11px] sm:text-[12.5px] font-semibold text-white tabular-nums">042 111 000</div>
          <div className="text-[9.5px] text-zinc-500">Your number</div>
        </div>
        {/* travelling dots */}
        <div className="relative w-10 sm:w-16 h-6">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/15" />
          {[0, 1, 2].map((d) => (
            <motion.span
              key={d}
              className="absolute top-1/2 -mt-[3px] w-1.5 h-1.5 rounded-full bg-[#D4FF00] light:bg-accent"
              animate={{ left: ['0%', '92%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: d * 0.5, ease: 'linear' }}
            />
          ))}
        </div>
        <div className="rounded-xl bg-[#D4FF00]/12 border border-[#D4FF00]/35 px-2.5 py-2 text-center">
          <div className="mx-auto w-5 h-5 rounded-full bg-[#D4FF00] text-zinc-950 flex items-center justify-center"><ArrowRight className="w-3 h-3" strokeWidth={3} /></div>
          <div className="mt-1 text-[11px] sm:text-[12.5px] font-semibold text-white">Smart Convo</div>
          <div className="text-[9.5px] text-zinc-500">Answers in &lt;1 ring</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {['042 / 021 / 051', '0300 mobile', 'UAN 111'].map((t, i) => (
          <span key={t} className={`text-center text-[9.5px] sm:text-[10.5px] font-medium rounded-full border px-1 py-1 transition-colors duration-300 ${step % 3 === i ? 'border-[#D4FF00]/50 bg-[#D4FF00]/12 text-white' : 'border-white/10 text-zinc-400'}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function IntegrationCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
      <Shell n={1} foot="CRM sync" title="Every call becomes a CRM lead" text="Budget, location and visit time are captured and pushed to Ginko, GTEC, Zoho, Salesforce or HubSpot, with no manual entry.">
        <CrmVisual />
      </Shell>
      <Shell n={2} foot="WhatsApp" title="WhatsApp follow-up, instantly" text="Right after the call, the customer gets a location pin, brochure or appointment token on WhatsApp.">
        <WhatsAppVisual />
      </Shell>
      <Shell n={3} foot="Telephony" title="Keep your existing numbers" text="PTCL landlines, 0300 numbers or UAN 111 helplines forward to Smart Convo. No new hardware.">
        <PhoneVisual />
      </Shell>
    </div>
  );
}
