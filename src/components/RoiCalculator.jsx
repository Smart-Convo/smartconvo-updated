import SectionHeading from './SectionHeading';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Building2, 
  ShoppingBag, 
  Stethoscope, 
  TrendingUp, 
  ShieldCheck, 
  PhoneMissed,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { sectionContainerVariants, staggerItemVariants, defaultSectionViewport } from '../utils/motionVariants';

const USD_TO_PKR_RATE = 280;

const VERTICAL_DEFAULTS = {
  'real-estate': {
    name: 'Real Estate Developers',
    subtitle: 'High-Ticket Luxury Villas & Beachfront Closings',
    calls: 50,
    conversion: 20, // 20% call to private site visit / booking token
    missed: 12,
    avgValuePKR: 450000, // Token deposit / agent commission value
    avgValueUSD: 1600,
    unitName: 'Qualified Site Visits / Bookings',
    ticketLabel: 'Avg Deal Commission / Token Value',
    description: 'Calculates the revenue slipping away when high-net-worth property buyers encounter busy lines.'
  },
  'retail': {
    name: 'Retail & E-Commerce',
    subtitle: 'Automated COD Verification & Dispatch',
    calls: 150,
    conversion: 65, // 65% confirmation to fulfilled order
    missed: 35,
    avgValuePKR: 14500, // Avg COD basket
    avgValueUSD: 52,
    unitName: 'COD Orders Confirmed',
    ticketLabel: 'Avg Order / Basket Value',
    description: 'Calculates lost revenue from unverified COD orders and unreturned customer calls.'
  },
  'healthcare': {
    name: 'Healthcare Clinics',
    subtitle: 'Patient Consultations & Diagnostics Intake',
    calls: 80,
    conversion: 50, // 50% caller inquiry to confirmed appointment
    missed: 22,
    avgValuePKR: 18000, // Consultation + lab tests
    avgValueUSD: 65,
    unitName: 'Patient Appointments Booked',
    ticketLabel: 'Avg Patient Consultation / Procedure Fee',
    description: 'Calculates lost appointments when patients call after clinic hours or during peak receptionist rush.'
  }
};

export default function RoiCalculator({ onOpenModal }) {
  const [activeVertical, setActiveVertical] = useState('real-estate');
  const [currency, setCurrency] = useState('PKR'); // 'PKR' | 'USD'
  const [viewScope, setViewScope] = useState('total'); // 'total' (Enterprise) | 'per-branch'

  const currentDefaults = VERTICAL_DEFAULTS[activeVertical];

  const [callsPerDay, setCallsPerDay] = useState(currentDefaults.calls);
  const [callToOrderPercent, setCallToOrderPercent] = useState(currentDefaults.conversion);
  const [missedCallsPerDay, setMissedCallsPerDay] = useState(currentDefaults.missed);
  const [avgOrderValue, setAvgOrderValue] = useState(
    currency === 'PKR' ? currentDefaults.avgValuePKR : currentDefaults.avgValueUSD
  );
  const [daysOpenPerMonth, setDaysOpenPerMonth] = useState(30);
  const [locationsCount, setLocationsCount] = useState(2);

  // Switch Industry Vertical
  const handleVerticalChange = (vertKey) => {
    setActiveVertical(vertKey);
    const def = VERTICAL_DEFAULTS[vertKey];
    setCallsPerDay(def.calls);
    setCallToOrderPercent(def.conversion);
    setMissedCallsPerDay(def.missed);
    setAvgOrderValue(currency === 'PKR' ? def.avgValuePKR : def.avgValueUSD);
  };

  // Switch Currency with proportional value conversion
  const handleCurrencyToggle = (curr) => {
    if (curr === currency) return;
    setCurrency(curr);
    if (curr === 'USD') {
      setAvgOrderValue(prev => Math.max(1, Math.round(prev / USD_TO_PKR_RATE)));
    } else {
      setAvgOrderValue(prev => Math.max(1, Math.round(prev * USD_TO_PKR_RATE)));
    }
  };

  // Safe Math Inputs Sanitization
  const safeCallsPerDay = Math.max(1, callsPerDay || 1);
  const safeMissedCalls = Math.min(safeCallsPerDay, Math.max(1, missedCallsPerDay || 1));
  const safeConversion = Math.min(100, Math.max(1, callToOrderPercent || 1));
  const safeDays = Math.min(31, Math.max(1, daysOpenPerMonth || 30));
  const safeLocations = Math.min(100, Math.max(1, locationsCount || 1));
  const safeAvgValue = Math.max(0, avgOrderValue || 0);

  // Derived Calculations
  const missedRatePercent = Math.round((safeMissedCalls / safeCallsPerDay) * 100);

  // Per single location/branch metrics
  const singleBranchMonthlyMissedCalls = safeMissedCalls * safeDays;
  const singleBranchMonthlyLostDeals = Math.round(singleBranchMonthlyMissedCalls * (safeConversion / 100));
  const singleBranchMonthlyLoss = singleBranchMonthlyLostDeals * safeAvgValue;
  const singleBranchAnnualLoss = singleBranchMonthlyLoss * 12;
  const singleBranchMonthlyRecovered = Math.round(singleBranchMonthlyLoss * 0.85);

  // Total enterprise (all locations) metrics
  const totalMonthlyMissedCalls = singleBranchMonthlyMissedCalls * safeLocations;
  const totalMonthlyLostDeals = singleBranchMonthlyLostDeals * safeLocations;
  const totalMonthlyLoss = singleBranchMonthlyLoss * safeLocations;
  const totalAnnualLoss = totalMonthlyLoss * 12;

  // Smart Convo Guaranteed Recovery (85% industry standard recovery)
  const totalMonthlyRecovered = Math.round(totalMonthlyLoss * 0.85);
  const totalAnnualRecovered = totalMonthlyRecovered * 12;

  // Formatting Helper
  const formatMoney = (val) => {
    if (currency === 'PKR') {
      return new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(val) + ' PKR';
    }
    return '$ ' + new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val);
  };

  // Display values based on toggle scope
  const displayMonthlyRecovered = viewScope === 'total' ? totalMonthlyRecovered : singleBranchMonthlyRecovered;
  const displayAnnualRecovered = viewScope === 'total' ? totalAnnualRecovered : singleBranchMonthlyRecovered * 12;
  const displayMonthlyLoss = viewScope === 'total' ? totalMonthlyLoss : singleBranchMonthlyLoss;
  const displayAnnualLoss = viewScope === 'total' ? totalAnnualLoss : singleBranchAnnualLoss;
  const displayMissedCalls = viewScope === 'total' ? totalMonthlyMissedCalls : singleBranchMonthlyMissedCalls;
  const displayLostDeals = viewScope === 'total' ? totalMonthlyLostDeals : singleBranchMonthlyLostDeals;

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
        
        {/* Header */}
        <motion.div variants={staggerItemVariants} className="text-center max-w-3xl mx-auto mb-10">
          <SectionHeading eyebrow="ROI calculator" lead="See what missed calls could" accent="be costing your enterprise" className="mb-5" />
          <p className="text-zinc-300 ios-subtext sm:text-[16px] max-w-2xl mx-auto leading-relaxed">
            Select your industry vertical below to calculate the revenue slipping through your phone lines and what Smart Convo Voice AI recovers.
          </p>
        </motion.div>

        {/* 3 Industry Toggle Buttons + Currency Selector */}
        <motion.div variants={staggerItemVariants} className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-800">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleVerticalChange('real-estate')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-[13px] font-extrabold tracking-tight flex items-center gap-2 transition-all cursor-pointer ${
                activeVertical === 'real-estate'
                  ? 'bg-[#D4FF00] text-zinc-950 shadow-[0_0_14px_rgba(212,255,0,0.4)]'
                  : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <Building2 className="w-4 h-4" strokeWidth={2.5} />
              <span>Real Estate Developers</span>
            </button>
            <button
              onClick={() => handleVerticalChange('retail')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-[13px] font-extrabold tracking-tight flex items-center gap-2 transition-all cursor-pointer ${
                activeVertical === 'retail'
                  ? 'bg-[#D4FF00] text-zinc-950 shadow-[0_0_14px_rgba(212,255,0,0.4)]'
                  : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={2.5} />
              <span>Retail & E-Commerce</span>
            </button>
            <button
              onClick={() => handleVerticalChange('healthcare')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-[13px] font-extrabold tracking-tight flex items-center gap-2 transition-all cursor-pointer ${
                activeVertical === 'healthcare'
                  ? 'bg-[#D4FF00] text-zinc-950 shadow-[0_0_14px_rgba(212,255,0,0.4)]'
                  : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <Stethoscope className="w-4 h-4" strokeWidth={2.5} />
              <span>Healthcare Clinics</span>
            </button>
          </div>

          {/* Currency Toggle */}
          <div className="inline-flex p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold shadow-md">
            <button
              onClick={() => handleCurrencyToggle('PKR')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                currency === 'PKR' ? 'bg-[#0066FF] text-white shadow-xs' : 'text-zinc-400 hover:text-white'
              }`}
            >
              PKR (Rs)
            </button>
            <button
              onClick={() => handleCurrencyToggle('USD')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                currency === 'USD' ? 'bg-[#0066FF] text-white shadow-xs' : 'text-zinc-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>
        </motion.div>

        {/* The Dual Column Calculator Box */}
        <motion.div variants={staggerItemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Sliders & Operational Parameters */}
          <div className="lg:col-span-7 bg-zinc-900/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Operational Parameters
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {currentDefaults.subtitle}
                </p>
              </div>
              <span className="ios-badge text-[11px] font-bold text-[#D4FF00] bg-zinc-800/90 px-3 py-1 rounded-full border border-zinc-700">
                {currentDefaults.name}
              </span>
            </div>

            {/* Slider 1: Calls Received Per Day */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-200">Calls Received Per Day (Per Branch)</span>
                <span className="font-mono font-bold text-white text-sm bg-zinc-800 px-2.5 py-0.5 rounded-md border border-zinc-700 shadow-xs">
                  {safeCallsPerDay.toLocaleString()} calls
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="5"
                value={safeCallsPerDay}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCallsPerDay(val);
                  // Intelligently adapt missed calls so it never exceeds total calls
                  if (safeMissedCalls > val) {
                    setMissedCallsPerDay(Math.max(1, Math.round(val * 0.25)));
                  }
                }}
                className="certus-slider"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                <span>10 calls/day</span>
                <span>1,000 calls/day</span>
              </div>
            </div>

            {/* Slider 2: Missed Calls Per Day (Clamped & Validated) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5">
                  <PhoneMissed className="w-3.5 h-3.5 text-rose-400" />
                  <span className="font-semibold text-zinc-200">Missed Calls Per Day (Overflow + After Hours)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-rose-400">
                    {missedRatePercent}% missed
                  </span>
                  <span className="font-mono font-bold text-rose-400 text-sm bg-zinc-800 px-2.5 py-0.5 rounded-md border border-zinc-700 shadow-xs">
                    {safeMissedCalls.toLocaleString()} calls
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max={safeCallsPerDay}
                step="1"
                value={safeMissedCalls}
                onChange={(e) => setMissedCallsPerDay(Number(e.target.value))}
                className="certus-slider"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                <span>1 call ({Math.round((1 / safeCallsPerDay) * 100)}%)</span>
                <span>{safeCallsPerDay} calls (100% capacity lost)</span>
              </div>
            </div>

            {/* Slider 3: Conversion Rate % */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="font-semibold text-zinc-200">Call-to-Deal Conversion Rate</span>
                  <div className="text-[11px] text-zinc-400">{currentDefaults.unitName}</div>
                </div>
                <span className="font-mono font-bold text-[#D4FF00] text-sm bg-zinc-800 px-2.5 py-0.5 rounded-md border border-zinc-700 shadow-xs">
                  {safeConversion}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="1"
                value={safeConversion}
                onChange={(e) => setCallToOrderPercent(Number(e.target.value))}
                className="certus-slider"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                <span>5% (Conservative)</span>
                <span>80% (High Urgency)</span>
              </div>
            </div>

            {/* Bottom Row Number Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
              
              <div>
                <label className="block ios-caption font-semibold text-zinc-300 mb-1.5">
                  {currentDefaults.ticketLabel}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">
                    {currency === 'PKR' ? 'Rs' : '$'}
                  </span>
                  <input
                    type="number"
                    min="0"
                    step={currency === 'PKR' ? '500' : '10'}
                    value={avgOrderValue}
                    onChange={(e) => setAvgOrderValue(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-xs font-bold text-white focus:outline-none focus:border-[#D4FF00]"
                  />
                </div>
              </div>

              <div>
                <label className="block ios-caption font-semibold text-zinc-300 mb-1.5">
                  Operating Days / Mo
                </label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={daysOpenPerMonth}
                  onChange={(e) => setDaysOpenPerMonth(Math.min(31, Math.max(1, Number(e.target.value) || 1)))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-xs font-bold text-white focus:outline-none focus:border-[#D4FF00]"
                />
              </div>

              <div>
                <label className="block ios-caption font-semibold text-zinc-300 mb-1.5">
                  Projects / Locations
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={locationsCount}
                  onChange={(e) => setLocationsCount(Math.min(50, Math.max(1, Number(e.target.value) || 1)))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-xs font-bold text-white focus:outline-none focus:border-[#D4FF00]"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Real-Time ROI Impact Card */}
          <div className="lg:col-span-5 bg-zinc-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-2xl border border-zinc-800 relative overflow-hidden">
            
            <div>
              {/* Header with Scope Switcher */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#D4FF00]" />
                  <span className="ios-badge text-[11px] font-bold tracking-wider text-zinc-300 uppercase">
                    Pipeline Impact Model
                  </span>
                </div>

                {/* Scope Switcher Pill */}
                <div className="inline-flex p-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-bold">
                  <button
                    onClick={() => setViewScope('total')}
                    className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                      viewScope === 'total' ? 'bg-[#D4FF00] text-zinc-950 font-extrabold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Enterprise ({safeLocations} {safeLocations === 1 ? 'Site' : 'Sites'})
                  </button>
                  <button
                    onClick={() => setViewScope('per-branch')}
                    className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                      viewScope === 'per-branch' ? 'bg-[#D4FF00] text-zinc-950 font-extrabold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Per Site
                  </button>
                </div>
              </div>

              {/* Highlight 1: Projected Recovered Revenue with Smart Convo */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800/90 border border-zinc-700/80 space-y-2 mb-4 shadow-lg relative">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#D4FF00]/15 border border-[#D4FF00]/30 text-[#D4FF00] text-[10px] font-bold tracking-wide uppercase">
                  <Sparkles className="w-3 h-3" />
                  <span>Smart Convo 85% Recovery Engine</span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-[#D4FF00] tracking-tight font-mono">
                  +{formatMoney(displayMonthlyRecovered)}
                </div>
                
                <div className="text-xs font-semibold text-zinc-200">
                  Projected Monthly Revenue Recovered
                </div>

                <div className="text-[11px] text-zinc-400 pt-2 border-t border-zinc-800 flex justify-between items-center">
                  <span>Annual Pipeline Added:</span>
                  <strong className="text-white font-mono font-bold">+{formatMoney(displayAnnualRecovered)}</strong>
                </div>
              </div>

              {/* Highlight 2: Current Revenue Lost */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2 mb-5">
                <div className="flex justify-between items-center">
                  <span className="ios-caption text-zinc-400">Current Monthly Revenue Lost:</span>
                  <span className="text-sm font-bold text-rose-400 font-mono">
                    -{formatMoney(displayMonthlyLoss)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-zinc-400 pt-1 border-t border-zinc-800/60">
                  <span>Annual Lost Revenue:</span>
                  <span className="font-mono text-zinc-300 font-semibold">-{formatMoney(displayAnnualLoss)}</span>
                </div>
              </div>

              {/* 3-Pill Operational Stat Breakdown */}
              <div className="grid grid-cols-3 gap-2 text-center mb-6">
                <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <div className="font-mono font-bold text-white text-xs sm:text-sm">
                    {displayMissedCalls.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Missed Calls/Mo</div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <div className="font-mono font-bold text-rose-400 text-xs sm:text-sm">
                    {displayLostDeals.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Lost Deals/Mo</div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <div className="font-mono font-bold text-emerald-400 text-xs sm:text-sm">
                    &lt; 850ms
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Voice Latency</div>
                </div>
              </div>

              <p className="ios-subtext text-xs text-zinc-400 leading-relaxed mb-6">
                Smart Convo ensures every call is picked up on the first ring, qualified in natural Urdu & English, and logged into your CRM within seconds.
              </p>
            </div>

            {/* Bottom Action CTA */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <button
                onClick={() => onOpenModal({
                  monthlyLoss: totalMonthlyLoss,
                  annualLoss: totalAnnualLoss,
                  recoveredMonthly: totalMonthlyRecovered,
                  annualRecovered: totalAnnualRecovered,
                  missedCallsMonth: totalMonthlyMissedCalls,
                  missedDealsMonth: totalMonthlyLostDeals,
                  locations: safeLocations,
                  industry: currentDefaults.name,
                  avgOrderValue: safeAvgValue,
                  currency
                })}
                className="w-full py-3.5 px-6 rounded-full bg-[#D4FF00] hover:bg-[#c6ee00] text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(212,255,0,0.4)] border border-[#bfe800] transition-all cursor-pointer active:scale-[0.99]"
              >
                <span>Book Architecture Review to Recover {formatMoney(displayMonthlyRecovered)}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-center ios-caption text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Free demo · No obligation</span>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </motion.section>
  );
}
