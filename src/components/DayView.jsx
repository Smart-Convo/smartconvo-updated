import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion';
import { SmartConvoMark } from './SmartConvoLogo';
import { useTheme } from './ThemeProvider';

/* ------------------------------------------------------------------ *
 * "A day of calls": every call is one mark on a 08:00 - 22:00 timeline.
 * Answered calls stand up from the baseline. Missed calls hang below it.
 * Switch to "With Smart Convo" and the missed ones flip up and are recovered.
 * ------------------------------------------------------------------ */

const OPEN = 9;   // business hours 09:00 - 18:00
const CLOSE = 18;
const START = 8;
const END = 22;

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildDay(cfg) {
  const r = rng(cfg.seed);
  const calls = [];
  for (let i = 0; i < cfg.total; i++) {
    const u = r();
    let h;
    if (u < 0.16) h = 8 + r() * 1.4;
    else if (u < 0.5) h = 10 + r() * 3.2;
    else if (u < 0.7) h = 14 + r() * 3.2;
    else if (u < 0.88) h = 18 + r() * 2.4;
    else h = 20.4 + r() * 1.5;
    const open = h >= OPEN && h < CLOSE;
    const busy = (h >= 11 && h < 13.2) || (h >= 15 && h < 16.6);
    const pMiss = !open ? 0.86 : busy ? 0.4 : 0.1;
    calls.push({
      h,
      dur: 30 + Math.round(r() * 210),
      missed: r() < pMiss,
      topic: cfg.topics[Math.floor(r() * cfg.topics.length)],
      who: cfg.names[Math.floor(r() * cfg.names.length)],
    });
  }
  calls.sort((a, b) => a.h - b.h);
  return calls.map((c, i) => ({ ...c, i }));
}

const clock = (h) => {
  const hh = Math.floor(h);
  const mm = Math.floor((h - hh) * 60);
  const ap = hh >= 12 ? 'PM' : 'AM';
  return `${((hh + 11) % 12) + 1}:${String(mm).padStart(2, '0')} ${ap}`;
};
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export const fmt = {
  int: (v) => Math.round(v).toLocaleString('en-US'),
  money: (v) => (v >= 1e6 ? `Rs ${(v / 1e6).toFixed(1)}M` : `Rs ${Math.round(v / 1000).toLocaleString('en-US')}k`),
  pct: (v) => `${Math.round(v)}%`,
};

function AnimNum({ value, format }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => format(v));
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [value, mv]);
  return <motion.span>{text}</motion.span>;
}

export default function DayDashboard({ cfg, theme, id }) {
  const { isLight } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const [mode, setMode] = useState('before'); // 'before' | 'with'
  const [hover, setHover] = useState(null);
  const withSC = mode === 'with';

  // flip to "with Smart Convo" once the dashboard is on screen
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setMode('with'), 1300);
    return () => clearTimeout(t);
  }, [inView]);

  const calls = useMemo(() => buildDay(cfg), [cfg]);
  const missedCalls = calls.filter((c) => c.missed);
  const A = calls.length - missedCalls.length;
  const M = missedCalls.length;
  const N = calls.length;
  const afterHoursRecovered = missedCalls.filter((c) => c.h < OPEN || c.h >= CLOSE).length;

  const hue = isLight ? theme.hueDark || theme.hue : theme.hue;
  const amber = isLight ? '#d97706' : '#f59e0b';
  const stats = cfg.stats({ A, M, N, afterHoursRecovered });

  // ledger: a spread of missed calls + two answered ones
  const ledger = useMemo(() => {
    const pick = (arr, idxs) => idxs.map((f) => arr[Math.min(arr.length - 1, Math.floor(arr.length * f))]).filter(Boolean);
    const answered = calls.filter((c) => !c.missed && c.h >= OPEN && c.h < CLOSE);
    const set = new Map();
    [...pick(missedCalls, [0.05, 0.4, 0.75, 0.97]), ...pick(answered, [0.3, 0.7])].forEach((c) => set.set(c.i, c));
    return [...set.values()].sort((a, b) => a.h - b.h).slice(0, 6);
  }, [calls, missedCalls]);

  const UP = 92, DOWN = 40;
  const x = (h) => `${((h - START) / (END - START)) * 100}%`;

  return (
    <div ref={ref} className="relative rounded-[20px] sm:rounded-[26px]" style={{ boxShadow: isLight ? '0 30px 70px -44px rgba(46,16,101,0.3)' : '0 30px 80px -46px rgba(0,0,0,0.7)' }}>
      <article className="relative overflow-hidden rounded-[19px] sm:rounded-[25px] border bg-panel" style={{ borderColor: theme.frame }}>
        <span className="pointer-events-none absolute inset-x-12 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${hue}, transparent)` }} />

        {/* slim title bar */}
        <div className="flex items-center gap-3 h-11 sm:h-12 px-4 sm:px-6 border-b border-white/[0.07]">
          <SmartConvoMark size={20} />
          <span className="text-[12.5px] font-semibold text-white">Smart Convo</span>
          <span className="text-zinc-600">/</span>
          <span className="inline-flex items-center gap-1.5 text-[12.5px] text-zinc-300 truncate">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: hue }} />
            {cfg.workspace}
          </span>
          <span className="ml-auto text-[11px] text-zinc-500 hidden sm:block">Sample day, illustrative data</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_244px] gap-5 lg:gap-8 p-4 sm:p-6">
          {/* ---------------- timeline column ---------------- */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] tracking-[0.18em] uppercase text-zinc-500">Calls by time of day</div>
                <div className="mt-1 text-[15px] sm:text-[17px] font-semibold tracking-tight text-white" style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' }}>
                  {N} calls, one weekday
                  <span className="ml-2 text-[11.5px] font-normal text-zinc-500" style={{ fontFamily: 'system-ui' }}>shaded: open 9 AM to 6 PM</span>
                </div>
              </div>
              <div className="relative inline-flex p-0.5 rounded-lg border border-white/12 text-[12px] font-semibold">
                {[['before', 'Before'], ['with', 'With Smart Convo']].map(([k, l]) => (
                  <button key={k} onClick={() => setMode(k)} className={`relative z-10 px-3 py-1.5 rounded-md cursor-pointer transition-colors ${mode === k ? 'text-zinc-950 light:text-[#fff]' : 'text-zinc-400 hover:text-white'}`}>
                    {mode === k && <motion.span layoutId={`day-mode-${id}`} className="absolute inset-0 -z-10 rounded-md bg-white" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* the strip */}
            <div className="mt-5" onMouseLeave={() => setHover(null)}>
              <div className="relative" style={{ height: UP + DOWN + 22 }}>
                {/* business hours band */}
                <div className="absolute top-0 bottom-[22px] rounded-md" style={{ left: x(OPEN), width: `${((CLOSE - OPEN) / (END - START)) * 100}%`, background: 'color-mix(in srgb, var(--color-white) 5%, transparent)' }} />
                {/* baseline */}
                <div className="absolute left-0 right-0 h-px bg-white/25" style={{ top: UP }} />

                {calls.map((c, idx) => {
                  const up = 12 + (c.dur / 240) * (UP - 14);
                  const hang = 8 + (c.dur / 240) * (DOWN - 6);
                  const isHover = hover === c.i;
                  if (!c.missed) {
                    return (
                      <span
                        key={c.i}
                        onMouseEnter={() => setHover(c.i)}
                        className="absolute w-[4px] sm:w-[5px] -ml-[2px] rounded-full bg-white/35 hover:bg-white/80 transition-colors cursor-default"
                        style={{ left: x(c.h), top: UP - up, height: up, outline: isHover ? `1px solid var(--color-white)` : 'none' }}
                      />
                    );
                  }
                  return (
                    <motion.span
                      key={c.i}
                      onMouseEnter={() => setHover(c.i)}
                      className="absolute w-[4px] sm:w-[5px] -ml-[2px] rounded-full cursor-default"
                      style={{ left: x(c.h), top: UP - up, height: up, transformOrigin: `50% ${up}px` }}
                      initial={false}
                      animate={{ scaleY: withSC ? 1 : -(hang / up), backgroundColor: withSC ? hue : amber, opacity: withSC ? 1 : 0.95 }}
                      transition={{ type: 'spring', stiffness: 130, damping: 17, delay: withSC ? idx * 0.012 : 0 }}
                    />
                  );
                })}

                {/* hour labels */}
                <div className="absolute left-0 right-0 bottom-0 h-[18px] text-[10px] text-zinc-500">
                  {[8, 10, 12, 14, 16, 18, 20, 22].map((h) => (
                    <span key={h} className="absolute -translate-x-1/2 tabular-nums" style={{ left: x(h) }}>{h === 12 ? '12p' : h > 12 ? `${h - 12}p` : `${h}a`}</span>
                  ))}
                </div>
              </div>

              {/* what you're pointing at */}
              <div className="mt-2 h-[22px] text-[12px] text-zinc-400 truncate tabular-nums">
                {hover !== null ? (() => {
                  const c = calls[hover];
                  const state = c.missed ? (withSC ? 'Answered by Smart Convo' : 'Missed') : 'Answered';
                  return (
                    <span>
                      <span className="text-white font-medium">{clock(c.h)}</span> · {c.topic} · {mmss(c.dur)} ·{' '}
                      <span style={{ color: c.missed ? (withSC ? hue : amber) : undefined }} className="font-medium">{state}</span>
                    </span>
                  );
                })() : (
                  <span>
                    <span className="text-white font-medium">{withSC ? 0 : M} missed</span>
                    {!withSC && <span> · {afterHoursRecovered} of them after hours</span>}
                    {withSC && <span> · {M} calls recovered, {afterHoursRecovered} of them after hours</span>}
                  </span>
                )}
              </div>
            </div>

            {/* stats on small screens */}
            <dl className="lg:hidden mt-3 grid grid-cols-3 border-t border-white/[0.08] pt-3">
              {stats.map((s, i) => (
                <div key={s.key} className={i ? 'pl-3 border-l border-white/[0.08]' : ''}>
                  <dt className="text-[10px] text-zinc-500 leading-tight">{withSC ? s.labelAfter ?? s.label : s.labelBefore ?? s.label}</dt>
                  <dd className="mt-1 text-[17px] font-semibold text-white tabular-nums" style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' }}>
                    {s.text ? (withSC ? s.after : s.before) : <AnimNum value={withSC ? s.after : s.before} format={s.fmt} />}
                  </dd>
                </div>
              ))}
            </dl>

            {/* call log */}
            <div className="mt-4 sm:mt-5 border-t border-white/[0.08]">
              {ledger.map((c, i) => (
                <div key={c.i} className={`grid grid-cols-[62px_1fr_auto] sm:grid-cols-[74px_150px_1fr_auto] items-baseline gap-x-3 py-2 sm:py-2.5 border-b border-white/[0.06] text-[11.5px] sm:text-[12.5px] ${i >= 4 ? 'hidden sm:grid' : ''}`}>
                  <span className="font-mono text-zinc-500 tabular-nums">{clock(c.h)}</span>
                  <span className="hidden sm:block text-zinc-300 truncate">{c.who}</span>
                  <span className="text-white truncate">{c.topic}</span>
                  <motion.span
                    key={`${c.i}-${mode}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: withSC ? i * 0.06 : 0 }}
                    className="font-medium text-right whitespace-nowrap"
                    style={{ color: c.missed ? (withSC ? hue : amber) : 'var(--color-zinc-400)' }}
                  >
                    {c.missed ? (withSC ? `Recovered · ${cfg.recovered}` : 'Missed') : 'Answered'}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- numbers column (desktop) ---------------- */}
          <dl className="hidden lg:flex flex-col border-l border-white/[0.08] pl-8">
            {stats.map((s, i) => (
              <div key={s.key} className={`py-5 ${i ? 'border-t border-white/[0.08]' : 'pt-1'}`}>
                <dt className="text-[11.5px] text-zinc-500">{withSC ? s.labelAfter ?? s.label : s.labelBefore ?? s.label}</dt>
                <dd className="mt-1.5 text-[40px] leading-none font-semibold tracking-[-0.04em] text-white tabular-nums" style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' }}>
                  {s.text ? (withSC ? s.after : s.before) : <AnimNum value={withSC ? s.after : s.before} format={s.fmt} />}
                </dd>
                <div className="mt-1.5 text-[11.5px] tabular-nums" style={{ color: withSC ? hue : 'var(--color-zinc-500)' }}>
                  {withSC ? `was ${s.text ? s.before : s.fmt(s.before)} before` : s.note}
                </div>
              </div>
            ))}
          </dl>
        </div>
      </article>
    </div>
  );
}
