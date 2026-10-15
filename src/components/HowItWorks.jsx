import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useMotionValueEvent, useSpring, useReducedMotion } from 'framer-motion';
import { useLiveProgress } from '../lib/useLiveProgress';
import { PhoneIncoming, Zap, ClipboardCheck, Database } from 'lucide-react';
import SectionHeading from './SectionHeading';
import CallDemoPhone from './CallDemoPhone';
import { sectionContainerVariants, staggerItemVariants, defaultSectionViewport } from '../utils/motionVariants';

const STEPS = [
  { num: 1, title: 'Customer dials your number', desc: 'Callers ring your regular UAN helpline, PTCL direct line, or local mobile number. No expensive hardware or SIP migration needed.' },
  { num: 2, title: 'Smart Convo answers in under 850 ms', desc: 'Picks up on the first ring in natural, conversational bilingual Urdu or English, with zero hold music.' },
  { num: 3, title: 'Intent and details captured', desc: 'Qualifies buyer budget and timeline for real estate, verifies Cash-on-Delivery addresses for retail, or books physician consultations for clinics.' },
  { num: 4, title: 'CRM and WhatsApp, in sync', desc: 'The complete caller profile, call summary and qualified deal status are pushed into your CRM with instant WhatsApp alerts.' },
];

function useViewport() {
  const get = () => (typeof window === 'undefined' ? { w: 1280, h: 800 } : { w: window.innerWidth, h: window.innerHeight });
  const [v, setV] = useState(get);
  useEffect(() => {
    const on = () => setV(get());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return v;
}

/* One line of the drum. `idx` is the (fractional) index currently at the centre. */
function DrumItem({ step, i, idx, phone }) {
  const d = useTransform(idx, (v) => i - v);
  const y = useTransform(d, (v) => v * (phone ? 104 : 150));
  const rotateX = useTransform(d, (v) => Math.max(-78, Math.min(78, v * -52)));
  const scale = useTransform(d, (v) => 1 - Math.min(Math.abs(v), 2) * 0.13);
  const opacity = useTransform(d, (v) => Math.max(0, 1 - Math.abs(v) * 0.66));
  const filter = useTransform(d, (v) => `blur(${Math.min(Math.abs(v), 2) * 3.2}px)`);
  const descOpacity = useTransform(d, (v) => Math.max(0, 1 - Math.abs(v) * 2.6));
  const descY = useTransform(d, (v) => Math.max(-8, Math.min(8, v * 14)));
  const zIndex = useTransform(d, (v) => 20 - Math.round(Math.abs(v) * 4));

  return (
    <div className="absolute inset-0 flex items-center pointer-events-none" style={{ perspective: 1100 }}>
      <motion.div style={{ y, rotateX, scale, opacity, filter, zIndex, transformOrigin: '50% 50%', willChange: 'transform' }} className="w-full">
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 sm:gap-x-8">
          <span
            className="select-none font-semibold leading-none tracking-[-0.06em] text-[72px] sm:text-[140px] lg:text-[170px]"
            style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--color-accent)', opacity: 0.9 }}
          >
            0{step.num}
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-white tracking-[-0.03em] leading-[1.05] text-[25px] sm:text-[40px] lg:text-[46px]">{step.title}</h3>
            <motion.p style={{ opacity: descOpacity, y: descY }} className="mt-2 sm:mt-4 text-[13.5px] sm:text-[17px] leading-relaxed text-zinc-400 max-w-lg">
              {step.desc}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Scroll-driven 3D "text drum": lines roll like a rotating cylinder, stacking up behind the active one. */
function Drum({ idx, progress, phone, onJump, active, vh }) {
  return (
    <div className="relative w-full" style={{ height: phone ? Math.max(300, Math.min(420, vh - 230)) : Math.max(340, Math.min(480, vh - 220)) }}>
      {/* soft spotlight on the centre line */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[46%] border-y border-white/10" style={{ background: 'linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent 70%)' }} />
      {STEPS.map((s, i) => (
        <DrumItem key={s.num} step={s} i={i} idx={idx} phone={phone} />
      ))}
      {/* progress rail */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col items-center justify-between py-3">
        <span className="absolute top-3 bottom-3 w-px bg-white/15" />
        <motion.span className="absolute top-3 bottom-3 w-px origin-top bg-accent" style={{ scaleY: progress }} />
        {STEPS.map((s, i) => (
          <button
            key={s.num}
            onClick={() => onJump(i)}
            aria-label={`Step ${s.num}`}
            className="relative z-10 w-3 h-3 rounded-full border-2 transition-colors cursor-pointer"
            style={{ background: active >= i ? 'var(--color-accent)' : 'var(--color-page)', borderColor: active >= i ? 'var(--color-accent)' : 'rgba(150,150,160,0.5)' }}
          />
        ))}
      </div>
      <div className="absolute left-0 -top-1 text-[11px] sm:text-[12px] font-mono tracking-[0.2em] text-zinc-500">
        {String(active + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
      </div>
    </div>
  );
}

function Tracker({ active }) {
  const icons = [PhoneIncoming, Zap, ClipboardCheck, Database];
  return (
    <div className="mt-8 flex items-center justify-between px-1">
      {icons.map((Icon, i) => (
        <React.Fragment key={i}>
          <span
            className="w-11 h-11 rounded-2xl border flex items-center justify-center transition-all duration-300"
            style={{
              background: active >= i ? 'var(--color-accent)' : 'transparent',
              borderColor: active >= i ? 'var(--color-accent)' : 'rgba(150,150,160,0.4)',
              color: active >= i ? 'var(--color-page)' : 'var(--color-zinc-400)',
              transform: active === i ? 'scale(1.12)' : 'scale(1)',
            }}
          >
            <Icon className="w-5 h-5" strokeWidth={2} />
          </span>
          {i < icons.length - 1 && <span className="flex-1 h-px mx-2" style={{ background: active > i ? 'var(--color-accent)' : 'rgba(150,150,160,0.35)' }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function HowItWorks() {
  const reduce = useReducedMotion();
  const { w, h } = useViewport();
  const desktop = w >= 1024;
  const phone = w < 640;
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const scrollYProgress = useLiveProgress(trackRef, reduce ? 'r' : desktop ? 'd' : phone ? 'p' : 't');
  const raw = useTransform(scrollYProgress, [0.06, 0.94], [0, STEPS.length - 1], { clamp: true });
  const idx = useSpring(raw, { stiffness: 140, damping: 26, mass: 0.5 });
  const progress = useTransform(scrollYProgress, [0.06, 0.94], [0, 1], { clamp: true });
  useMotionValueEvent(idx, 'change', (v) => setActive(Math.max(0, Math.min(STEPS.length - 1, Math.round(v)))));

  const jump = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const f = 0.06 + (i / (STEPS.length - 1)) * 0.88;
    window.scrollTo({ top: top + total * f, behavior: 'smooth' });
  };

  const phoneZoom = Math.min(1, Math.max(0.6, (h - 120) / 700));

  return (
    <motion.section
      id="how-it-works"
      initial="hidden"
      whileInView="visible"
      viewport={defaultSectionViewport}
      variants={sectionContainerVariants}
      className="pt-12 sm:pt-24 pb-4 sm:pb-10 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={staggerItemVariants} className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
          <SectionHeading eyebrow="How it works" lead="What does the" accent="Voice AI do?" className="mb-5" />
          <p className="text-zinc-300 ios-subtext sm:text-[16px] max-w-2xl mx-auto leading-relaxed">
            Smart Convo takes every customer call conversationally in Urdu and English, picks up instantly, qualifies high-ticket intent, and syncs directly with simple CRM integration.
          </p>
        </motion.div>

        {reduce ? (
          /* reduced motion: plain list */
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center"><CallDemoPhone /></div>
            <ol className="lg:col-span-7 space-y-6">
              {STEPS.map((s) => (
                <li key={s.num} className="border-t border-white/10 pt-4">
                  <div className="text-[12px] font-mono text-zinc-500">0{s.num}</div>
                  <h3 className="mt-1 text-[22px] sm:text-[30px] font-semibold tracking-tight text-white">{s.title}</h3>
                  <p className="mt-2 text-[14px] sm:text-[16px] text-zinc-400">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        ) : desktop ? (
          <div ref={trackRef} className="relative" style={{ height: Math.round(h * 3.2) }}>
            <div className="sticky grid grid-cols-12 gap-10 items-center" style={{ top: 90, height: Math.max(560, h - 110) }}>
              <div className="col-span-5 flex justify-center">
                <div style={{ zoom: phoneZoom }}><CallDemoPhone /></div>
              </div>
              <div className="col-span-7 pl-4 pr-8">
                <Drum idx={idx} progress={progress} phone={false} onJump={jump} active={active} vh={h} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4"><CallDemoPhone /></div>
            <div ref={trackRef} className="relative" style={{ height: Math.round(h * (phone ? 2.5 : 2.8)) }}>
              <div className="sticky flex flex-col justify-center" style={{ top: phone ? 84 : 96, height: Math.max(440, h - 168) }}>
                <div className="pr-6">
                  <Drum idx={idx} progress={progress} phone={phone} onJump={jump} active={active} vh={h} />
                </div>
                <div className="pr-6"><Tracker active={active} /></div>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.section>
  );
}
