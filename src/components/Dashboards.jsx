import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SmartConvoMark } from './SmartConvoLogo';
import { useTheme } from './ThemeProvider';

/* Three separately designed sample dashboards (illustrative data).
 * 1. City of Vaughan, Ontario: 311 contact centre with a service map
 * 2. Apparel brand in Pakistan: order desk with COD confirmation calls
 * 3. Hospital: scheduler that fills as Smart Convo books appointments
 */

const DISPLAY = { fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' };
const useHue = (theme) => {
  const { isLight } = useTheme();
  return isLight ? theme.hueDark : theme.hue;
};
const useTick = (ms) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((v) => v + 1), ms);
    return () => clearInterval(t);
  }, [ms]);
  return n;
};
const useIsMobile = () => {
  const [m, setM] = useState(false);
  useEffect(() => {
    const q = window.matchMedia('(max-width: 639px)');
    const f = () => setM(q.matches);
    f();
    q.addEventListener('change', f);
    return () => q.removeEventListener('change', f);
  }, []);
  return m;
};
const rng = (seed) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

function Spark({ pts, hue, w = 72, h = 24 }) {
  const lo = Math.min(...pts), hi = Math.max(...pts), sp = hi - lo || 1;
  const xy = pts.map((v, i) => [(i / (pts.length - 1)) * w, h - 2 - ((v - lo) / sp) * (h - 4)]);
  return (
    <svg width={w} height={h} className="overflow-visible">
      <path d={xy.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')} fill="none" stroke={hue} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={xy[xy.length - 1][0]} cy={xy[xy.length - 1][1]} r="2.2" fill={hue} />
    </svg>
  );
}

function Bars({ rows, hue, unit = '%' }) {
  const max = Math.max(...rows.map((r) => r[1]));
  return (
    <ul className="space-y-1.5">
      {rows.map(([l, v]) => (
        <li key={l} className="grid grid-cols-[84px_1fr_30px] items-center gap-2 text-[11.5px]">
          <span className="text-zinc-400 truncate">{l}</span>
          <span className="h-[5px] rounded-full bg-white/[0.08] overflow-hidden"><span className="block h-full rounded-full" style={{ width: `${(v / max) * 100}%`, background: hue }} /></span>
          <span className="text-right text-white tabular-nums">{v}{unit}</span>
        </li>
      ))}
    </ul>
  );
}

function Frame({ theme, children }) {
  return (
    <div className="rounded-[18px] sm:rounded-[24px]" style={{ boxShadow: '0 30px 80px -48px rgba(0,0,0,0.55)' }}>
      <article className="relative overflow-hidden rounded-[17px] sm:rounded-[23px] border bg-panel lg:min-h-[744px]" style={{ borderColor: theme.frame }}>
        {children}
      </article>
    </div>
  );
}

const Underline = ({ items, value, onChange, hue, id }) => (
  <div role="tablist" className="flex items-center gap-4 sm:gap-5 text-[12.5px] font-medium overflow-x-auto [scrollbar-width:none]">
    {items.map(([k, l]) => (
      <button key={k} role="tab" aria-selected={value === k} onClick={() => onChange(k)} className={`relative whitespace-nowrap py-2.5 cursor-pointer transition-colors ${value === k ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>
        {l}
        {value === k && <motion.span layoutId={id} className="absolute inset-x-0 -bottom-px h-[2px] rounded-full" style={{ background: hue }} />}
      </button>
    ))}
  </div>
);

/* ================================================================== *
 * 1. CITY OF VAUGHAN: 311 contact centre
 * ================================================================== */
const HOODS = [
  { id: 'kl', name: 'Kleinburg', pts: '0,0 170,0 150,85 0,95', at: [78, 46], n: { all: 96, roads: 41, waste: 21, water: 12 } },
  { id: 'mp', name: 'Maple', pts: '170,0 440,0 420,95 235,100 150,85', at: [300, 46], n: { all: 212, roads: 88, waste: 64, water: 26 } },
  { id: 'pt', name: 'Patterson', pts: '440,0 640,0 640,130 420,95', at: [540, 52], n: { all: 184, roads: 72, waste: 51, water: 19 } },
  { id: 'wb', name: 'Woodbridge', pts: '0,95 150,85 235,100 250,210 235,300 0,300', at: [110, 190], n: { all: 331, roads: 141, waste: 96, water: 44 } },
  { id: 'vv', name: 'Vellore Village', pts: '235,100 420,95 410,200 250,210', at: [330, 152], n: { all: 267, roads: 109, waste: 77, water: 31 } },
  { id: 'cn', name: 'Concord', pts: '250,210 410,200 410,300 235,300', at: [330, 262], n: { all: 198, roads: 76, waste: 58, water: 28 } },
  { id: 'th', name: 'Thornhill', pts: '420,95 640,130 640,300 410,300 410,200', at: [528, 212], n: { all: 305, roads: 133, waste: 92, water: 35 } },
];
const PINS = [
  [40, 30, 'roads'], [110, 70, 'water'], [210, 24, 'waste'], [270, 70, 'roads'], [360, 30, 'roads'], [400, 70, 'waste'], [520, 40, 'roads'], [590, 100, 'waste'],
  [50, 130, 'roads'], [120, 160, 'waste'], [70, 240, 'water'], [170, 220, 'roads'], [210, 275, 'waste'], [290, 130, 'roads'], [380, 170, 'water'], [300, 240, 'roads'],
  [370, 275, 'waste'], [470, 160, 'roads'], [560, 180, 'waste'], [600, 250, 'roads'], [470, 262, 'water'], [510, 130, 'roads'], [130, 110, 'roads'], [240, 160, 'waste'],
];
const LAYERS = [['all', 'All requests'], ['roads', 'Roads & snow'], ['waste', 'Waste'], ['water', 'Water']];
const TICKETS = [
  ['Snow clearing', 'Major Mackenzie Dr W', 'Dispatched to Public Works', 'English', 78],
  ['Blue Box not collected', 'Thornhill', 'Sent to Waste Management', 'Mandarin', 60],
  ['Pothole', 'Rutherford Rd & Weston Rd', 'Work order created', 'English', 82],
  ['Parking permit renewal', 'Vellore Village', 'Resolved on the call', 'Italian', 100],
  ['Water main break', 'Islington Ave', 'Routed to York Region Water, urgent', 'English', 16],
  ['By-law: noise complaint', 'Maple', 'Sent to By-law Enforcement', 'Punjabi', 44],
  ['Fallen tree', 'Kleinburg', 'Dispatched to Forestry', 'English', 52],
  ['Garbage collection day', 'Concord', 'Resolved on the call', 'Russian', 100],
];
const HOURLY = [2, 1, 1, 1, 2, 4, 9, 22, 58, 74, 81, 77, 69, 72, 80, 76, 61, 44, 30, 24, 18, 12, 7, 4];

function MunicipalDashboard({ theme }) {
  const hue = useHue(theme);
  const [layer, setLayer] = useState('all');
  const [hood, setHood] = useState(null);
  const tick = useTick(2800);
  const max = Math.max(...HOODS.map((h) => h.n[layer]));
  const rows = useMemo(() => Array.from({ length: 5 }, (_, k) => {
    const idx = tick + 4 - k;
    return { key: idx, no: 48210 + idx, t: TICKETS[idx % TICKETS.length] };
  }), [tick]);
  const h = hood != null ? HOODS[hood] : null;
  const hmax = Math.max(...HOURLY);

  return (
    <Frame theme={theme}>
      <div className="grid lg:grid-cols-[176px_1fr]">
        {/* sidebar */}
        <aside className="hidden lg:flex flex-col border-r border-white/[0.07] bg-panel-2/50 px-5 py-5">
          <div className="flex items-center gap-2.5"><SmartConvoMark size={22} /><span className="text-[13px] font-semibold text-white">Smart Convo</span></div>
          <div className="mt-6 text-[10.5px] tracking-[0.16em] uppercase text-zinc-500">City of Vaughan</div>
          <div className="text-[12px] text-zinc-300">Contact Centre</div>
          <nav className="mt-6 space-y-0.5 text-[12.5px]">
            {['Overview', 'Live calls', 'Service requests', 'Service map', 'Winter operations', 'Reports'].map((n, i) => (
              <div key={n} className={`relative px-3 py-2 rounded-md ${i === 0 ? 'text-white bg-white/[0.06]' : 'text-zinc-500'}`}>
                {i === 0 && <span className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full" style={{ background: hue }} />}
                {n}
              </div>
            ))}
          </nav>
          <div className="mt-auto pt-6 text-[11px] text-zinc-500 leading-relaxed">Every call answered, 24/7, in 30+ languages.<div className="mt-2 text-zinc-600">Sample data</div></div>
        </aside>

        <div className="min-w-0 flex flex-col">
          {/* top bar */}
          <div className="flex items-center gap-4 h-12 px-4 sm:px-6 border-b border-white/[0.07]">
            <span className="lg:hidden inline-flex items-center gap-2"><SmartConvoMark size={19} /><span className="text-[12.5px] font-semibold text-white">Vaughan 311</span></span>
            <span className="hidden lg:block text-[13px] font-semibold text-white">Overview</span>
            <div className="hidden md:flex items-center gap-2 ml-4 h-8 w-[260px] rounded-lg border border-white/[0.09] px-3 text-[12px] text-zinc-500">Search requests, streets, callers</div>
            <div className="ml-auto flex items-center gap-4 text-[11.5px]">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-zinc-400"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />Winter event, level 2</span>
              <span className="text-zinc-500 tabular-nums">Tue 7:42 AM EST</span>
            </div>
          </div>

          {/* KPIs */}
          <dl className="grid grid-cols-2 sm:grid-cols-4 border-b border-white/[0.07]">
            {[
              ['Calls answered today', '1,284', '+12% vs Tuesday avg.', [40, 52, 49, 61, 70, 66, 84]],
              ['Average wait', '0 sec', 'was 4 min 12 sec', [252, 230, 190, 120, 40, 8, 0]],
              ['Resolved on first call', '91%', '+9 pts since go-live', [78, 80, 83, 85, 88, 90, 91]],
              ['Open service requests', '312', '38 due today', [410, 388, 380, 352, 340, 321, 312]],
            ].map(([l, v, d, sp], i) => (
              <div key={l} className={`px-4 sm:px-6 py-3.5 ${i % 2 ? 'border-l border-white/[0.07]' : ''} ${i > 1 ? 'border-t sm:border-t-0 border-white/[0.07]' : ''} ${i === 2 ? 'sm:border-l border-white/[0.07]' : ''}`}>
                <dt className="text-[11.5px] text-zinc-500">{l}</dt>
                <div className="mt-1 flex items-end justify-between gap-2">
                  <dd className="text-[26px] sm:text-[30px] leading-none font-semibold tracking-[-0.04em] text-white tabular-nums" style={DISPLAY}>{v}</dd>
                  <span className="hidden sm:block"><Spark pts={sp} hue={hue} w={56} /></span>
                </div>
                <div className="mt-1.5 text-[11px]" style={{ color: hue }}>{d}</div>
              </div>
            ))}
          </dl>

          <div className="grid xl:grid-cols-[1.9fr_1fr]">
            {/* map */}
            <div className="px-4 sm:px-6 pt-1 pb-4">
              <div className="flex items-center justify-between border-b border-white/[0.07]">
                <Underline items={LAYERS} value={layer} onChange={setLayer} hue={hue} id="mun-layer" />
              </div>
              <div className="mt-3 relative rounded-xl overflow-hidden border border-white/[0.08] bg-panel-2">
                <svg viewBox="0 0 640 330" className="block w-full h-auto" onMouseLeave={() => setHood(null)}>
                  {HOODS.map((hd, i) => (
                    <polygon key={hd.id} points={hd.pts} fill={hue} fillOpacity={hood === i ? 0.5 : 0.05 + (hd.n[layer] / max) * 0.34} stroke="currentColor" className="text-white cursor-pointer" strokeOpacity={hood === i ? 0.6 : 0.16} onMouseEnter={() => setHood(i)} style={{ transition: 'fill-opacity .3s' }} />
                  ))}
                  <g fill="none" stroke="currentColor" className="text-white" style={{ pointerEvents: 'none' }}>
                    {['M0,40 L640,36', 'M0,88 L640,92', 'M0,150 L640,146', 'M95,0 L100,300', 'M190,0 L195,300', 'M345,0 L342,300', 'M420,0 L418,300', 'M500,0 L505,300', 'M575,0 L578,300'].map((d) => <path key={d} d={d} strokeOpacity="0.13" strokeWidth="1" />)}
                    {['M0,228 L640,222', 'M0,300 L640,300'].map((d) => <path key={d} d={d} strokeOpacity="0.2" strokeWidth="1.6" />)}
                    {['M270,0 L262,300', 'M0,262 L640,258'].map((d) => <path key={d} d={d} strokeOpacity="0.32" strokeWidth="3.2" strokeLinecap="round" />)}
                    <path d="M70,0 C92,70 52,140 108,208 S150,282 140,300" stroke={hue} strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" />
                  </g>
                  <rect x="0" y="300" width="640" height="30" fill="currentColor" className="text-white" fillOpacity="0.05" style={{ pointerEvents: 'none' }} />
                  <g className="fill-zinc-500" style={{ fontSize: 7.5, pointerEvents: 'none' }}>
                    <text x="498" y="33">Teston Rd</text><text x="12" y="85">Major Mackenzie Dr</text><text x="12" y="143">Rutherford Rd</text><text x="12" y="218">Hwy 7</text>
                    <text x="12" y="296">Steeles Ave</text><text x="268" y="12" transform="rotate(-4 268 12)">400</text><text x="600" y="254">407</text>
                    <text x="104" y="12">Islington</text><text x="198" y="12">Weston</text><text x="349" y="12">Jane</text><text x="424" y="12">Keele</text><text x="509" y="12">Dufferin</text><text x="582" y="12">Bathurst</text>
                  </g>
                  <text x="628" y="319" textAnchor="end" className="fill-zinc-500" style={{ fontSize: 8.5, letterSpacing: '0.2em', pointerEvents: 'none' }}>CITY OF TORONTO</text>
                  {HOODS.map((hd) => <text key={hd.id} x={hd.at[0]} y={hd.at[1]} textAnchor="middle" className="fill-zinc-300" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', pointerEvents: 'none' }}>{hd.name}</text>)}
                  {PINS.map(([x, y, c], i) => {
                    const on = layer === 'all' || layer === c;
                    return (
                      <g key={i} style={{ pointerEvents: 'none', opacity: on ? 1 : 0.18, transition: 'opacity .3s' }}>
                        {on && i === tick % PINS.length && <circle cx={x} cy={y} r="3" fill="none" stroke={hue} strokeWidth="1.2"><animate attributeName="r" from="3" to="13" dur="1.4s" repeatCount="indefinite" /><animate attributeName="opacity" from="0.9" to="0" dur="1.4s" repeatCount="indefinite" /></circle>}
                        <circle cx={x} cy={y} r="2.8" fill="currentColor" className="text-white" />
                      </g>
                    );
                  })}
                </svg>
                <div className="absolute left-2 bottom-[2px] text-[11px] text-zinc-300 tabular-nums bg-panel/90 border border-white/[0.08] rounded-md px-2.5 py-1.5">
                  {h ? <><span className="font-semibold text-white">{h.name}</span> · {h.n[layer]} requests this week</> : 'Requests this week. Hover a neighbourhood.'}
                </div>
              </div>
            </div>

            {/* queue */}
            <div className="px-4 sm:px-6 xl:pl-2 pb-4 xl:pt-3.5">
              <div className="flex items-baseline justify-between">
                <div className="text-[13px] font-semibold text-white">Live service requests</div>
                <div className="text-[11.5px] text-zinc-500">created from calls</div>
              </div>
              <ol className="mt-1 relative">
                <>
                  {rows.map((r, i) => (
                    <motion.li key={r.key} initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1 - i * 0.13, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ type: 'spring', stiffness: 260, damping: 28 }} className={`py-2 border-b border-white/[0.07] ${i > 2 ? 'hidden sm:block' : ''}`}>
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-mono text-[10px] text-zinc-500 tabular-nums">SR-{r.no}</span>
                        <span className="text-[12.5px] font-medium text-white truncate">{r.t[0]}</span>
                        <span className="ml-auto text-[10.5px] text-zinc-500">{r.t[3]}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="text-[11.5px] text-zinc-400 truncate">{r.t[1]} · <span className="text-zinc-300">{r.t[2]}</span></span>
                        <span className="ml-auto h-[3px] w-14 rounded-full bg-white/10 overflow-hidden shrink-0"><span className="block h-full rounded-full" style={{ width: `${r.t[4]}%`, background: r.t[4] < 25 ? '#f59e0b' : hue }} /></span>
                      </div>
                    </motion.li>
                  ))}
                </>
              </ol>
            </div>
          </div>

          {/* breakdowns */}
          <div className="hidden sm:grid grid-cols-3 border-t border-white/[0.07] mt-auto">
            <div className="px-6 py-4">
              <div className="text-[12px] font-medium text-white">Calls by hour</div>
              <svg viewBox="0 0 240 58" className="mt-2 w-full h-auto">
                {HOURLY.map((v, i) => {
                  const open = i >= 8 && i < 17;
                  const bh = (v / hmax) * 46;
                  return <rect key={i} x={i * 10 + 1} y={50 - bh} width="7" height={Math.max(2, bh)} rx="1.5" fill={open ? hue : '#f59e0b'} fillOpacity={open ? 0.9 : 0.8} />;
                })}
                <line x1="0" x2="240" y1="50.5" y2="50.5" stroke="currentColor" className="text-white" strokeOpacity="0.2" />
                <text x="0" y="58" className="fill-zinc-500" style={{ fontSize: 6.5 }}>12a</text><text x="80" y="58" className="fill-zinc-500" style={{ fontSize: 6.5 }}>8a</text><text x="160" y="58" className="fill-zinc-500" style={{ fontSize: 6.5 }}>4p</text>
              </svg>
              <div className="mt-1 text-[11px] text-zinc-500">Amber was voicemail before Smart Convo.</div>
            </div>
            <div className="px-6 py-4 border-l border-white/[0.07]">
              <div className="text-[12px] font-medium text-white mb-2.5">Languages today</div>
              <Bars hue={hue} rows={[['English', 62], ['Italian', 11], ['Punjabi', 8], ['Mandarin', 7], ['Russian', 5], ['Persian', 4]]} />
            </div>
            <div className="px-6 py-4 border-l border-white/[0.07]">
              <div className="text-[12px] font-medium text-white mb-2.5">Routed to</div>
              <Bars hue={hue} rows={[['Roads & snow', 31], ['Waste', 24], ['Water', 14], ['Parking', 12], ['By-law', 10], ['Parks', 9]]} />
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ================================================================== *
 * 2. APPAREL: order desk
 * ================================================================== */
const REV = [92, 104, 98, 121, 118, 96, 88, 126, 140, 132, 151, 147, 118, 109, 158, 171, 166, 182, 176, 140, 128, 190, 204, 198, 214, 221, 169, 150, 232, 246];
const ORD = REV.map((v, i) => Math.round(v * 0.43 + ((i * 7) % 5)));
const RET = REV.map((_, i) => Math.round(i < 11 ? 27 + ((i * 3) % 4) : 27 - (i - 10) * 0.55 - ((i * 5) % 3) * 0.4));
const SERIES = {
  rev: { label: 'Revenue protected', data: REV, fmt: (v) => `Rs ${v}k`, head: 'Rs 4.6M', note: 'COD returns down 38% since go-live' },
  ord: { label: 'Orders verified', data: ORD, fmt: (v) => `${v}`, head: '3,240', note: '+24% vs the previous 30 days' },
  ret: { label: 'Return rate', data: RET, fmt: (v) => `${v}%`, head: '17%', note: 'was 28% before confirmation calls' },
};
const smooth = (pts) => pts.reduce((d, [x, y], i, a) => {
  if (!i) return `M${x.toFixed(1)},${y.toFixed(1)}`;
  const [px, py] = a[i - 1];
  const cx = (px + x) / 2;
  return `${d} C${cx.toFixed(1)},${py.toFixed(1)} ${cx.toFixed(1)},${y.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
}, '');
const CITIES = [['Lahore', 612, 14, 24], ['Karachi', 804, 18, 31], ['Islamabad', 402, 12, 22], ['Faisalabad', 301, 19, 29], ['Multan', 221, 21, 30]];
const ORDERS = [
  { item: 'Linen kurta, M', price: 4800, city: 'Lahore', color: '#c9a98a', out: 'Confirmed', who: 'Hamza' },
  { item: 'Denim jacket, L', price: 8900, city: 'Karachi', color: '#4b6a8f', out: 'Address fixed', who: 'Noor' },
  { item: 'Cotton shalwar set, S', price: 5600, city: 'Islamabad', color: '#e8e1d2', out: 'Confirmed', who: 'Usman' },
  { item: 'Silk dupatta', price: 3200, city: 'Faisalabad', color: '#b24a5e', out: 'Rescheduled', who: 'Mahnoor' },
  { item: 'Chino trousers, 34', price: 4200, city: 'Lahore', color: '#6f7a5c', out: 'Confirmed', who: 'Danish' },
  { item: 'Wool shawl', price: 7400, city: 'Multan', color: '#8a6f5a', out: 'Confirmed', who: 'Areeba' },
];
const script = (o, no) => {
  const base = [['ai', `Assalam o alaikum ${o.who} sahab, main Smart Convo se bol rahi hoon. Kya aap ne ${o.item} ka order #${no} diya hai?`], ['cu', 'Ji haan, mera hi order hai.']];
  if (o.out === 'Address fixed') return [...base, ['ai', 'Aap ke address mein house number nahi likha hua. Kya aap bata sakte hain?'], ['cu', 'Ji, house 14, gali 4, DHA phase 5.'], ['ai', 'Shukriya. Address update kar diya. Delivery kal tak ho jayegi.']];
  if (o.out === 'Rescheduled') return [...base, ['ai', 'Delivery kal ho rahi hai. Kya aap mojood honge?'], ['cu', 'Nahi, kal main ghar par nahi hoon. Parson bhej dein.'], ['ai', 'Theek hai, delivery parson ke liye reschedule kar di.']];
  return [...base, ['ai', `COD Rs ${o.price.toLocaleString()} hai. Delivery ${o.city} mein kal tak ho jayegi. Kya main confirm kar doon?`], ['cu', 'Ji kar dein.'], ['ai', 'Order confirm ho gaya. Bohat shukriya!']];
};

function ApparelDashboard({ theme }) {
  const hue = useHue(theme);
  const [tab, setTab] = useState('overview');
  const [series, setSeries] = useState('rev');
  const [hover, setHover] = useState(null);
  const [pinned, setPinned] = useState(null);
  const tick = useTick(3200);
  const S = SERIES[series];
  const W = 600, H = 150;
  const lo = Math.min(...S.data), hi = Math.max(...S.data);
  const xy = S.data.map((v, i) => [6 + (i / 29) * (W - 12), H - 10 - ((v - lo) / (hi - lo || 1)) * (H - 30)]);
  const line = smooth(xy);
  const svgRef = useRef(null);
  const onMove = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    setHover(Math.min(29, Math.max(0, Math.round(((e.clientX - r.left) / r.width) * 29))));
  };
  const list = Array.from({ length: 4 }, (_, k) => {
    const idx = tick + 3 - k;
    return { key: idx, o: ORDERS[idx % ORDERS.length], no: 4821 + idx };
  });
  const sel = list.find((r) => r.key === pinned) || list[0];
  const stages = [['Orders placed', 3240], ['Customer reached', 2980], ['Confirmed on call', 2300], ['Dispatched', 2190]];
  const FH = 80, bw = 7, FW = 300;
  const hh = (v) => (v / 3240) * FH;
  const fx = (i) => (i / 3) * (FW - bw);
  const ribbon = (i) => {
    const a = hh(stages[i][1]), b = hh(stages[i + 1][1]);
    const x1 = fx(i) + bw, x2 = fx(i + 1), m = (x1 + x2) / 2;
    const t1 = (FH - a) / 2, t2 = (FH - b) / 2;
    return `M${x1},${t1} C${m},${t1} ${m},${t2} ${x2},${t2} L${x2},${t2 + b} C${m},${t2 + b} ${m},${t1 + a} ${x1},${t1 + a} Z`;
  };

  return (
    <Frame theme={theme}>
      <header className="flex items-center gap-4 sm:gap-8 px-4 sm:px-6 border-b border-white/[0.07]">
        <div className="flex items-center gap-2.5 py-3"><SmartConvoMark size={20} /><span className="text-[12.5px] font-semibold text-white">Smart Convo</span><span className="hidden sm:inline text-zinc-600">/</span><span className="hidden sm:inline text-[12.5px] text-zinc-300">Apparel Retail Brand</span></div>
        <div className="hidden md:block"><Underline items={[['overview', 'Overview'], ['orders', 'Orders'], ['customers', 'Customers'], ['couriers', 'Couriers']]} value={tab} onChange={setTab} hue={hue} id="app-tab" /></div>
        <div className="ml-auto text-[11.5px] text-zinc-500">Last 30 days · sample data</div>
      </header>

      <dl className="grid grid-cols-2 sm:grid-cols-4 border-b border-white/[0.07]">
        {[
          ['Revenue protected', 'Rs 4.6M', '+31%', [60, 66, 64, 78, 90, 99, 120]],
          ['Orders verified', '3,240', '+24%', [40, 44, 52, 50, 61, 70, 84]],
          ['Return rate', '17%', '−11 pts', [28, 27, 26, 23, 20, 18, 17]],
          ['Avg. confirmation', '42 sec', '−18 sec', [70, 64, 60, 55, 50, 46, 42]],
        ].map(([l, v, d, sp], i) => (
          <div key={l} className={`px-4 sm:px-6 py-3.5 ${i % 2 ? 'border-l border-white/[0.07]' : ''} ${i > 1 ? 'border-t sm:border-t-0 border-white/[0.07]' : ''} ${i === 2 ? 'sm:border-l border-white/[0.07]' : ''}`}>
            <dt className="text-[11.5px] text-zinc-500">{l}</dt>
            <div className="mt-1 flex items-end justify-between gap-2">
              <dd className="text-[24px] sm:text-[28px] leading-none font-semibold tracking-[-0.04em] text-white tabular-nums" style={DISPLAY}>{v}</dd>
              <span className="hidden sm:block"><Spark pts={sp} hue={hue} w={56} /></span>
            </div>
            <div className="mt-1.5 text-[11px]" style={{ color: hue }}>{d} vs previous 30 days</div>
          </div>
        ))}
      </dl>

      <div className="grid lg:grid-cols-[1.55fr_1fr]">
        <div className="px-4 sm:px-6 pt-4 pb-5 min-w-0">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-[12px] text-zinc-500">{hover !== null ? `Day ${hover + 1}` : S.label}</div>
              <div className="mt-1 text-[34px] sm:text-[46px] leading-none font-semibold tracking-[-0.05em] text-white tabular-nums" style={DISPLAY}>{hover !== null ? S.fmt(S.data[hover]) : S.head}</div>
              <div className="mt-1.5 text-[11.5px]" style={{ color: hue }}>{hover !== null ? S.label : S.note}</div>
            </div>
            <div className="flex text-[12px] font-medium rounded-lg border border-white/12 p-0.5">
              {[['rev', 'Revenue'], ['ord', 'Orders'], ['ret', 'Returns']].map(([k, l]) => (
                <button key={k} onClick={() => setSeries(k)} className={`px-2.5 py-1 rounded-md cursor-pointer transition-colors ${series === k ? 'bg-white text-zinc-950 light:text-[#fff]' : 'text-zinc-400 hover:text-white'}`}>{l}</button>
              ))}
            </div>
          </div>
          <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="mt-3 block w-full h-auto overflow-visible cursor-crosshair" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
            <defs><linearGradient id="app-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={hue} stopOpacity="0.26" /><stop offset="1" stopColor={hue} stopOpacity="0" /></linearGradient></defs>
            {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="currentColor" className="text-white" strokeOpacity="0.06" strokeDasharray="2 5" />)}
            <line x1={xy[11][0]} x2={xy[11][0]} y1="0" y2={H} stroke="currentColor" className="text-white" strokeOpacity="0.3" strokeDasharray="3 4" />
            <text x={xy[11][0] + 5} y="9" className="fill-zinc-400" style={{ fontSize: 9 }}>Smart Convo goes live</text>
            <path d={`${line} L${xy[29][0]},${H} L${xy[0][0]},${H} Z`} fill="url(#app-fill)" />
            <path d={line} fill="none" stroke={hue} strokeWidth="2" strokeLinecap="round" />
            {hover !== null && (
              <g><line x1={xy[hover][0]} x2={xy[hover][0]} y1="0" y2={H} stroke="currentColor" className="text-white" strokeOpacity="0.35" /><circle cx={xy[hover][0]} cy={xy[hover][1]} r="4.5" fill={hue} stroke="var(--color-panel)" strokeWidth="2" /></g>
            )}
          </svg>

          <div className="hidden sm:grid grid-cols-[1fr_1.1fr] gap-8 mt-5 pt-4 border-t border-white/[0.07]">
            <div>
              <div className="text-[12px] font-medium text-white mb-2">From order to doorstep</div>
              <svg viewBox={`0 0 ${FW} ${FH}`} className="block w-full h-auto">
                {stages.slice(0, -1).map((_, i) => <path key={i} d={ribbon(i)} fill={hue} fillOpacity={0.36 - i * 0.08} />)}
                {stages.map(([, v], i) => <rect key={i} x={fx(i)} y={(FH - hh(v)) / 2} width={bw} height={hh(v)} rx="2" fill={hue} />)}
              </svg>
              <div className="mt-1.5 grid grid-cols-4 text-[10.5px] leading-tight">
                {stages.map(([l, v], i) => <div key={l} className={i === 3 ? 'text-right' : ''}><div className="font-semibold text-white tabular-nums text-[12px]">{v.toLocaleString()}</div><div className="text-zinc-500">{l}</div></div>)}
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between mb-2"><div className="text-[12px] font-medium text-white">Return rate by city</div><div className="text-[10.5px] text-zinc-500">grey = before</div></div>
              <ul className="space-y-1.5">
                {CITIES.map(([c, , now, was]) => (
                  <li key={c} className="grid grid-cols-[68px_1fr_34px] items-center gap-2 text-[11.5px]">
                    <span className="text-zinc-400">{c}</span>
                    <span className="relative h-[6px] rounded-full bg-white/[0.08]"><span className="absolute inset-y-0 left-0 rounded-full bg-white/25" style={{ width: `${(was / 35) * 100}%` }} /><span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${(now / 35) * 100}%`, background: hue }} /></span>
                    <span className="text-right text-white tabular-nums">{now}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* live orders + transcript */}
        <div className="border-t lg:border-t-0 lg:border-l border-white/[0.07] bg-panel-2/40 px-4 sm:px-6 py-4 flex flex-col">
          <div className="flex items-baseline justify-between"><div className="text-[13px] font-semibold text-white">COD confirmations</div><div className="text-[11.5px] text-zinc-500">live</div></div>
          <div className="mt-3 space-y-2">
            <>
              {list.map((r, i) => {
                const active = r.key === sel.key;
                return (
                  <motion.button key={r.key} layout onClick={() => setPinned(r.key)} initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 280, damping: 26 }} className={`w-full text-left flex items-center gap-3 rounded-lg border p-2 cursor-pointer ${active ? 'bg-panel' : 'bg-transparent hover:bg-panel/60'} ${i > 1 ? 'hidden sm:flex' : ''} ${i > 2 ? 'lg:hidden' : ''}`} style={{ borderColor: active ? hue : 'color-mix(in srgb, var(--color-white) 8%, transparent)' }}>
                    <span className="relative w-8 h-9 rounded shrink-0 overflow-hidden" style={{ background: r.o.color }}><span className="absolute inset-0" style={{ background: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.16) 0 2px, transparent 2px 6px)' }} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12px] font-medium text-white truncate">{r.o.item}</span>
                      <span className="block text-[10.5px] text-zinc-500 truncate">#{r.no} · {r.o.city} · Rs {r.o.price.toLocaleString()}</span>
                    </span>
                    {i === 0 && pinned === null ? (
                      <span className="inline-flex items-end gap-[2px] h-3.5">{[0, 1, 2, 3, 4].map((b) => <motion.span key={b} className="w-[2px] rounded-full" style={{ background: hue }} animate={{ height: ['3px', '13px', '5px'] }} transition={{ duration: 0.9, repeat: Infinity, delay: b * 0.12 }} />)}</span>
                    ) : <span className="text-[11px] font-medium" style={{ color: r.o.out === 'Confirmed' ? hue : 'var(--color-zinc-400)' }}>{r.o.out}</span>}
                  </motion.button>
                );
              })}
            </>
          </div>
          <div className="hidden sm:flex mt-4 pt-3 border-t border-white/[0.07] flex-col flex-1">
            <div className="flex items-baseline justify-between"><div className="text-[12px] font-medium text-white">Call transcript</div><div className="text-[10.5px] text-zinc-500">Roman Urdu · {sel.o.out}</div></div>
            <div className="mt-2 space-y-1.5 text-[11.5px] leading-snug">
              {script(sel.o, sel.no).slice(0, 4).map(([who, t], i) => (
                <div key={`${sel.key}-${i}`} className={who === 'ai' ? '' : 'pl-5'}>
                  <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: who === 'ai' ? hue : 'var(--color-zinc-500)' }}>{who === 'ai' ? 'Smart Convo' : 'Customer'}</span>
                  <div className="text-zinc-300">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ================================================================== *
 * 3. HOSPITAL: scheduler
 * ================================================================== */
const DOCS = [['Dr. Umer Aziz', 'Cardiology'], ['Dr. Hina Saeed', 'Pediatrics'], ['Dr. Faisal Mir', 'General'], ['Dr. Rabia Noor', 'Dental']];
const FIRST = ['Ahmed', 'Mariam', 'Tahir', 'Zoya', 'Hassan', 'Ayan', 'Nadia', 'Bilal', 'Farah', 'Sana', 'Omar', 'Iqra', 'Asad', 'Hira', 'Kiran', 'Imran', 'Rabia', 'Usman'];
const LAST = ['Raza', 'Zafar', 'Mehmood', 'Ali', 'Javed', 'Butt', 'Khan', 'Ahmed', 'Naeem', 'Yousaf', 'Malik', 'Tariq', 'Shah', 'Aslam'];
const NAMES = FIRST.flatMap((f, i) => LAST.slice(i % 5, (i % 5) + 4).map((l) => `${f} ${l}`));
const WALKIN = ['Walk-in', 'Follow-up', 'Report review', 'Vaccination', 'Check-up', 'Scaling', 'ECG follow-up', 'Root canal'];
const TIMES = ['2:14 AM', '11:40 PM', '1:05 AM', '12:22 AM', '6:10 AM', '10:58 PM', '3:30 AM', '9:30 PM', '7:45 AM', '5:20 AM', '10:12 AM'];
const REASONS = [['Chest pain follow-up', 'ECG review', 'Blood pressure'], ['Fever, 3 days', 'Vaccination', 'Growth check'], ['General check-up', 'Lab results', 'Cold and cough'], ['Dental cleaning', 'Tooth pain', 'Braces review']];
const hl = (h) => { const hh = Math.floor(h); const m = Math.round((h - hh) * 60); return `${((hh + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${hh >= 12 ? 'PM' : 'AM'}`; };
const hourLabel = (h) => `${((h + 11) % 12) + 1}${h >= 12 ? 'p' : 'a'}`;
const wasClosed = (at) => {
  if (!at) return false;
  const [t, ap] = at.split(' ');
  let h = parseInt(t, 10) % 12;
  if (ap === 'PM') h += 12;
  return h < 8 || h >= 18;
};
const HR0 = 9, HR1 = 17, ROW = 62;

function makeDay(date) {
  const r = rng(date * 977 + 31);
  const pick = (a) => a[Math.floor(r() * a.length)];
  const appts = [], free = [];
  const pool = [...NAMES].sort(() => r() - 0.5);
  DOCS.forEach((_, d) => {
    let t = 9 + (r() < 0.3 ? 0.5 : 0);
    while (t < 16.5) {
      const len = [0.5, 0.75, 1][Math.floor(r() * 3)];
      if (t + len > 17) break;
      if (r() < 0.2) free.push({ id: `f${d}-${t}`, d, start: t, len });
      else {
        const ai = r() < 0.62;
        appts.push({ id: `a${d}-${t}`, d, start: t, len, ai, who: ai ? pool.pop() : pick(WALKIN), at: ai ? pick(TIMES) : null, reason: pick(REASONS[d]), lang: pick(['Urdu', 'Urdu', 'English', 'Punjabi']), dur: 70 + Math.floor(r() * 90) });
      }
      t += len + (r() < 0.3 ? 0.25 : 0);
    }
  });
  return { appts, free, pool };
}

function Block({ a, sel, onPick, hue, fresh }) {
  return (
    <motion.button
      layout
      onClick={() => onPick(a.id)}
      initial={fresh ? { opacity: 0, scale: 0.85 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="absolute left-1 right-1 rounded-md px-2 py-1 overflow-hidden text-left cursor-pointer"
      style={{
        top: (a.start - HR0) * ROW + 2,
        height: a.len * ROW - 4,
        background: a.ai ? `color-mix(in srgb, ${hue} 20%, var(--color-panel))` : 'transparent',
        border: a.ai ? `1px solid color-mix(in srgb, ${hue} ${sel ? 100 : 55}%, transparent)` : '1px dashed color-mix(in srgb, var(--color-white) 20%, transparent)',
        boxShadow: sel ? `0 0 0 3px color-mix(in srgb, ${hue} 26%, transparent)` : 'none',
      }}
    >
      <div className={`text-[11.5px] font-medium leading-tight truncate ${a.ai ? 'text-white' : 'text-zinc-400'}`}>{a.who}</div>
      {a.ai && a.len >= 0.75 && <div className="text-[10px] leading-tight truncate" style={{ color: hue }}>{a.at ? `Booked ${a.at}` : 'Booked now'}</div>}
    </motion.button>
  );
}

function HospitalDashboard({ theme }) {
  const hue = useHue(theme);
  const mobile = useIsMobile();
  const [date, setDate] = useState(22);
  const [off, setOff] = useState([]);
  const [selId, setSelId] = useState(null);
  const tick = useTick(2800);
  const closed = new Date(2026, 9, date).getDay() === 0;
  const day = useMemo(() => (closed ? { appts: [], free: [], pool: [] } : makeDay(date)), [date, closed]);
  useEffect(() => setSelId(null), [date]);

  const cap = Math.min(day.free.length, 4);
  const fillN = cap ? tick % (cap + 2) : 0;
  const filled = day.free.slice(0, Math.min(fillN, cap)).map((f, i) => ({ ...f, ai: true, who: day.pool[i] || NAMES[i], at: null, reason: REASONS[f.d][i % 3], lang: 'Urdu', dur: 95 }));
  const all = [...day.appts, ...filled];
  const aiAll = all.filter((a) => a.ai);
  const overnight = aiAll.filter((a) => wasClosed(a.at));
  const latest = filled[filled.length - 1];
  const sel = all.find((a) => a.id === selId) || latest || aiAll[0];
  const docs = DOCS.map((d, i) => ({ d, i })).filter(({ i }) => !off.includes(i)).slice(0, mobile ? 3 : 4);

  const first = new Date(2026, 9, 1).getDay();
  const cells = [...Array(first).fill(null), ...Array.from({ length: 31 }, (_, i) => i + 1)];

  return (
    <Frame theme={theme}>
      <div className="grid lg:grid-cols-[188px_1fr] xl:grid-cols-[188px_1fr_236px]">
        {/* left: calendar + doctors */}
        <aside className="hidden lg:block border-r border-white/[0.07] bg-panel-2/50 px-4 py-4">
          <div className="flex items-center gap-2.5"><SmartConvoMark size={21} /><span className="text-[13px] font-semibold text-white">Smart Convo</span></div>
          <div className="mt-1 text-[11px] text-zinc-500">Healthcare · Appointments</div>
          <div className="mt-5 text-[12px] font-semibold text-white">October 2026</div>
          <div className="mt-2 grid grid-cols-7 text-center text-[10px] text-zinc-500">{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((c, i) => <span key={i} className="py-1">{c}</span>)}</div>
          <div className="grid grid-cols-7 text-center text-[11px]">
            {cells.map((c, i) => c === null ? <span key={i} /> : (
              <button key={i} onClick={() => setDate(c)} className={`h-7 rounded-md cursor-pointer tabular-nums transition-colors ${c === date ? '' : new Date(2026, 9, c).getDay() === 0 ? 'text-zinc-600' : 'text-zinc-300 hover:bg-white/[0.07]'}`} style={c === date ? { background: hue, color: '#06231c', fontWeight: 600 } : undefined}>
                {c}
              </button>
            ))}
          </div>
          <div className="mt-5 text-[10.5px] tracking-[0.14em] uppercase text-zinc-500">Doctors</div>
          <ul className="mt-2 space-y-0.5">
            {DOCS.map(([n, sp], i) => (
              <li key={n}>
                <button onClick={() => setOff((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]))} className="w-full flex items-center gap-2.5 py-1.5 text-left cursor-pointer">
                  <span className="w-3.5 h-3.5 rounded-[4px] border flex items-center justify-center" style={{ borderColor: off.includes(i) ? 'color-mix(in srgb, var(--color-white) 30%, transparent)' : hue, background: off.includes(i) ? 'transparent' : hue }}>
                    {!off.includes(i) && <svg width="9" height="9" viewBox="0 0 10 10"><path d="M2 5.2 4.2 7.4 8 2.8" fill="none" stroke="#06231c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </span>
                  <span className="min-w-0"><span className="block text-[12px] text-white truncate">{n}</span><span className="block text-[10.5px] text-zinc-500">{sp}</span></span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-[10.5px] text-zinc-600">Sample data</div>
        </aside>

        {/* centre */}
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3 h-12 px-4 sm:px-6 border-b border-white/[0.07]">
            <div className="flex items-center gap-1">
              <button aria-label="Previous day" onClick={() => setDate((d) => Math.max(1, d - 1))} className="w-7 h-7 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.07] cursor-pointer">‹</button>
              <div className="text-[14px] sm:text-[15px] font-semibold text-white tracking-tight min-w-[150px] text-center" style={DISPLAY}>{new Date(2026, 9, date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
              <button aria-label="Next day" onClick={() => setDate((d) => Math.min(31, d + 1))} className="w-7 h-7 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.07] cursor-pointer">›</button>
            </div>
            <div className="flex items-center gap-4 text-[11.5px] text-zinc-400">
              <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-[3px]" style={{ background: `color-mix(in srgb, ${hue} 28%, var(--color-panel))`, border: `1px solid ${hue}` }} />Smart Convo</span>
              <span className="hidden sm:inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-[3px] border border-dashed border-white/30" />Front desk</span>
            </div>
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-4 border-b border-white/[0.07]">
            {[
              ['Smart Convo bookings', aiAll.length, `${overnight.length} while closed`],
              ['After-hours captured', closed ? '0%' : '42%', '+31% vs front desk only'],
              ['No-show rate', '9%', '−27% with reminder calls'],
              ['Avg. booking time', '1:48', 'was 6:20 on hold'],
            ].map(([l, v, d], i) => (
              <div key={l} className={`px-4 sm:px-6 py-3 ${i % 2 ? 'border-l border-white/[0.07]' : ''} ${i > 1 ? 'hidden sm:block' : ''} ${i === 2 ? 'sm:border-l border-white/[0.07]' : ''}`}>
                <dt className="text-[11.5px] text-zinc-500">{l}</dt>
                <dd className="mt-1 text-[24px] sm:text-[27px] leading-none font-semibold tracking-[-0.04em] text-white tabular-nums" style={DISPLAY}>{v}</dd>
                <div className="mt-1.5 text-[11px]" style={{ color: hue }}>{d}</div>
              </div>
            ))}
          </dl>

          <div className="px-3 sm:px-5 pt-3 pb-4">
            {closed ? (
              <div className="h-[420px] flex flex-col items-center justify-center text-center">
                <div className="text-[15px] font-semibold text-white">Clinic closed on Sundays</div>
                <div className="mt-1 text-[12.5px] text-zinc-400 max-w-xs">Smart Convo still answers calls and books for Monday morning.</div>
              </div>
            ) : (
              <div className="grid" style={{ gridTemplateColumns: `38px repeat(${docs.length}, minmax(0,1fr))` }}>
                <div />
                {docs.map(({ d }) => (
                  <div key={d[0]} className="px-2 pb-2"><div className="text-[12px] font-semibold text-white truncate">{d[0]}</div><div className="text-[10.5px] text-zinc-500">{d[1]}</div></div>
                ))}
                <div className="relative" style={{ height: (HR1 - HR0) * ROW }}>
                  {Array.from({ length: HR1 - HR0 }, (_, i) => <span key={i} className="absolute text-[10px] text-zinc-500 tabular-nums" style={{ top: i * ROW - (i ? 6 : 0) }}>{hourLabel(HR0 + i)}</span>)}
                </div>
                {docs.map(({ i: d }) => (
                  <div key={d} className="relative border-l border-white/[0.07]" style={{ height: (HR1 - HR0) * ROW, backgroundImage: `repeating-linear-gradient(to bottom, color-mix(in srgb, var(--color-white) 7%, transparent) 0 1px, transparent 1px ${ROW}px)` }}>
                    {all.filter((a) => a.d === d).map((a) => <Block key={a.id} a={a} sel={!!sel && sel.id === a.id} onPick={setSelId} hue={hue} fresh={!!latest && a.id === latest.id} />)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* right: appointment detail */}
        <aside className="hidden xl:flex flex-col border-l border-white/[0.07] bg-panel-2/40 px-5 py-5">
          <div className="text-[10.5px] tracking-[0.16em] uppercase text-zinc-500">Appointment</div>
          {sel ? (
            <motion.div key={sel.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="mt-3 flex-1 flex flex-col">
              <div className="text-[20px] font-semibold tracking-[-0.02em] text-white leading-tight" style={DISPLAY}>{sel.who}</div>
              <div className="mt-1 text-[12.5px] text-zinc-400">{sel.reason}</div>
              <dl className="mt-4 text-[12px] divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {[['Doctor', DOCS[sel.d][0]], ['Time', `${hl(sel.start)} to ${hl(sel.start + sel.len)}`], ['Fee', 'Rs 2,500'], ['Language', sel.lang]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2"><dt className="text-zinc-500">{k}</dt><dd className="text-white">{v}</dd></div>
                ))}
              </dl>
              {sel.ai ? (
                <div className="mt-4 text-[12px] leading-relaxed text-zinc-300">
                  <div className="text-[11px] mb-1" style={{ color: hue }}>Booked by Smart Convo</div>
                  Phone call {sel.at ? `at ${sel.at}` : 'just now'}, {Math.floor(sel.dur / 60)}:{String(sel.dur % 60).padStart(2, '0')} long. Confirmation sent on WhatsApp. Reminder call set for 24 hours before.
                </div>
              ) : <div className="mt-4 text-[12px] text-zinc-400">Booked at the front desk.</div>}
              <div className="mt-auto pt-5 text-[11px] text-zinc-500">Select any block on the schedule.</div>
            </motion.div>
          ) : <div className="mt-3 text-[12.5px] text-zinc-500">No appointments.</div>}
        </aside>
      </div>
    </Frame>
  );
}

export { MunicipalDashboard, ApparelDashboard, HospitalDashboard };
