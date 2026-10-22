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
function NumField({ value, onCommit, prefix, suffix, min = 0, max = Infinity, width = 'w-[150px] sm:w-[190px]', label }) {
  const [draft, setDraft] = useState(null);
  const shown = draft ?? Math.round(value).toLocaleString('en-US');
  const commit = () => {
    if (draft === null) return;
    const n = Number(String(draft).replace(/[^\d.]/g, ''));
    if (!Number.isNaN(n)) onCommit(Math.min(max, Math.max(min, n)));
    setDraft(null);
  };
  return (
    <label className={`flex items-baseline justify-end gap-1.5 ${width} border-b border-white/25 focus-within:border-accent transition-colors pb-0.5`}>
      {prefix && <span className="text-[12px] text-zinc-500">{prefix}</span>}
      <input
        inputMode="decimal"
        aria-label={label}
        value={shown}
        onFocus={(e) => { setDraft(String(Math.round(value))); setTimeout(() => e.target.select(), 0); }}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
        className="min-w-0 flex-1 bg-transparent text-right text-[22px] sm:text-[26px] leading-none font-semibold tracking-[-0.03em] text-white tabular-nums outline-none"
        style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' }}
      />
      {suffix && <span className="text-[12px] text-zinc-500">{suffix}</span>}
    </label>
  );
}

/** One month as 30 ticks: the first ones pay the Smart Convo bill, the rest are profit. */
function Ruler({ payback }) {
  const paid = payback == null ? 30 : Math.min(30, Math.max(1, Math.ceil(payback)));
  return (
    <div>
      <div className="flex items-end gap-[3px] h-9" role="img" aria-label={`Smart Convo pays for itself on day ${paid} of 30`}>
        {Array.from({ length: 30 }, (_, i) => {
          const covered = i < paid;
          return (
            <motion.span
              key={i}
              className={`flex-1 rounded-[1px] origin-bottom ${covered ? 'bg-zinc-500' : 'bg-accent'}`}
              style={{ height: i % 5 === 4 ? '100%' : '62%' }}
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.01 }}
            />
          );
        })}
      </div>
      <div className="relative mt-1.5 h-4 text-[10.5px] text-zinc-500 tabular-nums">
        <span className="absolute left-0">Day 1</span>
        <span className="absolute -translate-x-1/2 text-white font-medium transition-all duration-500" style={{ left: `${Math.min(88, Math.max(8, (paid / 30) * 100))}%` }}>
          {payback == null ? '' : `Paid off on day ${paid}`}
        </span>
        <span className="absolute right-0">Day 30</span>
      </div>
    </div>
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

        <motion.div variants={staggerItemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* ---------------- inputs: a plain worksheet ---------------- */}
          <div className="lg:col-span-7">
            {Object.keys(model.scenarios).length > 1 && (
              <div className="mb-6 flex flex-wrap gap-x-5 gap-y-1 text-[13px] font-medium">
                {Object.entries(model.scenarios).map(([k, sc]) => (
                  <button key={k} onClick={() => pickScenario(k)} className={`cursor-pointer pb-1 border-b transition-colors ${scenarioKey === k ? 'text-white border-white' : 'text-zinc-500 border-transparent hover:text-white'}`}>{sc.label}</button>
                ))}
              </div>
            )}

            <div className="flex items-start justify-between gap-4">
              <h3 className="text-[22px] sm:text-[30px] font-semibold tracking-[-0.03em] text-white leading-[1.15] max-w-xl" style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' }}>{scenario.title}</h3>
              <button onClick={reset} className="shrink-0 mt-1 inline-flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 hover:text-white cursor-pointer transition-colors" title="Reset to typical values">
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            <ol className="mt-6 border-t border-white/[0.12]">
              {scenario.inputs.map((i, n) => {
                const v = vals[i.key];
                const p = Math.min(100, Math.max(0, ((v - i.min) / (i.max - i.min)) * 100));
                const isMoney = i.kind === 'money';
                const display = isMoney && usd ? v / USD_TO_PKR_RATE : v;
                return (
                  <li key={`${vertical}-${scenarioKey}-${i.key}`} className="py-4 sm:py-5 border-b border-white/[0.08]">
                    <div className="flex items-end justify-between gap-4">
                      <div className="min-w-0 flex gap-3 sm:gap-4">
                        <span className="pt-0.5 text-[11px] font-mono text-zinc-600 tabular-nums">{String(n + 1).padStart(2, '0')}</span>
                        <div>
                          <div className="text-[13.5px] sm:text-[15px] font-medium text-white leading-snug">{i.label}</div>
                          {i.hint && <div className="mt-0.5 text-[11.5px] sm:text-[12.5px] text-zinc-500 leading-snug">{i.hint}</div>}
                        </div>
                      </div>
                      <NumField
                        label={i.label}
                        value={display}
                        prefix={isMoney ? (usd ? '$' : 'Rs') : undefined}
                        suffix={i.kind === 'percent' ? '%' : undefined}
                        min={0}
                        max={i.kind === 'percent' ? 100 : (isMoney && usd ? (i.max * 3) / USD_TO_PKR_RATE : i.max * 3)}
                        onCommit={(n2) => setVals((s2) => ({ ...s2, [i.key]: Math.max(isMoney && i.key === 'cost' ? 1 : 0, isMoney && usd ? Math.round(n2 * USD_TO_PKR_RATE) : n2) }))}
                      />
                    </div>
                    <input
                      type="range"
                      min={i.min}
                      max={i.max}
                      step={i.step}
                      value={Math.min(i.max, Math.max(i.min, v))}
                      onChange={(e) => setVals((s2) => ({ ...s2, [i.key]: Number(e.target.value) }))}
                      className="roi-slider mt-3"
                      style={{ '--p': `${p}%` }}
                      aria-label={i.label}
                    />
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 text-[11.5px] font-mono text-zinc-500 leading-relaxed">{scenario.valueFormula}</p>
          </div>

          {/* ---------------- result: a printed statement ---------------- */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative bg-panel border border-white/12 px-5 sm:px-7 pt-6 pb-7 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.7)] light:shadow-[0_30px_80px_-50px_rgba(60,30,120,0.3)]" style={{ borderRadius: '4px 4px 0 0' }}>
              <div className="flex items-baseline justify-between text-[11px] tracking-[0.18em] uppercase text-zinc-500">
                <span>Monthly statement</span>
                <span className="normal-case tracking-normal">{model.name}</span>
              </div>

              <dl className="mt-5 space-y-2.5 text-[13px]">
                {result.rows.map(([k, v]) => (
                  <div key={k} className="flex items-baseline gap-2">
                    <dt className="text-zinc-400 shrink-0">{k}</dt>
                    <span className="flex-1 border-b border-dotted border-white/20 translate-y-[-3px]" />
                    <dd className="font-mono text-[12px] text-zinc-300 text-right">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-4 pt-4 border-t border-white/20 space-y-2 text-[14px]">
                <div className="flex items-baseline justify-between"><span className="text-zinc-300">Value generated</span><span className="font-semibold text-white tabular-nums">{money(result.value)}</span></div>
                <div className="flex items-baseline justify-between"><span className="text-zinc-300">Smart Convo</span><span className="font-semibold text-white tabular-nums">− {money(result.cost)}</span></div>
              </div>
              <div className="mt-3 pt-3 border-t-2 border-double border-white/30 flex items-baseline justify-between">
                <span className="text-[14px] text-zinc-300">Net per month</span>
                <span className={`text-[20px] font-semibold tabular-nums ${positive ? 'text-white' : 'text-rose-500'}`}>{money(result.net)}</span>
              </div>

              <div className="mt-7 flex items-end justify-between gap-3">
                <div>
                  <div className="text-[11px] tracking-[0.18em] uppercase text-zinc-500">Return</div>
                  <div className={`mt-1 flex items-baseline ${positive ? 'text-accent' : 'text-rose-500'}`} style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' }}>
                    <span className="text-[64px] sm:text-[84px] leading-[0.9] font-semibold tracking-[-0.05em] tabular-nums">{positive ? '+' : ''}<motion.span>{roiShown}</motion.span></span>
                    <span className="text-[26px] sm:text-[34px] font-semibold ml-0.5">%</span>
                  </div>
                </div>
                <div className="text-right text-[12px] text-zinc-400 pb-1.5 leading-snug">
                  <div className="text-white font-semibold text-[15px] tabular-nums">{Math.round(result.multiple * 10) / 10}×</div>
                  back on {money(result.cost)}
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 text-[11.5px] text-zinc-500">One month, day by day: <span className="text-zinc-400">grey covers the bill, colour is profit</span></div>
                <Ruler payback={result.payback} />
              </div>

              <div className="mt-5 text-[12.5px] text-zinc-400">
                Over 12 months: <span className={`font-semibold tabular-nums ${positive ? 'text-white' : 'text-rose-500'}`}>{money(result.net * 12)}</span> net
              </div>

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
              {/* torn edge */}
              <div aria-hidden className="absolute left-0 right-0 -bottom-[7px] h-[8px] text-[var(--color-panel)]" style={{ background: 'linear-gradient(-45deg, transparent 5px, currentColor 0) 0 0 / 10px 8px, linear-gradient(45deg, transparent 5px, currentColor 0) 0 0 / 10px 8px' }} />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
