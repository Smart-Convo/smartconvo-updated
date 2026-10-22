import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import StackedCards from './StackedCards';
import { MunicipalDashboard, ApparelDashboard, HospitalDashboard } from './Dashboards';
import { sectionContainerVariants, staggerItemVariants, defaultSectionViewport } from '../utils/motionVariants';

// Same Smart Convo look for all three; each gets its own hue
const THEMES = {
  municipal: { hue: '#5B9BFF', hueDark: '#2563eb', frame: 'rgba(91,155,255,0.22)' },
  apparel:   { hue: '#FF7A9C', hueDark: '#e11d48', frame: 'rgba(255,122,156,0.22)' },
  hospital:  { hue: '#34D6B0', hueDark: '#0d9488', frame: 'rgba(52,214,176,0.22)' },
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

        <StackedCards step={14} scaleStep={0.04} dimStep={0.18} className="[--stack-min:700px] sm:[--stack-min:800px]">
          <MunicipalDashboard theme={THEMES.municipal} />
          <ApparelDashboard theme={THEMES.apparel} />
          <HospitalDashboard theme={THEMES.hospital} />
        </StackedCards>
      </div>
    </motion.section>
  );
}
