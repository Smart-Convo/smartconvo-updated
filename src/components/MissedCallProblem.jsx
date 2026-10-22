import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import StackedCards from './StackedCards';
import DayDashboard, { fmt } from './DayView';
import { sectionContainerVariants, staggerItemVariants, defaultSectionViewport } from '../utils/motionVariants';

// Same Smart Convo look for all three; each gets its own hue
const THEMES = {
  municipal: { hue: '#5B9BFF', hueDark: '#2563eb', frame: 'rgba(91,155,255,0.22)' },
  apparel:   { hue: '#FF7A9C', hueDark: '#e11d48', frame: 'rgba(255,122,156,0.22)' },
  hospital:  { hue: '#34D6B0', hueDark: '#0d9488', frame: 'rgba(52,214,176,0.22)' },
};

const answeredStat = (A, N, M) => ({ key: 'ans', label: 'Calls answered', before: A, after: N, fmt: fmt.int, note: `${M} went unanswered` });
const rate = (A, N) => ({ key: 'rate', label: 'Answer rate', before: (A / N) * 100, after: 100, fmt: fmt.pct, note: 'Rest hit voicemail or rang out' });

const CFG = {
  municipal: {
    seed: 11, total: 118, workspace: 'Municipal Corporation', recovered: 'complaint logged',
    topics: ['Water leak report', 'Missed waste pickup', 'Street light outage', 'Bill dispute', 'Property tax query', 'Pothole on Canal Road', 'Sewage overflow'],
    names: ['Ayesha Khan', 'Bilal Ahmed', 'Sara Malik', 'Omar Farooq', 'Hina Raza', 'Zeeshan Ali'],
    stats: ({ A, M, N, afterHoursRecovered: ah }) => [
      answeredStat(A, N, M),
      rate(A, N),
      { key: 'log', label: 'Complaints logged overnight', before: 0, after: ah, fmt: fmt.int, note: 'Nobody on the line after 6 PM' },
    ],
  },
  apparel: {
    seed: 23, total: 132, workspace: 'Apparel Retail Brand', recovered: 'order confirmed',
    topics: ['COD order #4821', 'Address fix #4819', 'Reschedule #4812', 'Size exchange #4799', 'COD order #4830', 'Delivery status #4833'],
    names: ['Hamza Raza', 'Noor Fatima', 'Usman Tariq', 'Mahnoor Iqbal', 'Danish Butt', 'Areeba Shah'],
    stats: ({ A, M, N }) => [
      answeredStat(A, N, M),
      rate(A, N),
      { key: 'rev', label: 'Order value saved', before: 0, after: M * 5200, fmt: fmt.money, note: 'At about Rs 5,200 per order' },
    ],
  },
  hospital: {
    seed: 37, total: 104, workspace: 'Healthcare', recovered: 'appointment booked',
    topics: ['Cardiology, Dr. Umer Aziz', 'Pediatrics check-up', 'Report collection', 'Dental cleaning', 'ECG follow-up', 'Lab sample pickup'],
    names: ['Ahmed Raza', 'Mariam Zafar', 'Imran Shah', 'Farah Naeem', 'Tahir Mehmood', 'Sana Yousaf'],
    stats: ({ A, M, N, afterHoursRecovered: ah }) => [
      answeredStat(A, N, M),
      { key: 'ah', label: 'After-hours bookings', before: 0, after: ah, fmt: fmt.int, note: 'Clinic closes at 6 PM' },
      { key: 'rev', label: 'Consultation value saved', before: 0, after: M * 2500, fmt: fmt.money, note: 'At about Rs 2,500 per visit' },
    ],
  },
};

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
          <DayDashboard id="m" cfg={CFG.municipal} theme={THEMES.municipal} />
          <DayDashboard id="a" cfg={CFG.apparel} theme={THEMES.apparel} />
          <DayDashboard id="h" cfg={CFG.hospital} theme={THEMES.hospital} />
        </StackedCards>
      </div>
    </motion.section>
  );
}
