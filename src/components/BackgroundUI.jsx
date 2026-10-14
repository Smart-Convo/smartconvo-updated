import React from 'react';

/**
 * BackgroundUI: Plain Black Theme Background
 * Restored to clean, high-contrast dark aesthetic (#060709).
 */

export const CATALOG_MOTIFS = [
  { id: 'hero', name: 'Voice AI Overview', category: 'Catalog Hero' },
  { id: 'missed-call', name: 'High-Ticket Call Loss', category: 'Dilemma' },
  { id: 'how-it-works', name: 'Telephony Pipeline', category: 'Architecture' },
  { id: 'demo', name: 'Bilingual Voice Demos', category: 'Audio Catalog' },
  { id: 'solutions', name: 'Industry Niches', category: 'Niches Bento' },
  { id: 'verticals', name: 'Vertical Capabilities', category: 'Niches' },
  { id: 'integrations', name: 'Simple CRM & PBX Integrations', category: 'Ecosystem' },
  { id: 'architecture', name: 'Sub-second Infrastructure', category: 'Architecture' },
  { id: 'comparison', name: 'Market Benchmark', category: 'Benchmark' },
  { id: 'calculator', name: 'High-Ticket ROI Engine', category: 'Revenue Catalog' },
  { id: 'story', name: 'Enterprise Case Study', category: 'Case Studies' },
  { id: 'case-studies', name: 'Client Proof & Impact', category: 'Case Studies' },
  { id: 'guarantee', name: 'Skin In The Game', category: 'Guarantee' },
  { id: 'faq', name: 'Executive FAQ', category: 'Architecture FAQ' },
  { id: 'cta', name: 'Enterprise Deployment', category: 'Final CTA' }
];

export default function BackgroundUI({ onNavigateSection }) {
  return (
    <div 
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-page"
      aria-hidden="true"
    >
      {/* Plain black base background */}
      <div className="absolute inset-0 bg-page" />
    </div>
  );
}
