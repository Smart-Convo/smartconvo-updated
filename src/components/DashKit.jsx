import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { motion, AnimatePresence, useInView, animate, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { LayoutDashboard, PhoneCall, Users, BarChart3, Settings } from 'lucide-react';
import { SmartConvoMark } from './SmartConvoLogo';
import { useTheme } from './ThemeProvider';

/* ------------ per-dashboard theme (subtle hue on top of the Smart Convo look) ------------ */
const ThemeCtx = createContext({ hue: '#D4FF00', tint: 'rgba(212,255,0,0.03)', bar: '#3a3b42', border: 'rgba(255,255,255,0.07)' });
export const useDashTheme = () => useContext(ThemeCtx);

/* ------------ count-up number ------------ */
export function CountUp({ value, decimals = 0, prefix = '', suffix = '', duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => {
    const n = v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    return `${prefix}${n}${suffix}`;
  });
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, value, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [inView, value, duration, mv]);
  return <motion.span ref={ref}>{text}</motion.span>;
}

/* ------------ sparkline ------------ */
export function Spark({ points, color, w = 84, h = 28 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const min = Math.min(...points), max = Math.max(...points);
  const xy = points.map((v, i) => [(i / (points.length - 1)) * w, h - 3 - ((v - min) / (max - min || 1)) * (h - 6)]);
  const d = xy.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const id = useRef(`sp${Math.random().toString(36).slice(2, 7)}`).current;
  return (
    <svg ref={ref} width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible shrink-0">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.35" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient>
      </defs>
      <motion.path d={`${d} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.8 }} />
      <motion.path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1.2, ease: 'easeOut' }} />
      <motion.circle cx={xy[xy.length - 1][0]} cy={xy[xy.length - 1][1]} r="2.6" fill={color} initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 1.1, type: 'spring' }} />
    </svg>
  );
}

/* ------------ KPI tile ------------ */
export function Kpi({ label, children, delta, down, spark }) {
  const t = useDashTheme();
  const { isLight } = useTheme();
  const line = isLight ? t.hueDark || t.hue : t.hue;
  return (
    <div className="group relative overflow-hidden rounded-xl border p-2.5 sm:p-3.5 transition-colors" style={{ borderColor: t.border, background: `linear-gradient(180deg, ${t.tint}, var(--color-panel-2) 70%)` }}>
      <div className="text-[10px] sm:text-[11px] text-zinc-500">{label}</div>
      <div className="mt-1 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <span className="block text-[18px] sm:text-[26px] font-semibold tracking-tight text-white tabular-nums leading-none">{children}</span>
          {delta && <span className="mt-1 block text-[10px] sm:text-[11px] font-medium" style={{ color: down ? 'var(--color-zinc-400)' : line }}>{delta}</span>}
        </div>
        {spark && <Spark points={spark} color={line} w={64} h={26} />}
      </div>
    </div>
  );
}

/* ------------ progress ring ------------ */
export function Ring({ value, label, size = 96 }) {
  const t = useDashTheme();
  const { isLight } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const a = isLight ? t.hueDark || t.hue : t.hue;
  const b = a;
  const sw = 7, r = (size - sw) / 2;
  const id = useRef(`rg${Math.random().toString(36).slice(2, 7)}`).current;
  return (
    <div ref={ref} className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={a} /><stop offset="100%" stopColor={b} /></linearGradient></defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={sw} style={{ stroke: 'color-mix(in srgb, var(--color-white) 9%, transparent)' }} />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`url(#${id})`} strokeWidth={sw} strokeLinecap="round" initial={{ pathLength: 0 }} animate={inView ? { pathLength: value / 100 } : {}} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-[18px] sm:text-[22px] font-semibold text-white leading-none tabular-nums"><CountUp value={value} suffix="%" /></div>
        <div className="mt-1 text-[8px] sm:text-[8.5px] uppercase tracking-[0.08em] text-zinc-500">{label}</div>
      </div>
    </div>
  );
}

/* ------------ hero metric: big gradient number over a glowing area chart ------------ */
export function HeroMetric({ label, value, prefix = '', suffix = '', decimals = 0, sub, points, ring }) {
  const t = useDashTheme();
  const { isLight } = useTheme();
  const a = isLight ? '#6d28d9' : '#D4FF00';
  const b = isLight ? t.hueDark || t.hue : t.hue;
  return (
    <div className="relative overflow-hidden rounded-xl border p-3.5 sm:p-5" style={{ borderColor: t.border, background: `linear-gradient(135deg, ${t.tint}, var(--color-panel-2) 65%)` }}>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] opacity-55">
        <AreaLine points={points} color={b} height={110} />
      </div>
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10.5px] sm:text-[12px] tracking-wide text-zinc-400">{label}</div>
          <div className="mt-1.5 text-[38px] sm:text-[62px] font-semibold tracking-[-0.04em] leading-[0.95] tabular-nums text-white">
            <CountUp value={value} prefix={prefix} suffix={suffix} decimals={decimals} duration={2} />
          </div>
          <div className="mt-2 text-[10.5px] sm:text-[12px] font-medium" style={{ color: b }}>{sub}</div>
        </div>
        {ring}
      </div>
      <div className="relative h-[44px] sm:h-[62px]" />
    </div>
  );
}

/* ------------ live call feed: new calls slide in at the top ------------ */
let feedUid = 0;
export function LiveFeed({ rows, max = 4 }) {
  const t = useDashTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-5% 0px' });
  const [items, setItems] = useState(() => rows.slice(0, max).map((r, i) => ({ ...r, uid: ++feedUid, n: i })).reverse());
  const cursor = useRef(max);
  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      const r = rows[cursor.current % rows.length];
      cursor.current += 1;
      setItems((cur) => [{ ...r, uid: ++feedUid, n: cursor.current }, ...cur].slice(0, max));
    }, 2600);
    return () => clearInterval(timer);
  }, [inView, rows, max]);
  return (
    <div ref={ref} className="relative overflow-hidden rounded-xl border p-3 sm:p-4" style={{ borderColor: t.border, background: `linear-gradient(180deg, ${t.tint}, var(--color-panel-2) 70%)` }}>
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2 text-[11.5px] sm:text-[12.5px] font-medium text-zinc-300">
          <span className="relative flex w-2 h-2"><span className="absolute inset-0 rounded-full bg-[#ff4d4f] animate-ping opacity-70" /><span className="relative w-2 h-2 rounded-full bg-[#ff4d4f]" /></span>
          Live calls
        </div>
        <div className="flex items-end gap-[2px] h-3.5">
          {[0.5, 1, 0.65, 0.9, 0.45].map((h, i) => (
            <motion.span key={i} className="w-[2.5px] rounded-full origin-bottom" style={{ height: '100%', background: t.hue, opacity: 0.75 }} animate={{ scaleY: [h * 0.3, h, h * 0.4, h * 0.9, h * 0.3] }} transition={{ duration: 1 + i * 0.12, repeat: Infinity, ease: 'easeInOut' }} />
          ))}
        </div>
      </div>
      <ul className="space-y-1.5">
        <AnimatePresence initial={false}>
          {items.map((r, i) => (
            <motion.li
              key={r.uid}
              layout
              initial={{ opacity: 0, y: -22, scale: 0.96 }}
              animate={{ opacity: 1 - i * 0.14, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5"
              style={i === 0 ? { background: `color-mix(in srgb, ${t.hue} 9%, transparent)` } : undefined}
            >
              <span className="relative w-7 h-7 rounded-full bg-white/[0.07] text-[10px] font-semibold text-zinc-300 flex items-center justify-center shrink-0">
                {r.who.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                {i === 0 && <span className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ border: `1px solid ${t.hue}` }} />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[11.5px] sm:text-[12.5px] font-medium text-white truncate">{r.intent}</div>
                <div className="text-[10px] sm:text-[10.5px] text-zinc-500 truncate">{r.who} · {i === 0 ? 'just now' : `${i * 2 + 1} min ago`}</div>
              </div>
              <span className="text-[10px] sm:text-[10.5px] font-medium shrink-0" style={{ color: r.status === 'Escalated' ? '#d97706' : 'var(--color-zinc-400)' }}>{r.status}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

/* ------------ heatmap: call volume by day and time ------------ */
export function Heatmap({ seed = 0 }) {
  const t = useDashTheme();
  const { isLight } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const times = ['8a', '10a', '12p', '2p', '4p', '6p', '8p'];
  const v = (r, c) => {
    const peak = Math.exp(-Math.pow(r - (2.2 + (seed % 2) * 0.8), 2) / 3.2);
    const wk = c < 5 ? 1 : 0.5;
    const wob = 0.82 + 0.18 * Math.sin(r * 2.3 + c * 1.7 + seed);
    return Math.max(0.07, Math.min(1, peak * wk * wob));
  };
  const base = isLight ? t.hueDark || t.hue : t.hue;
  const hot = base;
  return (
    <div ref={ref} className="relative overflow-hidden rounded-xl border p-3 sm:p-4" style={{ borderColor: t.border, background: `linear-gradient(180deg, ${t.tint}, var(--color-panel-2) 70%)` }}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[11.5px] sm:text-[12.5px] font-medium text-zinc-300">Call volume by time</h4>
        <div className="flex items-center gap-1 text-[9.5px] text-zinc-500">low
          <span className="w-12 h-1.5 rounded-full" style={{ background: `linear-gradient(90deg, ${base}22, ${base})` }} />high
        </div>
      </div>
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: '18px repeat(7, 1fr)' }}>
        <span />
        {days.map((d, i) => <span key={i} className="text-center text-[9px] text-zinc-500">{d}</span>)}
        {times.map((tm, r) => (
          <React.Fragment key={tm}>
            <span className="text-[9px] text-zinc-500 self-center">{tm}</span>
            {days.map((_, c) => {
              const val = v(r, c);
              const top = val > 0.8;
              return (
                <motion.span
                  key={c}
                  className="h-[15px] sm:h-[17px] rounded-[4px]"
                  style={{ background: base, opacity: 0.12 + val * 0.78 }}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 0.12 + val * 0.78 } : {}}
                  transition={{ delay: 0.15 + (r + c) * 0.035, type: 'spring', stiffness: 260, damping: 20 }}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ------------ panel ------------ */
export function Panel({ title, right, className = '', children }) {
  const t = useDashTheme();
  return (
    <div className={`rounded-xl border p-3 sm:p-4 ${className}`} style={{ borderColor: t.border, background: `linear-gradient(180deg, ${t.tint}, var(--color-panel-2) 70%)` }}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[11.5px] sm:text-[12.5px] font-medium text-zinc-300">{title}</h4>
        {right && <span className="text-[10px] sm:text-[11px] text-zinc-500">{right}</span>}
      </div>
      {children}
    </div>
  );
}

/* ------------ recent calls table ------------ */
const STATUS = {
  Resolved: 'text-accent bg-[#D4FF00]/10',
  Booked: 'text-accent bg-[#D4FF00]/10',
  Verified: 'text-accent bg-[#D4FF00]/10',
  Routed: 'text-zinc-200 bg-white/[0.08]',
  Escalated: 'text-amber-300 bg-amber-300/10',
  Rescheduled: 'text-zinc-200 bg-white/[0.08]',
};
export function CallTable({ rows, className = '' }) {
  return (
    <Panel title="Recent calls" right="Live" className={className}>
      <ul className="divide-y divide-white/[0.06]">
        {rows.map((r, i) => (
          <motion.li
            key={r.who}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
            className={`items-center gap-3 py-2 first:pt-0 last:pb-0 ${i >= 2 ? 'hidden sm:flex' : 'flex'}`}
          >
            <span className="w-7 h-7 rounded-full bg-white/[0.07] text-[10px] font-semibold text-zinc-300 flex items-center justify-center shrink-0">
              {r.who.split(' ').map((w) => w[0]).slice(0, 2).join('')}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] sm:text-[12.5px] font-medium text-white truncate">{r.intent}</div>
              <div className="text-[10.5px] text-zinc-500 truncate">{r.who} · {r.dur}</div>
            </div>
            <span className={`text-[10px] sm:text-[10.5px] font-medium px-2 py-0.5 rounded-full shrink-0 ${STATUS[r.status] || STATUS.Routed}`}>{r.status}</span>
          </motion.li>
        ))}
      </ul>
    </Panel>
  );
}

/* ------------ donut ------------ */
export function Donut({ data, size = 132, thickness = 14, center }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const r = (size - thickness) / 2;
  const total = data.reduce((a, d) => a + d.value, 0);
  let acc = 0;
  return (
    <div className="flex items-center gap-4 sm:gap-5" ref={ref}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={thickness} style={{ stroke: 'color-mix(in srgb, var(--color-white) 8%, transparent)' }} />
          {data.map((d, i) => {
            const frac = d.value / total;
            const start = acc / total;
            acc += d.value;
            return (
              <motion.circle
                key={d.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={d.color}
                strokeWidth={thickness}
                strokeLinecap="round"
                initial={{ pathLength: 0, pathOffset: start }}
                animate={inView ? { pathLength: Math.max(frac - 0.018, 0.001), pathOffset: start } : {}}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              />
            );
          })}
        </svg>
        {center && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-[18px] sm:text-[22px] font-semibold text-white leading-none">{center.value}</div>
            <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-wider text-white/45">{center.label}</div>
          </div>
        )}
      </div>
      <ul className="space-y-1 sm:space-y-2 min-w-0">
        {data.map((d, i) => (
          <li key={d.label} className={`items-center gap-2 text-[10.5px] sm:text-[12.5px] text-white/75 ${i >= 4 ? 'hidden sm:flex' : 'flex'}`}>
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
            <span className="truncate">{d.label}</span>
            <span className="ml-auto pl-2 font-medium text-white tabular-nums">{Math.round((d.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------ bars ------------ */
export function Bars({ values, labels, color, height = 96, highlight }) {
  const { isLight } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const max = Math.max(...values);
  return (
    <div ref={ref}>
      <div className="flex items-end gap-1.5 sm:gap-2" style={{ height }}>
        {values.map((v, i) => (
          <div key={i} className="flex-1 h-full flex items-end">
            <motion.div
              className="w-full rounded-t-md"
              style={{ background: i === highlight ? (isLight ? '#7c3aed' : '#D4FF00') : color, opacity: i === highlight ? 1 : 1, originY: 1 }}
              initial={{ height: 0 }}
              animate={inView ? { height: `${(v / max) * 100}%` } : {}}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        ))}
      </div>
      {labels && (
        <div className="mt-2 flex gap-1.5 sm:gap-2">
          {labels.map((l, i) => (
            <span key={i} className="flex-1 text-center text-[9px] sm:text-[10px] text-white/40">{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------ area line ------------ */
export function AreaLine({ points, color, height = 96, labels }) {
  const { isLight } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const W = 300;
  const H = height;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const pad = 8;
  const xy = points.map((v, i) => [
    (i / (points.length - 1)) * W,
    H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2),
  ]);
  // smooth path
  const d = xy.reduce((acc, [x, y], i, a) => {
    if (i === 0) return `M ${x},${y}`;
    const [px, py] = a[i - 1];
    const cx = (px + x) / 2;
    return `${acc} C ${cx},${py} ${cx},${y} ${x},${y}`;
  }, '');
  const id = useRef(`g${Math.random().toString(36).slice(2, 8)}`).current;
  const last = xy[xy.length - 1];
  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} preserveAspectRatio="none">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path d={`${d} L ${W},${H} L 0,${H} Z`} fill={`url(#${id})`} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.5 }} />
        <motion.path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1.6, ease: 'easeInOut' }} />
        <motion.circle cx={last[0]} cy={last[1]} r="4.5" fill={color} initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 1.5, type: 'spring' }} />
      </svg>
      {labels && (
        <div className="mt-1.5 flex justify-between text-[9px] sm:text-[10px] text-white/40">
          {labels.map((l) => <span key={l}>{l}</span>)}
        </div>
      )}
    </div>
  );
}

/* ------------ gauge ------------ */
export function Gauge({ value, color, label, size = 150 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const r = size / 2 - 12;
  const cx = size / 2;
  const cy = size / 2 + 6;
  const arc = `M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}`;
  return (
    <div ref={ref} className="relative mx-auto" style={{ width: size, height: size / 2 + 20 }}>
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        <path d={arc} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="12" strokeLinecap="round" />
        <motion.path d={arc} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" initial={{ pathLength: 0 }} animate={inView ? { pathLength: value / 100 } : {}} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <div className="text-[22px] sm:text-[26px] font-semibold text-white leading-none"><CountUp value={value} suffix="%" /></div>
        <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-wider text-white/45">{label}</div>
      </div>
    </div>
  );
}

/* ------------ Smart Convo app window ------------ */
const NAV = [LayoutDashboard, PhoneCall, Users, BarChart3, Settings];
export function DashboardShell({ workspace, theme, tab = 'Overview', children }) {
  const t = theme || { hue: '#D4FF00', tint: 'rgba(212,255,0,0.03)', bar: '#3a3b42', border: 'rgba(255,255,255,0.07)', glow: 'rgba(212,255,0,0.15)' };
  const { isLight } = useTheme();
  const accent = isLight ? '#7c3aed' : '#D4FF00';
  const wrapRef = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [2.4, -2.4]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-2.8, 2.8]), { stiffness: 120, damping: 18 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mx.set(x); my.set(y);
    wrapRef.current?.style.setProperty('--sx', `${x * 100}%`);
    wrapRef.current?.style.setProperty('--sy', `${y * 100}%`);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };
  return (
    <ThemeCtx.Provider value={t}>
      <motion.div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative rounded-[20px] sm:rounded-[28px]"
        style={{ rotateX, rotateY, transformPerspective: 1600, boxShadow: isLight ? '0 30px 70px -40px rgba(46,16,101,0.3)' : '0 30px 80px -44px rgba(0,0,0,0.7)' }}
      >
        <article className="relative overflow-hidden rounded-[19px] sm:rounded-[27px] border bg-panel" style={{ borderColor: t.frame }}>
          <span className="pointer-events-none absolute inset-0 hidden sm:block" style={{ background: `radial-gradient(460px circle at var(--sx, 50%) var(--sy, 0%), ${t.hue}${isLight ? '14' : '0d'}, transparent 60%)` }} />
          {/* top bar */}
          <div className="relative flex items-center gap-2.5 sm:gap-3 h-10 sm:h-12 px-3 sm:px-4 border-b border-white/[0.07] bg-panel-2">
            <SmartConvoMark size={20} />
            <span className="text-[12.5px] font-semibold text-white hidden sm:inline">Smart Convo</span>
            <span className="text-zinc-700 hidden sm:inline">/</span>
            <span className="inline-flex items-center gap-1.5 text-[11.5px] sm:text-[12.5px] text-zinc-200 truncate">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.hue }} />
              {workspace}
            </span>
            <div className="hidden md:flex items-center gap-1 ml-3">
              {['Overview', 'Calls', 'Analytics'].map((x) => (
                <span key={x} className={`px-2.5 py-1 rounded-md text-[11.5px] ${x === tab ? 'bg-white/[0.08] text-white' : 'text-zinc-500'}`}>{x}</span>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden sm:inline text-[11px] text-zinc-400 border border-white/10 rounded-md px-2 py-1">Last 30 days</span>
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
                Live
              </span>
            </div>
          </div>
          <div className="relative flex">
            <aside className="hidden lg:flex flex-col items-center gap-2 w-14 py-4 border-r border-white/[0.07] bg-panel-2 shrink-0">
              {NAV.map((Icon, i) => (
                <span key={i} className="w-9 h-9 rounded-lg flex items-center justify-center" style={i === 0 ? { background: `${t.hue}22`, color: isLight ? t.hueDark || t.hue : t.hue } : { color: '#71717a' }}>
                  <Icon className="w-[17px] h-[17px]" strokeWidth={1.9} />
                </span>
              ))}
            </aside>
            <div className="flex-1 min-w-0 p-2.5 sm:p-5">{children}</div>
          </div>
        </article>
      </motion.div>
    </ThemeCtx.Provider>
  );
}
