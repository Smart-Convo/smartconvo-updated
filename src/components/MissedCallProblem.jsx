import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { useTheme } from './ThemeProvider';
import StackedCards from './StackedCards';
import { CountUp, Kpi, Panel, Donut, Bars, AreaLine, DashboardShell, CallTable } from './DashKit';
import { sectionContainerVariants, staggerItemVariants, defaultSectionViewport } from '../utils/motionVariants';

const LIME = '#D4FF00';
const BAR_BASE = '#3a3b42';
// Same Smart Convo look for all three; each gets a subtle hue added on top of the lime
const THEMES = {
  municipal: { hue: '#5B9BFF', tint: 'rgba(91,155,255,0.07)', bar: '#34445f', barLight: '#cddcf6', border: 'rgba(91,155,255,0.16)', frame: 'rgba(91,155,255,0.22)', glow: 'rgba(91,155,255,0.16)' },
  apparel:   { hue: '#FF7A9C', tint: 'rgba(255,122,156,0.07)', bar: '#5a3844', barLight: '#f7d3dc', border: 'rgba(255,122,156,0.16)', frame: 'rgba(255,122,156,0.22)', glow: 'rgba(255,122,156,0.15)' },
  hospital:  { hue: '#34D6B0', tint: 'rgba(52,214,176,0.07)', bar: '#2f5149', barLight: '#c6ebe0', border: 'rgba(52,214,176,0.16)', frame: 'rgba(52,214,176,0.22)', glow: 'rgba(52,214,176,0.15)' },
};
const seg = (hue, light) => [light ? '#7c3aed' : LIME, hue, `${hue}99`, light ? '#c3c7ce' : '#52525B', light ? '#dcdfe4' : '#3A3A40'];
const donut = (theme, items, light) => items.map(([label, value], i) => ({ label, value, color: seg(theme.hue, light)[i] }));

function Layout({ theme, kpis, donutProps, barsProps, trend, rows }) {
  const { isLight } = useTheme();
  const data = donutProps.build(isLight);
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">{kpis}</div>
      <div className="mt-2 sm:mt-3 grid lg:grid-cols-[1.15fr_1fr] gap-2 sm:gap-3">
        <Panel title={donutProps.title} right={donutProps.right}>
          <Donut size={100} thickness={11} center={donutProps.center} data={data} />
        </Panel>
        <Panel title={barsProps.title} right={barsProps.right} className="hidden sm:block">
          <Bars values={barsProps.values} labels={barsProps.labels} color={isLight ? theme.barLight : theme.bar} height={92} highlight={barsProps.highlight} />
        </Panel>
      </div>
      <div className="mt-2 sm:mt-3 grid lg:grid-cols-[1fr_1fr] gap-2 sm:gap-3">
        <CallTable rows={rows} />
        <Panel title={trend.title} right={trend.right} className="hidden lg:block">
          <AreaLine points={trend.points} color={theme.hue} height={110} labels={trend.labels} />
        </Panel>
      </div>
    </>
  );
}

function MunicipalityDash() {
  return (
    <DashboardShell workspace="Municipal Corporation" theme={THEMES.municipal}>
      <Layout theme={THEMES.municipal}
        kpis={<>
          <Kpi label="Calls handled" delta="+18%"><CountUp value={12480} /></Kpi>
          <Kpi label="Avg. answer time"><CountUp value={0} suffix=" sec" /></Kpi>
          <Kpi label="Resolved on first call" delta="+9%"><CountUp value={91} suffix="%" /></Kpi>
          <Kpi label="Complaints routed"><CountUp value={3206} /></Kpi>
        </>}
        donutProps={{ title: 'Calls by department', right: '12.5k', center: { value: '12.5k', label: 'Calls' }, build: (l) => donut(THEMES.municipal, [['Water & sewage', 34], ['Waste', 22], ['Roads', 18], ['Billing', 16], ['Other', 10]], l) }}
        barsProps={{ title: 'Calls by hour', right: 'Peak 11 AM', values: [18, 34, 62, 88, 100, 74, 58, 66, 52, 40, 26, 14], labels: ['8', '', '', '11', '', '', '2', '', '', '5', '', '8'], highlight: 4 }}
        trend={{ title: 'First-call resolution', right: '8 weeks', points: [78, 80, 79, 83, 85, 87, 89, 91], labels: ['W1', 'W4', 'W8'] }}
        rows={[
          { who: 'Ayesha Khan', intent: 'Water leak report', dur: '1:12', status: 'Resolved' },
          { who: 'Bilal Ahmed', intent: 'Missed waste collection', dur: '0:48', status: 'Routed' },
          { who: 'Sara Malik', intent: 'Bill dispute', dur: '2:05', status: 'Escalated' },
        ]}
      />
    </DashboardShell>
  );
}

function ApparelDash() {
  return (
    <DashboardShell workspace="Apparel Retail Brand" theme={THEMES.apparel}>
      <Layout theme={THEMES.apparel}
        kpis={<>
          <Kpi label="Orders verified" delta="+24%"><CountUp value={3240} /></Kpi>
          <Kpi label="Return rate" delta="-38%"><CountUp value={17} suffix="%" /></Kpi>
          <Kpi label="Revenue protected"><CountUp value={4.2} decimals={1} prefix="Rs " suffix="M" /></Kpi>
          <Kpi label="Avg. confirm time"><CountUp value={42} suffix=" sec" /></Kpi>
        </>}
        donutProps={{ title: 'Order outcomes', right: '3,240 orders', center: { value: '71%', label: 'Confirmed' }, build: (l) => donut(THEMES.apparel, [['Confirmed', 71], ['Rescheduled', 14], ['Address fixed', 9], ['Cancelled', 6]], l) }}
        barsProps={{ title: 'Orders verified per day', right: 'Peak Sat', values: [62, 70, 66, 78, 92, 100, 74], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], highlight: 5 }}
        trend={{ title: 'Return rate', right: 'Falling', points: [28, 27, 25, 24, 21, 19, 18, 17], labels: ['W1', 'W4', 'W8'] }}
        rows={[
          { who: 'Hamza Raza', intent: 'COD order #4821', dur: '0:41', status: 'Verified' },
          { who: 'Noor Fatima', intent: 'Address correction #4819', dur: '1:03', status: 'Verified' },
          { who: 'Usman Tariq', intent: 'Delivery reschedule #4812', dur: '0:52', status: 'Rescheduled' },
        ]}
      />
    </DashboardShell>
  );
}

function HospitalDash() {
  return (
    <DashboardShell workspace="Healthcare" theme={THEMES.hospital}>
      <Layout theme={THEMES.hospital}
        kpis={<>
          <Kpi label="Appointments booked" delta="+31%"><CountUp value={1860} /></Kpi>
          <Kpi label="After-hours calls captured"><CountUp value={42} suffix="%" /></Kpi>
          <Kpi label="No-show rate" delta="-27%"><CountUp value={9} suffix="%" /></Kpi>
          <Kpi label="Avg. booking time"><CountUp value={108} suffix=" sec" /></Kpi>
        </>}
        donutProps={{ title: 'Bookings by department', right: '1,860', center: { value: '1.9k', label: 'Booked' }, build: (l) => donut(THEMES.hospital, [['Cardiology', 28], ['General', 24], ['Pediatrics', 18], ['Dental', 16], ['Other', 14]], l) }}
        barsProps={{ title: 'Bookings by weekday', right: 'Peak Tue', values: [84, 100, 90, 82, 76, 48, 30], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], highlight: 1 }}
        trend={{ title: 'Slots filled', right: '8 weeks', points: [64, 68, 71, 74, 79, 82, 85, 87], labels: ['W1', 'W4', 'W8'] }}
        rows={[
          { who: 'Ahmed Raza', intent: 'Cardiology, Dr. Umer Aziz', dur: '1:48', status: 'Booked' },
          { who: 'Mariam Zafar', intent: 'Pediatrics check-up', dur: '1:20', status: 'Booked' },
          { who: 'Imran Shah', intent: 'Report collection query', dur: '0:36', status: 'Resolved' },
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

        <StackedCards step={14} scaleStep={0.04} dimStep={0.18}>
          <MunicipalityDash />
          <ApparelDash />
          <HospitalDash />
        </StackedCards>
      </div>
    </motion.section>
  );
}
