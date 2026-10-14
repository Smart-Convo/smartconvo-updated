// Company: Smart Convo - Enterprise Voice AI

import React, { useState } from 'react';
import BackgroundUI from './components/BackgroundUI.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import MissedCallProblem from './components/MissedCallProblem.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import AudioExperience from './components/AudioExperience.jsx';
import BentoGrid from './components/BentoGrid.jsx';
import FeaturesGrid from './components/FeaturesGrid.jsx';
import IntegrationsSection from './components/IntegrationsSection.jsx';
import ArchitectureSection from './components/ArchitectureSection.jsx';
import ComparisonTable from './components/ComparisonTable.jsx';
import RoiCalculator from './components/RoiCalculator.jsx';
import CustomerStory from './components/CustomerStory.jsx';
import Testimonials from './components/Testimonials.jsx';
import SkinInTheGame from './components/SkinInTheGame.jsx';
import FaqSection from './components/FaqSection.jsx';
import SunsetCta from './components/SunsetCta.jsx';
import Footer from './components/Footer.jsx';
import LeadModal from './components/LeadModal.jsx';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calculatorData, setCalculatorData] = useState(null);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCalculator = () => {
    handleScrollTo('calculator');
  };

  const handleOpenModal = (data = null) => {
    if (data) {
      setCalculatorData(data);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#060709] text-white selection:bg-[#D4FF00] selection:text-black relative">
      {/* Background UI */}
      <BackgroundUI onNavigateSection={handleScrollTo} />

      {/* Dynamic Navigation */}
      <Navbar 
        onScrollTo={handleScrollTo}
        onOpenModal={() => handleOpenModal()} 
      />

      {/* Main Content Sections with seamless catalog & niche triggers */}
      <main className="relative z-10">
        {/* Section 1: Hero Overview */}
        <Hero 
          onOpenCalculator={handleOpenCalculator}
          onScrollTo={handleScrollTo}
          onOpenModal={() => handleOpenModal()} 
        />

        {/* Section 2: Missed Call Dilemma */}
        <MissedCallProblem 
          onOpenModal={() => handleOpenModal()} 
        />

        {/* Section 3: How Smart Convo Works */}
        <HowItWorks 
          onOpenModal={() => handleOpenModal()} 
        />

        {/* Section 4: Bilingual Voice Demos Audio Experience */}
        <AudioExperience 
          onOpenModal={() => handleOpenModal()} 
        />

        {/* Section 5: Industry Niches (Bento Grid) */}
        <BentoGrid 
          onOpenModal={handleOpenModal} 
        />

        {/* Section 6: Specific Capabilities & Verticals */}
        <FeaturesGrid />

        {/* Section 7: Telephony & CRM Integrations */}
        <IntegrationsSection 
          onOpenModal={() => handleOpenModal()} 
        />

        {/* Section 8: Sub-second Telephony Architecture */}
        <ArchitectureSection 
          onOpenModal={() => handleOpenModal()} 
        />

        {/* Section 9: Market Comparison */}
        <ComparisonTable />

        {/* Section 10: Interactive High-Ticket ROI Calculator */}
        <RoiCalculator 
          onOpenModal={handleOpenModal} 
        />

        {/* Section 11: Enterprise Case Study */}
        <CustomerStory 
          onOpenModal={() => handleOpenModal()} 
        />

        {/* Section 12: Proof From High-Growth Enterprises */}
        <Testimonials 
          onOpenModal={() => handleOpenModal()} 
        />

        {/* Section 13: 30-Day Money-Back Guarantee */}
        <SkinInTheGame 
          onOpenModal={() => handleOpenModal()} 
        />

        {/* Section 14: Frequently Asked Questions */}
        <FaqSection 
          onOpenModal={() => handleOpenModal()} 
        />

        {/* Section 15: Final Sunset Call To Action */}
        <SunsetCta 
          onOpenModal={() => handleOpenModal()} 
        />
      </main>

      {/* Footer */}
      <Footer 
        onScrollTo={handleScrollTo}
        onOpenModal={() => handleOpenModal()} 
      />

      {/* Interactive Lead Capture Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        calculatorData={calculatorData}
      />
    </div>
  );
}
