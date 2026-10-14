import React, { useEffect, useRef, createContext, useContext } from 'react';
import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion';
import { LayoutDashboard, PhoneCall, Users, BarChart3, Settings } from 'lucide-react';
import { SmartConvoMark } from './SmartConvoLogo';

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

/* ------------ KPI tile ------------ */
export function Kpi({ label, children, delta, down }) {
  const t = useDashTheme();
  return (
    <div className="rounded-xl border p-2.5 sm:p-3.5" style={{ borderColor: t.border, background: `linear-gradient(180deg, ${t.tint}, #101115 70%)` }}>
      <div className="text-[10px] sm:text-[11px] text-zinc-500">{label}</div>
      <div className="mt-1 flex items-baseline gap-2 flex-wrap">
        <span className="text-[17px] sm:text-[24px] font-semibold tracking-tight text-white tabular-nums">{children}</span>
        {delta && (
          <span className={`text-[10px] font-medium ${down ? 'text-zinc-400' : 'text-[#D4FF00]'}`}>{delta}</span>
        )}
      </div>
    </div>
  );
}

/* ------------ panel ------------ */
export function Panel({ title, right, className = '', children }) {
  const t = useDashTheme();
  return (
    <div className={`rounded-xl border p-3 sm:p-4 ${className}`} style={{ borderColor: t.border, background: `linear-gradient(180deg, ${t.tint}, #101115 70%)` }}>
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
  Resolved: 'text-[#D4FF00] bg-[#D4FF00]/10',
  Booked: 'text-[#D4FF00] bg-[#D4FF00]/10',
  Verified: 'text-[#D4FF00] bg-[#D4FF00]/10',
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
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={thickness} />
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
              style={{ background: i === highlight ? '#D4FF00' : color, opacity: i === highlight ? 1 : 1, originY: 1 }}
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
        <motion.circle cx={last[0]} cy={last[1]} r="4.5" fill="#D4FF00" initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 1.5, type: 'spring' }} />
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
  return (
    <ThemeCtx.Provider value={t}>
      <article className="relative overflow-hidden rounded-[18px] sm:rounded-[24px] border bg-[#0b0c0f] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)]" style={{ borderColor: t.frame }}>
        <span className="pointer-events-none absolute -top-24 -right-16 w-64 h-64 rounded-full blur-[90px]" style={{ background: t.glow }} />
        <span className="pointer-events-none absolute inset-x-10 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${t.hue}, #D4FF00, transparent)` }} />
        {/* top bar */}
        <div className="relative flex items-center gap-2.5 sm:gap-3 h-10 sm:h-12 px-3 sm:px-4 border-b border-white/[0.07] bg-[#0e0f13]/90">
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
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-[#D4FF00] bg-[#D4FF00]/10 rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1">
              <span className="relative flex w-1.5 h-1.5"><span className="absolute inset-0 rounded-full bg-[#D4FF00] animate-ping opacity-70" /><span className="relative w-1.5 h-1.5 rounded-full bg-[#D4FF00]" /></span>
              Live
            </span>
          </div>
        </div>
        <div className="relative flex">
          <aside className="hidden lg:flex flex-col items-center gap-2 w-14 py-4 border-r border-white/[0.07] bg-[#0e0f13]/90 shrink-0">
            {NAV.map((Icon, i) => (
              <span key={i} className="w-9 h-9 rounded-lg flex items-center justify-center" style={i === 0 ? { background: 'rgba(212,255,0,0.12)', color: '#D4FF00' } : { color: '#52525b' }}>
                <Icon className="w-[17px] h-[17px]" strokeWidth={1.9} />
              </span>
            ))}
          </aside>
          <div className="flex-1 min-w-0 p-2.5 sm:p-5">{children}</div>
        </div>
      </article>
    </ThemeCtx.Provider>
  );
}
