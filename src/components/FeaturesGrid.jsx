import SectionHeading from './SectionHeading';
import StackedCards from './StackedCards';
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { sectionContainerVariants, staggerItemVariants, staggerCardGridVariants, cardItemVariants, defaultSectionViewport } from '../utils/motionVariants';

const FEATURES = [
  {
    label: 'Real estate',
    title: 'High-ticket real estate leads',
    desc: 'Captures buyer budget, society phase and square footage, then books private site visits straight into your sales reps\' calendars.',
    spec: [['Budget', 'PKR 80–90M'], ['Location', 'DHA Phase 8'], ['Site visit', 'Sat, 4:00 PM']],
  },
  {
    label: 'E-commerce',
    title: 'Automated COD order verification',
    desc: 'Calls buyers within minutes of checkout to verify the address and confirm Cash-on-Delivery, cutting returns before they ship.',
    spec: [['Order', '#4821'], ['Address', 'Verified'], ['Confirmed in', '0:41']],
  },
  {
    label: 'Healthcare',
    title: '24/7 clinical and diagnostic intake',
    desc: 'Books consultations, coordinates home lab pickups and answers preparation questions, day or night.',
    spec: [['Doctor', 'Dr. Umer Aziz'], ['Department', 'Cardiology'], ['Booked', 'Thu, 4:00 PM']],
  },
  {
    label: 'Language',
    title: 'Bilingual Urdu and English, naturally',
    desc: 'Understands Pakistani Urdu, English and the way people switch between them mid-sentence, without awkward pauses.',
    spec: [['Caller speaks', 'Roman Urdu'], ['Agent replies', 'Urdu + English'], ['Response time', 'Under 850 ms']],
  },
  {
    label: 'Sync',
    title: 'CRM and WhatsApp, in sync',
    desc: 'Transcribes every call, pulls out the deal details and pings your closers on WhatsApp with the full buyer summary.',
    spec: [['CRM', 'Lead created'], ['WhatsApp', 'Summary sent'], ['Owner', 'Notified']],
  },
  {
    label: 'Coverage',
    title: 'After-hours and peak-time cover',
    desc: 'A sale, a campaign or 2 AM. Every call is answered and your team starts the morning with a follow-up list.',
    spec: [['Time', '02:14 AM'], ['Call', 'Answered'], ['Follow-up', 'Ready by 9 AM']],
  },
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
  return (
    <div
      className={`group relative h-full flex flex-col overflow-hidden border border-white/10 bg-panel hover:border-white/25 transition-colors duration-300 ${compact ? 'rounded-[20px] p-5' : 'rounded-[24px] p-6 xl:p-7'}`}
      style={{ fontFamily: '"Bricolage Grotesque", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
    >
      {/* label row */}
      <div className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-zinc-500">
        <span className="h-px w-6 bg-accent" />
        <span>{item.label}</span>
        <span className="ml-auto font-mono tracking-normal">{String(idx + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>
      </div>

      <h3 className={`mt-4 sm:mt-5 font-semibold text-white tracking-[-0.035em] leading-[1.04] ${compact ? 'text-[24px]' : 'text-[26px] xl:text-[30px]'}`}>{item.title}</h3>
      <p className={`mt-2.5 text-zinc-400 leading-relaxed ${compact ? 'text-[13px]' : 'text-[14px] line-clamp-3'}`}>{item.desc}</p>

      {/* example output, like a printed slip */}
      <div className="mt-auto pt-5">
        <div className="border-t border-dashed border-white/20 pt-3">
          <div className="mb-2 text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-500">Example call output</div>
          <dl className="space-y-1.5 font-mono text-[12px]">
            {item.spec.map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-2">
                <dt className="text-zinc-500 shrink-0">{k}</dt>
                <span aria-hidden="true" className="flex-1 translate-y-[-3px] border-b border-dotted border-white/20" />
                <dd className="text-white text-right">{v}</dd>
              </div>
            ))}
          </dl>
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
