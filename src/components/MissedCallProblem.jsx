import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { useTheme } from './ThemeProvider';
import StackedCards from './StackedCards';
import { CountUp, Kpi, Panel, Donut, DashboardShell, HeroMetric, Ring, LiveFeed, Heatmap } from './DashKit';
import { sectionContainerVariants, staggerItemVariants, defaultSectionViewport } from '../utils/motionVariants';

const LIME = '#D4FF00';
const BAR_BASE = '#3a3b42';
// Same Smart Convo look for all three; each gets a subtle hue added on top of the lime
const THEMES = {
  municipal: { hue: '#5B9BFF', hueDark: '#2563eb', tint: 'rgba(91,155,255,0.035)', bar: '#34445f', barLight: '#cddcf6', border: 'rgba(91,155,255,0.16)', frame: 'rgba(91,155,255,0.22)', glow: 'rgba(91,155,255,0.16)' },
  apparel:   { hue: '#FF7A9C', hueDark: '#e11d48', tint: 'rgba(255,122,156,0.035)', bar: '#5a3844', barLight: '#f7d3dc', border: 'rgba(255,122,156,0.16)', frame: 'rgba(255,122,156,0.22)', glow: 'rgba(255,122,156,0.15)' },
  hospital:  { hue: '#34D6B0', hueDark: '#0d9488', tint: 'rgba(52,214,176,0.035)', bar: '#2f5149', barLight: '#c6ebe0', border: 'rgba(52,214,176,0.16)', frame: 'rgba(52,214,176,0.22)', glow: 'rgba(52,214,176,0.15)' },
};
const seg = (hue, light) => [light ? hue : hue, `${hue}aa`, `${hue}66`, light ? '#c3c7ce' : '#52525B', light ? '#dcdfe4' : '#3A3A40'];
const donut = (theme, items, light) => items.map(([label, value], i) => ({ label, value, color: seg(theme.hue, light)[i] }));

function Layout({ theme, hero, kpis, donutProps, heat, feed }) {
  const { isLight } = useTheme();
  const data = donutProps.build(isLight);
  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="grid lg:grid-cols-[1.35fr_1fr] gap-2 sm:gap-3">
        <HeroMetric {...hero} ring={<div className="shrink-0 scale-[0.72] sm:scale-100 origin-top-right"><Ring value={hero.ringValue} label={hero.ringLabel} size={96} /></div>} />
        <LiveFeed rows={feed} max={3} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">{kpis}</div>
      <div className="hidden sm:grid lg:grid-cols-[1fr_1.2fr] gap-2 sm:gap-3">
        <Panel title={donutProps.title} right={donutProps.right}>
          <Donut size={96} thickness={11} center={donutProps.center} data={data} />
        </Panel>
        <Heatmap seed={heat} />
      </div>
    </div>
  );
}

const K = (label, value, extra = {}) => ({ label, value, ...extra });

function MunicipalityDash() {
  return (
    <DashboardShell workspace="Municipal Corporation" theme={THEMES.municipal}>
      <Layout
        theme={THEMES.municipal}
        heat={0}
        hero={{ label: 'Citizen calls answered', value: 12480, sub: '+18% vs last month', points: [30, 36, 34, 44, 50, 49, 62, 70, 78, 92], ringValue: 100, ringLabel: 'Answered' }}
        kpis={<>
          <Kpi label="Avg. answer time" spark={[3, 2.6, 2, 1.4, 1, 0.5, 0.2, 0]}><CountUp value={0} suffix=" sec" /></Kpi>
          <Kpi label="Resolved first call" delta="+9%" spark={[78, 80, 79, 83, 85, 87, 89, 91]}><CountUp value={91} suffix="%" /></Kpi>
          <Kpi label="Complaints routed" spark={[20, 26, 24, 33, 38, 44, 52, 61]}><CountUp value={3206} /></Kpi>
          <Kpi label="Citizen rating" delta="+0.4" spark={[4.1, 4.2, 4.2, 4.4, 4.5, 4.6, 4.7, 4.8]}><CountUp value={4.8} decimals={1} suffix="/5" /></Kpi>
        </>}
        donutProps={{ title: 'Calls by department', right: '12.5k', center: { value: '12.5k', label: 'Calls' }, build: (l) => donut(THEMES.municipal, [['Water & sewage', 34], ['Waste', 22], ['Roads', 18], ['Billing', 16], ['Other', 10]], l) }}
        feed={[
          { who: 'Ayesha Khan', intent: 'Water leak report', status: 'Resolved' },
          { who: 'Bilal Ahmed', intent: 'Missed waste collection', status: 'Routed' },
          { who: 'Sara Malik', intent: 'Bill dispute', status: 'Escalated' },
          { who: 'Omar Farooq', intent: 'Street light outage', status: 'Routed' },
          { who: 'Hina Raza', intent: 'Property tax query', status: 'Resolved' },
          { who: 'Zeeshan Ali', intent: 'Pothole on Canal Road', status: 'Routed' },
        ]}
      />
    </DashboardShell>
  );
}

function ApparelDash() {
  return (
    <DashboardShell workspace="Apparel Retail Brand" theme={THEMES.apparel}>
      <Layout
        theme={THEMES.apparel}
        heat={2}
        hero={{ label: 'Revenue protected', value: 4.2, prefix: 'Rs ', suffix: 'M', decimals: 1, sub: 'COD returns down 38%', points: [22, 28, 26, 40, 46, 58, 64, 72, 86, 96], ringValue: 71, ringLabel: 'Confirmed' }}
        kpis={<>
          <Kpi label="Orders verified" delta="+24%" spark={[40, 46, 44, 56, 60, 70, 82, 94]}><CountUp value={3240} /></Kpi>
          <Kpi label="Return rate" delta="-38%" down spark={[28, 27, 25, 24, 21, 19, 18, 17]}><CountUp value={17} suffix="%" /></Kpi>
          <Kpi label="Avg. confirm time" spark={[70, 64, 60, 55, 50, 47, 44, 42]}><CountUp value={42} suffix=" sec" /></Kpi>
          <Kpi label="Addresses fixed" delta="+12%" spark={[8, 10, 9, 14, 16, 19, 23, 26]}><CountUp value={292} /></Kpi>
        </>}
        donutProps={{ title: 'Order outcomes', right: '3,240 orders', center: { value: '71%', label: 'Confirmed' }, build: (l) => donut(THEMES.apparel, [['Confirmed', 71], ['Rescheduled', 14], ['Address fixed', 9], ['Cancelled', 6]], l) }}
        feed={[
          { who: 'Hamza Raza', intent: 'COD order #4821', status: 'Verified' },
          { who: 'Noor Fatima', intent: 'Address fix #4819', status: 'Verified' },
          { who: 'Usman Tariq', intent: 'Reschedule #4812', status: 'Rescheduled' },
          { who: 'Mahnoor Iqbal', intent: 'COD order #4830', status: 'Verified' },
          { who: 'Danish Butt', intent: 'COD order #4833', status: 'Verified' },
          { who: 'Areeba Shah', intent: 'Size exchange #4799', status: 'Routed' },
        ]}
      />
    </DashboardShell>
  );
}

function HospitalDash() {
  return (
    <DashboardShell workspace="Healthcare" theme={THEMES.hospital}>
      <Layout
        theme={THEMES.hospital}
        heat={1}
        hero={{ label: 'Appointments booked', value: 1860, sub: '+31% after-hours captured', points: [18, 24, 30, 28, 40, 52, 58, 70, 82, 95], ringValue: 87, ringLabel: 'Filled' }}
        kpis={<>
          <Kpi label="After-hours captured" spark={[20, 24, 28, 31, 34, 37, 40, 42]}><CountUp value={42} suffix="%" /></Kpi>
          <Kpi label="No-show rate" delta="-27%" down spark={[15, 14, 13, 12, 11, 10, 9.5, 9]}><CountUp value={9} suffix="%" /></Kpi>
          <Kpi label="Avg. booking time" spark={[160, 150, 140, 130, 124, 118, 112, 108]}><CountUp value={108} suffix=" sec" /></Kpi>
          <Kpi label="New patients" delta="+19%" spark={[300, 340, 360, 410, 470, 520, 580, 624]}><CountUp value={624} /></Kpi>
        </>}
        donutProps={{ title: 'Bookings by department', right: '1,860', center: { value: '1.9k', label: 'Booked' }, build: (l) => donut(THEMES.hospital, [['Cardiology', 28], ['General', 24], ['Pediatrics', 18], ['Dental', 16], ['Other', 14]], l) }}
        feed={[
          { who: 'Ahmed Raza', intent: 'Cardiology, Dr. Umer Aziz', status: 'Booked' },
          { who: 'Mariam Zafar', intent: 'Pediatrics check-up', status: 'Booked' },
          { who: 'Imran Shah', intent: 'Report collection', status: 'Resolved' },
          { who: 'Farah Naeem', intent: 'Dental cleaning', status: 'Booked' },
          { who: 'Tahir Mehmood', intent: 'ECG follow-up', status: 'Booked' },
          { who: 'Sana Yousaf', intent: 'Lab sample pickup', status: 'Booked' },
        ]}
      />
    </DashboardShell>
  );
}

export default function MissedCallProblem() {
  return (
    <motion.section
      id="missed-call"
      initial="hidden"
      whileInView="visible"
      viewport={defaultSectionViewport}
      variants={sectionContainerVariants}
      className="py-12 sm:py-24 bg-transparent"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={staggerItemVariants} className="text-center max-w-3xl mx-auto mb-6 sm:mb-14">
          <SectionHeading eyebrow="The missed-call problem" lead="Why missed calls cost" accent="more than you think." className="mb-4 sm:mb-5" />
          <p className="text-[12.5px] sm:text-[17px] text-zinc-400 leading-relaxed">
            Every unanswered ring is a lost customer. See what changes when every call is picked up, for a city, a clothing brand and a hospital.
          </p>
        </motion.div>

        <StackedCards step={14} scaleStep={0.04} dimStep={0.18} className="[--stack-min:590px] sm:[--stack-min:670px]">
          <MunicipalityDash />
          <ApparelDash />
          <HospitalDash />
        </StackedCards>
      </div>
    </motion.section>
  );
}
