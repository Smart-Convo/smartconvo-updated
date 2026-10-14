import React, { useState, useCallback, useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import BackgroundUI from './components/BackgroundUI.jsx';
import Hero from './components/Hero.jsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

// Above-the-fold & immediate engagement components
import Testimonials from './components/Testimonials.jsx';
import MissedCallProblem from './components/MissedCallProblem.jsx';
import HowItWorks from './components/HowItWorks.jsx';

// Efficient Code-Splitting for Below-the-Fold Sections to minimize initial bundle size and maximize FCP/TTI
const AudioExperience = lazy(() => import('./components/AudioExperience.jsx'));
const FeaturesGrid = lazy(() => import('./components/FeaturesGrid.jsx'));
const SkinInTheGame = lazy(() => import('./components/SkinInTheGame.jsx'));
const IntegrationsSection = lazy(() => import('./components/IntegrationsSection.jsx'));
const ComparisonTable = lazy(() => import('./components/ComparisonTable.jsx'));
const RoiCalculator = lazy(() => import('./components/RoiCalculator.jsx'));
const CustomerStory = lazy(() => import('./components/CustomerStory.jsx'));
const FaqSection = lazy(() => import('./components/FaqSection.jsx'));
const SunsetCta = lazy(() => import('./components/SunsetCta.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));
const LeadModal = lazy(() => import('./components/LeadModal.jsx'));

// Lightweight, zero-layout-shift section fallback skeleton
function SectionSkeleton({ height = 'h-96' }: { height?: string }) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${height} flex items-center justify-center`}>
      <div className="w-full max-w-3xl p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/60 animate-pulse space-y-4">
        <div className="h-4 w-32 bg-zinc-800 rounded-full mx-auto" />
        <div className="h-8 w-64 bg-zinc-800 rounded-xl mx-auto" />
        <div className="h-4 w-96 bg-zinc-800/80 rounded mx-auto" />
      </div>
    </div>
  );
}

export default function App({ children }: { children?: React.ReactNode }) {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calculatorData, setCalculatorData] = useState<any>(null);

  // Stable, safe scroll handler with smooth fallback
  const handleScrollTo = useCallback((elementId: string) => {
    try {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch {
      // Safe fallback for older browsers or reduced motion settings
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView();
      }
    }
  }, []);

  // Route changes: scroll to the #hash target on the home page, or back to the top on other pages
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      let tries = 0;
      // Lazy-loaded sections may not exist yet, so retry briefly until the target appears
      const t = setInterval(() => {
        tries += 1;
        if (document.getElementById(id) || tries > 30) {
          clearInterval(t);
          handleScrollTo(id);
        }
      }, 150);
      return () => clearInterval(t);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash, handleScrollTo]);

  const handleOpenModal = useCallback((data: any = null) => {
    if (data) {
      setCalculatorData(data);
    }
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <ErrorBoundary fallbackTitle="Smart Convo Application Notice">
      <div className="relative min-h-screen text-white selection:bg-[#D4FF00] selection:text-zinc-950 font-sans antialiased bg-[#060709] pb-24 lg:pb-0">
        {/* Dynamic Background UI */}
        <BackgroundUI onNavigateSection={handleScrollTo} />

        {/* 1. Sticky Navbar */}
        <Navbar 
          onOpenModal={() => handleOpenModal()} 
          onScrollTo={handleScrollTo}
        />

        <main>
          {children ?? (
            <>
          {/* 2. Hero Section (Includes iPhone 16 Pro Mockup & Live Metrics Dock) */}
          <Hero 
            onOpenModal={() => handleOpenModal()} 
            onScrollTo={handleScrollTo}
          />

          {/* 3. Customer Proof & Testimonials ("Why do industry leaders trust AI to take their phone calls?") - commented out
          <Testimonials
            onOpenModal={() => handleOpenModal()}
          />
          */}

          {/* 4. 4-Step Interactive Flow */}
          <HowItWorks />

          {/* 5. The Missed-Call Problem Timeline */}
          <MissedCallProblem 
            onOpenModal={() => handleOpenModal()}
          />

          {/* 6. Interactive Audio Experience & Scenarios ("Does it sound like a Robot? Will high-ticket clients trust it?") - commented out
          <ErrorBoundary fallbackTitle="Audio Experience Currently Unavailable">
            <Suspense fallback={<SectionSkeleton height="h-[600px]" />}>
              <AudioExperience onOpenModal={handleOpenModal} />
            </Suspense>
          </ErrorBoundary>
          */}

          {/* 7. What Certus Handles (6-Card Grid) */}
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <FeaturesGrid />
            </Suspense>
          </ErrorBoundary>

          {/* 8. Skin In The Game Guarantee ("Try Smart Convo for 30 days, or get 100% of your money back.") - commented out
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton height="h-64" />}>
              <SkinInTheGame onOpenModal={() => handleOpenModal()} />
            </Suspense>
          </ErrorBoundary>
          */}

          {/* 9. Secure Telephony & CRM Integrations */}
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <IntegrationsSection onOpenModal={() => handleOpenModal()} />
            </Suspense>
          </ErrorBoundary>

          {/* 10. Comparison Matrix Table */}
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <ComparisonTable />
            </Suspense>
          </ErrorBoundary>

          {/* 11. Interactive ROI Calculator */}
          <ErrorBoundary fallbackTitle="ROI Calculator Notice">
            <Suspense fallback={<SectionSkeleton height="h-[650px]" />}>
              <RoiCalculator onOpenModal={handleOpenModal} />
            </Suspense>
          </ErrorBoundary>

          {/* 12. Customer Story Spotlight */}
{/* Customer story ("See how enterprise leaders are recovering missed pipeline") - commented out
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <CustomerStory onOpenModal={() => handleOpenModal()} />
            </Suspense>
          </ErrorBoundary>
          */}

          {/* 14. Final Sunset CTA Banner */}
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton height="h-64" />}>
              <SunsetCta onOpenModal={() => handleOpenModal()} />
            </Suspense>
          </ErrorBoundary>

          {/* 13. FAQ Accordion */}
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <FaqSection onOpenModal={() => handleOpenModal()} />
            </Suspense>
          </ErrorBoundary>
            </>
          )}
        </main>

        {/* 15. Footer */}
        <Suspense fallback={<div className="h-40 bg-zinc-950" />}>
          <Footer 
            onScrollTo={handleScrollTo} 
            onOpenModal={() => handleOpenModal()}
          />
        </Suspense>

        {/* Interactive Booking & Lead Capture Modal */}
        {isModalOpen && (
          <Suspense fallback={null}>
            <LeadModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              calculatorData={calculatorData}
            />
          </Suspense>
        )}
      </div>
    </ErrorBoundary>
  );
}
