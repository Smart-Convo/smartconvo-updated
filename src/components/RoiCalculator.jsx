import SectionHeading from './SectionHeading';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Copy, Check, RotateCcw } from 'lucide-react';
import { sectionContainerVariants, staggerItemVariants, defaultSectionViewport } from '../utils/motionVariants';

const USD_TO_PKR_RATE = 280;

/* ------------------------------------------------------------------ *
 * ROI MODELS
 * Every model returns the same shape:
 *   value  = financial value generated per month (PKR)
 *   cost   = monthly cost of Smart Convo (PKR)
 *   rows   = [label, text] lines explaining where the value comes from
 * ROI % = (value - cost) / cost * 100
 * Money inputs are stored in PKR and converted for display.
 * ------------------------------------------------------------------ */
const COST_INPUT = (def) => ({
  key: 'cost', kind: 'money', label: 'Smart Convo monthly cost', hint: 'Set this to your Smart Convo plan price.',
  min: 20000, max: 500000, step: 5000, def,
});

const MODELS = {
  healthcare: {
    name: 'Healthcare Clinics',
    scenarios: {
      main: {
        label: 'Hospitals & specialty clinics',
        title: 'No-shows prevented and after-hours bookings captured',
        valueFormula: 'Value = (No-shows prevented + After-hours bookings) × Consultation fee',
        inputs: [
          { key: 'noShows', kind: 'count', label: 'No-shows prevented per month', hint: 'Automated reminder calls that bring patients back', min: 0, max: 300, step: 5, def: 50 },
          { key: 'afterHours', kind: 'count', label: 'After-hours bookings captured per month', hint: 'Night-shift calls the AI answers and books', min: 0, max: 300, step: 5, def: 30 },
          { key: 'fee', kind: 'money', label: 'Average consultation fee', min: 500, max: 20000, step: 250, def: 2500 },
          COST_INPUT(100000),
        ],
        compute: (v, f) => ({
          value: (v.noShows + v.afterHours) * v.fee,
          cost: v.cost,
          rows: [
            ['No-shows prevented', `${v.noShows} × ${f(v.fee)} = ${f(v.noShows * v.fee)}`],
            ['After-hours bookings', `${v.afterHours} × ${f(v.fee)} = ${f(v.afterHours * v.fee)}`],
          ],
        }),
      },
    },
  },

  retail: {
    name: 'Retail & E-Commerce',
    scenarios: {
      limited: {
        label: 'Limited hours (e.g. 9 AM to 6 PM)',
        title: 'Orders captured outside business hours',
        valueFormula: 'Value = After-hours orders × Average order value × Gross margin',
        inputs: [
          { key: 'orders', kind: 'count', label: 'After-hours orders captured per month', hint: 'Midnight and weekend shoppers, plus "where is my order?" calls', min: 0, max: 1000, step: 10, def: 150 },
          { key: 'aov', kind: 'money', label: 'Average order value', min: 1000, max: 30000, step: 500, def: 5000 },
          { key: 'margin', kind: 'percent', label: 'Gross margin', min: 10, max: 70, step: 1, def: 40 },
          COST_INPUT(80000),
        ],
        compute: (v, f) => {
          const profit = (v.aov * v.margin) / 100;
          return {
            value: v.orders * profit,
            cost: v.cost,
            rows: [
              ['Orders captured', `${v.orders} orders`],
              ['Profit per order', `${f(v.aov)} × ${v.margin}% = ${f(profit)}`],
            ],
          };
        },
      },
      full: {
        label: '24/7 support operations',
        title: 'Night shifts replaced and return-to-origin losses prevented',
        valueFormula: 'Value = Human support cost saved + (Parcels saved × Courier fee)',
        inputs: [
          { key: 'humanSaved', kind: 'money', label: 'Human support cost saved per month', hint: 'A 24/7 setup is about 9 seats plus overhead, roughly Rs 700,000+ a month', min: 100000, max: 1500000, step: 10000, def: 450000 },
          { key: 'parcels', kind: 'count', label: 'Failed COD parcels prevented per month', hint: 'Automated COD confirmation calls', min: 0, max: 2000, step: 10, def: 300 },
          { key: 'courier', kind: 'money', label: 'Courier loss per failed parcel', min: 100, max: 1000, step: 10, def: 350 },
          COST_INPUT(120000),
        ],
        compute: (v, f) => ({
          value: v.humanSaved + v.parcels * v.courier,
          cost: v.cost,
          rows: [
            ['Support cost saved', f(v.humanSaved)],
            ['RTO losses prevented', `${v.parcels} × ${f(v.courier)} = ${f(v.parcels * v.courier)}`],
          ],
        }),
      },
    },
  },

  'real-estate': {
    name: 'Real Estate Developers',
    scenarios: {
      inbound: {
        label: 'Speed-to-lead (inbound)',
        title: 'Missed inbound leads answered instantly',
        valueFormula: 'Value = Leads recovered × Site visit rate × Close rate × Commission',
        inputs: [
          { key: 'leads', kind: 'count', label: 'Missed leads recovered per month', hint: 'Late-night ad leads the AI answers within seconds', min: 0, max: 500, step: 5, def: 50 },
          { key: 'visit', kind: 'percent', label: 'Site visit rate', min: 5, max: 60, step: 1, def: 20 },
          { key: 'close', kind: 'percent', label: 'Close rate (visits to deals)', min: 2, max: 40, step: 1, def: 10 },
          { key: 'commission', kind: 'money', label: 'Commission per closed deal', min: 100000, max: 1500000, step: 10000, def: 350000 },
          COST_INPUT(100000),
        ],
        compute: (v, f) => {
          const visits = (v.leads * v.visit) / 100;
          const deals = (visits * v.close) / 100;
          return {
            value: deals * v.commission,
            cost: v.cost,
            rows: [
              ['Site visits scheduled', `${Math.round(visits * 10) / 10}`],
              ['Deals closed', `${Math.round(deals * 100) / 100}`],
              ['Commission earned', `${Math.round(deals * 100) / 100} × ${f(v.commission)}`],
            ],
          };
        },
      },
      qualify: {
        label: 'Lead qualification and reactivation',
        title: 'Window shoppers filtered out, serious buyers routed to brokers',
        valueFormula: 'Value = Extra deals closed from cleaned leads × Commission',
        inputs: [
          { key: 'cold', kind: 'count', label: 'Leads the AI qualifies per month', hint: 'Aged database leads and cold inquiries', min: 100, max: 5000, step: 50, def: 1000 },
          { key: 'serious', kind: 'count', label: 'Serious buyers routed to brokers', min: 10, max: 1000, step: 10, def: 200 },
          { key: 'extra', kind: 'count', label: 'Extra deals closed by brokers', hint: 'Deals closed because brokers only get serious buyers', min: 0, max: 20, step: 1, def: 2 },
          { key: 'commission', kind: 'money', label: 'Commission per closed deal', min: 100000, max: 1500000, step: 10000, def: 350000 },
          COST_INPUT(120000),
        ],
        compute: (v, f) => {
          const serious = Math.min(v.serious, v.cold);
          return {
            value: v.extra * v.commission,
            cost: v.cost,
            rows: [
              ['Window shoppers filtered out', `${(v.cold - serious).toLocaleString()}`],
              ['Serious buyers routed', `${serious.toLocaleString()} of ${v.cold.toLocaleString()}`],
              ['Extra deals closed', `${v.extra} × ${f(v.commission)}`],
            ],
          };
        },
      },
    },
  },
};

const defaultsFor = (scn) => Object.fromEntries(scn.inputs.map((i) => [i.key, i.def]));


/* ---------------- small building blocks ---------------- */

function useCountUp(target, decimals = 0) {
  const mv = useMotionValue(target);
  const text = useTransform(mv, (v) => v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: decimals }));
  useEffect(() => {
    const c = animate(mv, target, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [target, mv]);
  return text;
}

/** Number box you can type into. Commits on blur / Enter, clamps to bounds. */
function NumField({ value, onCommit, prefix, suffix, min = 0, max = Infinity, width = 'w-[132px]', label }) {
  const [draft, setDraft] = useState(null);
  const shown = draft ?? Math.round(value).toLocaleString('en-US');
  const commit = () => {
    if (draft === null) return;
    const n = Number(String(draft).replace(/[^\d.]/g, ''));
    if (!Number.isNaN(n)) onCommit(Math.min(max, Math.max(min, n)));
    setDraft(null);
  };
  return (
    <label className={`flex items-center gap-1.5 ${width} h-[38px] rounded-lg border border-white/12 bg-white/[0.04] px-2.5 focus-within:border-accent focus-within:ring-4 focus-within:ring-[#D4FF00]/10 light:focus-within:ring-[#7c3aed]/15 transition-all`}>
      {prefix && <span className="text-[12px] text-zinc-500">{prefix}</span>}
      <input
        inputMode="decimal"
        aria-label={label}
        value={shown}
        onFocus={(e) => { setDraft(String(Math.round(value))); setTimeout(() => e.target.select(), 0); }}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
        className="min-w-0 flex-1 bg-transparent text-right text-[14px] font-semibold text-white tabular-nums outline-none"
      />
      {suffix && <span className="text-[12px] text-zinc-500">{suffix}</span>}
    </label>
  );
}

/** 12-month cumulative net gain */
function Projection({ net, cost, money }) {
  const W = 420, H = 150, padL = 6, padR = 10, padT = 14, padB = 22;
  const pts = Array.from({ length: 13 }, (_, m) => m * net);
  const lo = Math.min(0, ...pts), hi = Math.max(0, ...pts);
  const span = hi - lo || 1;
  const x = (m) => padL + (m / 12) * (W - padL - padR);
  const y = (v) => padT + (1 - (v - lo) / span) * (H - padT - padB);
  const d = pts.map((v, m) => `${m ? 'L' : 'M'}${x(m).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const positive = net >= 0;
  const color = positive ? 'var(--color-accent)' : '#e11d48';
  const id = useRef(`pj${Math.random().toString(36).slice(2, 7)}`).current;
  const y0 = y(0);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible" role="img" aria-label={`Cumulative net gain over 12 months: ${money(net * 12)}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 3, 6, 9, 12].map((m) => (
        <g key={m}>
          <line x1={x(m)} x2={x(m)} y1={padT} y2={H - padB} stroke="currentColor" className="text-white" strokeOpacity="0.06" />
          <text x={x(m)} y={H - 6} textAnchor="middle" className="fill-zinc-500" style={{ fontSize: 10 }}>{m === 0 ? 'Now' : `M${m}`}</text>
        </g>
      ))}
      <line x1={padL} x2={W - padR} y1={y0} y2={y0} stroke="currentColor" className="text-white" strokeOpacity="0.25" strokeDasharray="3 4" />
      <path d={`${d} L${x(12)},${y0} L${x(0)},${y0} Z`} fill={`url(#${id})`} />
      <motion.path key={net} d={d} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }} />
      <circle cx={x(12)} cy={y(pts[12])} r="4" fill={color} />
    </svg>
  );
}

export default function RoiCalculator({ onOpenModal }) {
  const [vertical, setVertical] = useState('healthcare');
  const [scenarioKey, setScenarioKey] = useState('main');
  const [currency, setCurrency] = useState('PKR');
  const [copied, setCopied] = useState(false);
  const model = MODELS[vertical];
  const scenario = model.scenarios[scenarioKey];
  const [vals, setVals] = useState(() => defaultsFor(MODELS.healthcare.scenarios.main));

  const pickVertical = (key) => {
    const first = Object.keys(MODELS[key].scenarios)[0];
    setVertical(key);
    setScenarioKey(first);
    setVals(defaultsFor(MODELS[key].scenarios[first]));
  };
  const pickScenario = (key) => { setScenarioKey(key); setVals(defaultsFor(model.scenarios[key])); };
  const reset = () => setVals(defaultsFor(scenario));

  const usd = currency === 'USD';
  const money = (pkr) => {
    if (!usd) return `Rs ${Math.round(pkr).toLocaleString('en-PK')}`;
    const d = pkr / USD_TO_PKR_RATE;
    return d < 100 ? `$${d.toFixed(2)}` : `$${Math.round(d).toLocaleString('en-US')}`;
  };

  const result = useMemo(() => {
    const r = scenario.compute(vals, money);
    const cost = Math.max(1, r.cost);
    const net = r.value - cost;
    return { ...r, cost, net, roi: (net / cost) * 100, multiple: r.value / cost, payback: r.value > 0 ? (cost / r.value) * 30 : null };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario, vals, currency]);

  const roiShown = useCountUp(Math.round(result.roi * 10) / 10, 1);
  const positive = result.roi >= 0;
  const paybackText = result.payback == null ? '—' : result.payback > 365 ? '1 year+' : `${Math.max(1, Math.round(result.payback))} days`;
  const valueText = (i, v) => (i.kind === 'money' ? money(v) : i.kind === 'percent' ? `${v}%` : v.toLocaleString());
  const barMax = Math.max(result.value, result.cost, 1);

  const summary = () => [
    `Smart Convo ROI estimate (${model.name}, ${scenario.label})`,
    `ROI: ${Math.round(result.roi * 10) / 10}%`,
    `Value generated per month: ${money(result.value)}`,
    `Smart Convo monthly cost: ${money(result.cost)}`,
    `Net gain per month: ${money(result.net)} (${money(result.net * 12)} over 12 months)`,
    '',
    ...scenario.inputs.map((i) => `${i.label}: ${valueText(i, vals[i.key])}`),
  ].join('\n');

  const copy = async () => {
    try { await navigator.clipboard.writeText(summary()); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked */ }
  };

  const openModal = () =>
    onOpenModal({
      industry: model.name,
      scenario: scenario.label,
      currency,
      valueGenerated: result.value,
      monthlyCost: result.cost,
      netGain: result.net,
      roiPercent: result.roi,
      inputs: scenario.inputs.map((i) => [i.label, valueText(i, vals[i.key])]),
    });

  return (
    <motion.section
      id="calculator"
      initial="hidden"
      whileInView="visible"
      viewport={defaultSectionViewport}
      variants={sectionContainerVariants}
      className="py-12 sm:py-24 bg-transparent"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={staggerItemVariants} className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <SectionHeading eyebrow="ROI calculator" lead="See what missed calls could" accent="be costing your enterprise" className="mb-5" />
          <p className="text-zinc-300 ios-subtext sm:text-[16px] max-w-2xl mx-auto leading-relaxed">
            Pick your industry, enter your own numbers, and see the monthly return on Smart Convo.
          </p>
        </motion.div>

        {/* toolbar */}
        <motion.div variants={staggerItemVariants} className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 mb-6 border-b border-white/10">
          <div role="tablist" aria-label="Industry" className="flex items-center gap-1 sm:gap-2 -mb-px overflow-x-auto [scrollbar-width:none]">
            {Object.entries(MODELS).map(([key, m]) => {
              const on = vertical === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={on}
                  onClick={() => pickVertical(key)}
                  className={`relative whitespace-nowrap px-3 sm:px-4 py-3 text-[13px] sm:text-[14px] font-semibold cursor-pointer transition-colors ${on ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
                >
                  {m.name}
                  {on && <motion.span layoutId="roi-tab" className="absolute inset-x-3 sm:inset-x-4 -bottom-px h-[2px] rounded-full bg-accent" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                </button>
              );
            })}
          </div>
          <div className="mb-2 inline-flex p-0.5 rounded-lg border border-white/12 text-[12px] font-semibold">
            {['PKR', 'USD'].map((c) => (
              <button key={c} onClick={() => setCurrency(c)} className={`px-3 py-1 rounded-md cursor-pointer transition-colors ${currency === c ? 'bg-white text-zinc-950 light:text-[#fff]' : 'text-zinc-400 hover:text-white'}`}>{c}</button>
            ))}
          </div>
        </motion.div>

        <motion.div variants={staggerItemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* ---------------- inputs ---------------- */}
          <div className="lg:col-span-7 rounded-[24px] sm:rounded-[28px] border border-white/10 bg-panel p-5 sm:p-8">
            {Object.keys(model.scenarios).length > 1 && (
              <div className="mb-5 inline-flex flex-wrap p-0.5 rounded-lg border border-white/12 text-[12px] sm:text-[13px] font-semibold">
                {Object.entries(model.scenarios).map(([k, sc]) => (
                  <button key={k} onClick={() => pickScenario(k)} className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${scenarioKey === k ? 'bg-white text-zinc-950 light:text-[#fff]' : 'text-zinc-400 hover:text-white'}`}>{sc.label}</button>
                ))}
              </div>
            )}

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[19px] sm:text-[23px] font-semibold tracking-[-0.02em] text-white leading-snug">{scenario.title}</h3>
                <p className="mt-2 text-[11.5px] sm:text-[12.5px] font-mono text-zinc-400 leading-relaxed">{scenario.valueFormula}</p>
              </div>
              <button onClick={reset} className="shrink-0 inline-flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 hover:text-white cursor-pointer transition-colors" title="Reset to typical values">
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            <div className="mt-6 divide-y divide-white/[0.08] border-t border-white/[0.08]">
              {scenario.inputs.map((i) => {
                const v = vals[i.key];
                const p = Math.min(100, Math.max(0, ((v - i.min) / (i.max - i.min)) * 100));
                const isMoney = i.kind === 'money';
                const display = isMoney && usd ? v / USD_TO_PKR_RATE : v;
                return (
                  <div key={`${vertical}-${scenarioKey}-${i.key}`} className="py-4 sm:py-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-[13px] sm:text-[14px] font-medium text-white">{i.label}</div>
                        {i.hint && <div className="mt-0.5 text-[11.5px] sm:text-[12px] text-zinc-500">{i.hint}</div>}
                      </div>
                      <NumField
                        label={i.label}
                        value={display}
                        prefix={isMoney ? (usd ? '$' : 'Rs') : undefined}
                        suffix={i.kind === 'percent' ? '%' : undefined}
                        min={isMoney ? 0 : 0}
                        max={i.kind === 'percent' ? 100 : (isMoney && usd ? (i.max * 3) / USD_TO_PKR_RATE : i.max * 3)}
                        onCommit={(n) => setVals((s) => ({ ...s, [i.key]: Math.max(isMoney && i.key === 'cost' ? 1 : 0, isMoney && usd ? Math.round(n * USD_TO_PKR_RATE) : n) }))}
                      />
                    </div>
                    <input
                      type="range"
                      min={i.min}
                      max={i.max}
                      step={i.step}
                      value={Math.min(i.max, Math.max(i.min, v))}
                      onChange={(e) => setVals((s) => ({ ...s, [i.key]: Number(e.target.value) }))}
                      className="roi-slider mt-3"
                      style={{ '--p': `${p}%` }}
                      aria-label={i.label}
                    />
                    <div className="mt-1 flex justify-between text-[10.5px] text-zinc-500 tabular-nums">
                      <span>{valueText(i, i.min)}</span>
                      <span>{valueText(i, i.max)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---------------- result ---------------- */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 rounded-[24px] sm:rounded-[28px] border border-white/10 bg-panel p-5 sm:p-8 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.7)] light:shadow-[0_30px_80px_-50px_rgba(60,30,120,0.3)]">
            <div className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-zinc-500">
              <span className="h-px w-6 bg-accent" /> Projected return
            </div>

            <div className="mt-3 flex items-baseline gap-1">
              <span className={`text-[56px] sm:text-[78px] leading-none font-semibold tracking-[-0.05em] tabular-nums ${positive ? 'text-accent' : 'text-rose-500'}`} style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' }}>
                {positive ? '+' : ''}<motion.span>{roiShown}</motion.span>
              </span>
              <span className={`text-[28px] sm:text-[36px] font-semibold ${positive ? 'text-accent' : 'text-rose-500'}`}>%</span>
            </div>
            <p className="mt-2 text-[13px] text-zinc-400">
              {Math.round(result.multiple * 100) / 100}× back on {money(result.cost)} a month
            </p>

            {/* value vs cost */}
            <div className="mt-6 space-y-3">
              {[['Value generated', result.value, true], ['Smart Convo cost', result.cost, false]].map(([label, amt, hot]) => (
                <div key={label}>
                  <div className="flex items-baseline justify-between text-[12.5px]">
                    <span className="text-zinc-400">{label}</span>
                    <span className="font-semibold text-white tabular-nums">{money(amt)} <span className="text-zinc-500 font-normal">/ mo</span></span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-white/[0.07] overflow-hidden">
                    <motion.div className={`h-full rounded-full ${hot ? 'bg-accent' : 'bg-zinc-500'}`} initial={false} animate={{ width: `${Math.max(2, (amt / barMax) * 100)}%` }} transition={{ type: 'spring', stiffness: 160, damping: 26 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* projection */}
            <div className="mt-6">
              <div className="mb-1 flex items-baseline justify-between text-[12.5px]">
                <span className="text-zinc-400">Cumulative net gain, 12 months</span>
                <span className={`font-semibold tabular-nums ${positive ? 'text-white' : 'text-rose-500'}`}>{money(result.net * 12)}</span>
              </div>
              <Projection net={result.net} cost={result.cost} money={money} />
            </div>

            {/* key figures */}
            <dl className="mt-5 grid grid-cols-3 border-t border-white/[0.08] pt-4">
              {[['Net gain / month', money(result.net)], ['Payback', paybackText], ['Value / cost', `${Math.round(result.multiple * 10) / 10}×`]].map(([k, v], idx) => (
                <div key={k} className={idx ? 'pl-3 sm:pl-4 border-l border-white/[0.08]' : ''}>
                  <dt className="text-[10.5px] sm:text-[11px] text-zinc-500">{k}</dt>
                  <dd className="mt-1 text-[14px] sm:text-[16px] font-semibold text-white tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>

            {/* the calculation */}
            <details className="group mt-5 border-t border-white/[0.08] pt-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[12.5px] font-medium text-zinc-300 hover:text-white">
                How this is calculated
                <span className="text-zinc-500 transition-transform group-open:rotate-45 text-[18px] leading-none">+</span>
              </summary>
              <div className="mt-3 space-y-2 text-[12px]">
                {result.rows.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4">
                    <span className="text-zinc-400">{k}</span>
                    <span className="font-mono text-zinc-200 text-right">{v}</span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-white/[0.08] font-mono text-zinc-300 leading-relaxed">
                  ROI = ({money(result.value)} − {money(result.cost)}) ÷ {money(result.cost)} × 100
                </div>
              </div>
            </details>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openModal}
                className="group flex-1 inline-flex items-center justify-center gap-2 h-[50px] rounded-full bg-[#D4FF00] hover:bg-[#c6ee00] text-zinc-950 text-[14px] font-semibold transition-colors cursor-pointer"
              >
                Book a demo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.4} />
              </button>
              <button
                onClick={copy}
                className="inline-flex items-center justify-center gap-2 h-[50px] px-5 rounded-full border border-white/20 hover:border-white/45 text-[13.5px] font-medium text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy summary'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
