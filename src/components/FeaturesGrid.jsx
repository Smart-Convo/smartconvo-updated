import SectionHeading from './SectionHeading';
import StackedCards from './StackedCards';
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Building2, ShoppingBag, Stethoscope, Languages, MessageSquare, PhoneForwarded, CheckCircle2 } from 'lucide-react';
import { sectionContainerVariants, staggerItemVariants, staggerCardGridVariants, cardItemVariants, defaultSectionViewport } from '../utils/motionVariants';

const FEATURES = [
  {
    icon: Building2,
    title: 'High-Ticket Real Estate Leads',
    desc: 'Captures buyer budget, society phase, square footage, and locks in private site walk-throughs directly on sales rep calendars.',
    badge: 'Real Estate Developer Grade'
  },
  {
    icon: ShoppingBag,
    title: 'Automated COD Order Verification',
    desc: 'Calls retail buyers within 5 minutes of checkout to verify shipping addresses and confirm Cash-on-Delivery, cutting RTO by up to 40%.',
    badge: 'E-Commerce Logistics'
  },
  {
    icon: Stethoscope,
    title: '24/7 Clinical & Diagnostic Intake',
    desc: 'Books patient consultations, coordinates home lab sample pickups, and answers preparation guidelines with medical precision.',
    badge: 'Healthcare Compliance'
  },
  {
    icon: Languages,
    title: 'Bilingual Urdu & English Fluency',
    desc: 'Speaks and understands Pakistani Urdu, English, and conversational code-switching naturally without robotic delays or awkward pauses.',
    badge: '< 850ms Voice Latency'
  },
  {
    icon: MessageSquare,
    title: 'Simple CRM Integration & WhatsApp Sync',
    desc: 'Transcribes every phone call, extracts key deal variables, and instantly pings your sales closers on WhatsApp with the buyer dossier.',
    badge: 'Full Pipeline Automation'
  },
  {
    icon: PhoneForwarded,
    title: 'After-Hours & Peak-Time Call Coverage',
    desc: 'Rings during a sale, a campaign, or at 2 AM? Smart Convo picks up every call, takes the details, and hands your team a ready follow-up list by morning, with no voicemail and no missed leads.',
    badge: 'Never Misses a Call'
  }
];

function useIsDesktop() {
  const [v, setV] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches);
  useEffect(() => {
    const m = window.matchMedia('(min-width: 1024px)');
    const on = () => setV(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return v;
}

function FeatureCard({ item, idx, total, compact = false }) {
  const Icon = item.icon;
  return (
    <div data-lime className={`group relative h-full overflow-hidden rounded-[22px] sm:rounded-3xl bg-[#0f1013] light:bg-[#fff] border border-white/10 light:border-[#c3ec00] light:ring-1 light:ring-inset light:ring-[#D4FF00]/60 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] light:shadow-[0_24px_50px_-26px_rgba(120,150,0,0.40)] ${compact ? 'p-4 sm:p-8' : 'p-6 xl:p-7'}`}>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.035] light:from-[#D4FF00]/[0.22] to-transparent" />
      <span className="pointer-events-none absolute inset-x-6 top-0 h-[2px] light:h-[3px] bg-gradient-to-r from-transparent via-[#D4FF00]/45 light:via-[#C6F000] to-transparent" />
      <span className="pointer-events-none absolute -top-16 -right-10 w-48 h-48 rounded-full bg-white/[0.04] light:bg-[#D4FF00]/45 blur-[70px]" />
      <div className={`relative ${compact ? 'flex items-start gap-3 sm:gap-6' : 'flex flex-col h-full'}`}>
        <div className={`shrink-0 rounded-2xl bg-white/[0.06] light:bg-[#D4FF00] text-[#D4FF00] light:text-[#1c2600] flex items-center justify-center border border-white/10 light:border-[#b5dc00] ${compact ? 'w-9 h-9 sm:w-14 sm:h-14' : 'w-12 h-12 mb-5'}`}>
          <Icon className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2.5">
            <span className="text-[9.5px] sm:text-[11px] font-semibold tracking-wide text-zinc-300 light:text-[#2a3600] bg-white/[0.06] light:bg-[#f2ffa8] border border-white/10 light:border-[#c3ec00] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">{item.badge}</span>
            <span className="hidden sm:inline text-[11px] text-zinc-600 font-mono">{String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          </div>
          <h3 className={`font-semibold text-white tracking-tight leading-snug ${compact ? 'text-[14.5px] sm:text-[22px]' : 'text-[18px]'}`}>{item.title}</h3>
          <p className={`mt-2 text-zinc-400 leading-relaxed ${compact ? 'text-[12px] sm:text-[15px]' : 'text-[14px]'}`}>{item.desc}</p>
        </div>
      </div>
    </div>
  );
}

/* Desktop: the 3x2 grid gathers into a pile as you scroll, and spreads back out when you scroll up. */
function GridToStack() {
  const trackRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const [offsets, setOffsets] = useState(() => FEATURES.map(() => ({ dx: 0, dy: 0 })));
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    const measure = () => {
      const g = gridRef.current;
      if (!g) return;
      const gx = g.clientWidth / 2;
      const gy = g.clientHeight / 2;
      setOffsets(
        cardRefs.current.map((el) => {
          if (!el) return { dx: 0, dy: 0 };
          return { dx: gx - (el.offsetLeft + el.offsetWidth / 2), dy: gy - (el.offsetTop + el.offsetHeight / 2) };
        })
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (gridRef.current) ro.observe(gridRef.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const raw = useTransform(scrollYProgress, [0.1, 0.8], [0, 1], { clamp: true });
  const p = useSpring(raw, { stiffness: 120, damping: 28, mass: 0.6 });
  const rot = [-4, 3, -2, 3.5, -3, 2];

  return (
    <div ref={trackRef} className="relative" style={{ height: '165svh' }}>
      <div className="sticky" style={{ top: 'calc(var(--stack-top, 96px))' }}>
        <div ref={gridRef} className="grid grid-cols-3 gap-4 xl:gap-5 items-stretch" style={{ minHeight: 'min(640px, calc(100svh - 150px))', alignContent: 'start' }}>
          {FEATURES.map((item, i) => (
            <Pile key={i} i={i} p={p} off={offsets[i]} rot={rot[i]} reduce={reduce} setRef={(el) => (cardRefs.current[i] = el)}>
              <FeatureCard item={item} idx={i} total={FEATURES.length} />
            </Pile>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pile({ i, p, off, rot, reduce, setRef, children }) {
  const x = useTransform(p, (v) => (reduce ? 0 : off.dx * v));
  const y = useTransform(p, (v) => (reduce ? 0 : off.dy * v + (i - 2.5) * 16 * v));
  const rotate = useTransform(p, (v) => (reduce ? 0 : rot * v));
  const scale = useTransform(p, (v) => 1 + 0.08 * v);
  return (
    <motion.div ref={setRef} style={{ x, y, rotate, scale, zIndex: i + 1, willChange: 'transform' }} className="relative">
      {children}
    </motion.div>
  );
}

export default function FeaturesGrid() {
  const desktop = useIsDesktop();
  return (
    <motion.section
      id="verticals"
      initial="hidden"
      whileInView="visible"
      viewport={defaultSectionViewport}
      variants={sectionContainerVariants}
      className="pt-10 pb-6 sm:pt-14 sm:pb-10 bg-transparent"
    >
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${desktop ? 'max-w-6xl' : 'max-w-3xl'}`}>
        <motion.div variants={staggerItemVariants} className="text-center mb-5 sm:mb-8 max-w-3xl mx-auto">
          <SectionHeading eyebrow="What Smart Convo handles" lead="Every situation handled" accent="with enterprise polish, 24/7" className="mb-3 sm:mb-4" />
          <p className="text-zinc-400 text-[12.5px] sm:text-[16.5px] leading-relaxed">
            Smart Convo never rushes a high-ticket caller, never forgets to qualify a buyer budget, speaks fluent Urdu and English, and logs every detail with simple CRM integration without fail.
          </p>
        </motion.div>

        {desktop ? (
          <GridToStack />
        ) : (
          <StackedCards step={12} scaleStep={0.035} dimStep={0.12}>
            {FEATURES.map((item, idx) => (
              <FeatureCard key={idx} item={item} idx={idx} total={FEATURES.length} compact />
            ))}
          </StackedCards>
        )}
      </div>
    </motion.section>
  );
}
