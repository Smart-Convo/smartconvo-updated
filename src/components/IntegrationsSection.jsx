import SectionHeading from './SectionHeading';
import IntegrationsBanner from './IntegrationsBanner';
import IntegrationCards from './IntegrationCards';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Database, PhoneCall } from 'lucide-react';
import { sectionContainerVariants, staggerItemVariants, defaultSectionViewport } from '../utils/motionVariants';

// Official SVG Brand Logos
const ZohoLogo = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="9" height="9" rx="2" fill="#E42527" />
    <rect x="13" y="3" width="9" height="9" rx="2" fill="#226AB4" />
    <rect x="2" y="14" width="9" height="9" rx="2" fill="#2CA048" />
    <rect x="13" y="14" width="9" height="9" rx="2" fill="#F9A01B" />
  </svg>
);

const WhatsAppLogo = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#25D366" />
    <path
      d="M17.5 14.38c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.24-.24-.59-.49-.51-.67-.52h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.88.12.57-.09 1.78-.73 2.03-1.43.25-.7.25-1.31.18-1.43-.08-.13-.28-.2-.58-.35z"
      fill="#FFFFFF"
    />
  </svg>
);

const HubSpotLogo = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#FF7A59" />
    <path
      d="M15.8 10.4V8.7c.5-.3.8-.8.8-1.4 0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6c0 .6.3 1.1.8 1.4v1.7c-.5.2-.9.6-1.2 1.1l-2.4-1.9c.1-.2.1-.4.1-.6 0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2c.4 0 .8-.1 1.1-.3l2.3 1.8c-.3.5-.4 1.1-.4 1.7 0 1.9 1.5 3.4 3.4 3.4s3.4-1.5 3.4-3.4c0-1.4-.8-2.6-2-3.1zm-4.7 4.2c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"
      fill="#FFFFFF"
    />
  </svg>
);

const SalesforceLogo = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
    <path
      d="M18.8 9.2c-.6-2.5-2.8-4.2-5.4-4.2-1.8 0-3.4.8-4.4 2.2-1-.6-2.1-.9-3.2-.9-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8h13c2.9 0 5.2-2.3 5.2-5.2 0-2.4-1.7-4.4-4.2-4.9-.3-.2-.7-.4-1-.6z"
      fill="#00A1E0"
    />
    <path
      d="M8.5 12.2c.4-.7 1.2-1.2 2-1.2 1.3 0 2.4 1.1 2.4 2.4 0 .2 0 .4-.1.6 1.1.2 2 1.2 2 2.4 0 1.4-1.1 2.5-2.5 2.5h-5.4c-1.4 0-2.5-1.1-2.5-2.5 0-1.2.9-2.2 2.1-2.4 0-.2-.1-.4-.1-.6 0-1.3 1.1-2.4 2.4-2.4.9 0 1.7.5 2.1 1.2z"
      fill="#FFFFFF"
      opacity="0.85"
    />
  </svg>
);

const ShopifyLogo = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
    <path
      d="M19.4 6.8c-.1-.4-.4-.6-.8-.6h-2.1c-.2-.6-.6-1.5-1.3-2.1-1.3-1.1-2.8-.9-3.4-.8-.4.1-.7.2-.9.4l-.6.7c-.5.6-.9 1.4-1.1 2.3l-2.4.7c-.7.2-.8.8-.9 1.3l-2.2 11.2c-.1.7.4 1.3 1.1 1.4l11.4 1.8c.1 0 .2 0 .3 0 .6 0 1.1-.4 1.2-1l2.4-13.8c.1-.4 0-.8-.2-1.1z"
      fill="#96BF48"
    />
    <path
      d="M14.5 6.2h-3.4c.2-.7.6-1.4 1.2-1.8.4-.3.9-.4 1.3-.3.4.1.7.3.9.6.1.4.1 1 .0 1.5z"
      fill="#5E8E3E"
    />
    <path
      d="M13.2 11.6c-.9 0-1.5.5-1.5 1.1 0 1.2 2.6 1.4 2.6 3.1 0 1.1-.9 1.9-2.2 1.9-1.2 0-2-.6-2.2-1.5l1-.4c.1.6.6.9 1.2.9.6 0 1.1-.3 1.1-.8 0-1.1-2.6-1.4-2.6-3.1 0-1.1.9-1.9 2.1-1.9.9 0 1.6.4 1.9 1.1l-1 .5c-.1-.5-.5-.8-.8-.8z"
      fill="#FFFFFF"
    />
  </svg>
);

const LeadSquaredLogo = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="6" fill="#F4511E" />
    <path d="M6 7h4v4H6zM14 7h4v4h-4zM6 15h4v4H6z" fill="#FFFFFF" />
    <path d="M14 15l2 2 4-4" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GoogleCalendarLogo = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="17" rx="3.5" fill="#FFFFFF" />
    <rect x="3" y="4" width="18" height="5" rx="2" fill="#1A73E8" />
    <path d="M3 9h18v12a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" fill="#FFFFFF" />
    <text x="12" y="18" textAnchor="middle" fill="#1A73E8" fontSize="9" fontWeight="900" fontFamily="-apple-system, sans-serif">31</text>
    <circle cx="7" cy="4" r="1" fill="#EA4335" />
    <circle cx="17" cy="4" r="1" fill="#FBBC04" />
  </svg>
);

const PtclLogo = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="5" fill="#006A4E" />
    <circle cx="12" cy="12" r="6" stroke="#FFFFFF" strokeWidth="1.8" />
    <path d="M12 6a6 6 0 015 5" stroke="#D4FF00" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2" fill="#D4FF00" />
  </svg>
);

const GinkoLogo = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="6" fill="#0D9488" />
    {/* Ginkgo biloba leaf silhouette */}
    <path
      d="M12 18c0-3.5 1-5 4-7-1.5-1.5-3-2-5-1-1.5-.7-3.5 0-5 1.5 2 2 3.5 3.5 3.5 6.5"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 18v3" stroke="#D4FF00" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const GtecLogo = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="6" fill="#1E3A8A" />
    {/* GTEC tech monogram */}
    <path
      d="M16 8.5c-.8-.6-1.9-1-3-1-2.8 0-4.5 1.8-4.5 4.5s1.7 4.5 4.5 4.5c2 0 3.3-.9 3.8-2.2H13v-2h5.5v5.5"
      stroke="#38BDF8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RestWebhookLogo = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="6" fill="#18181B" stroke="#3F3F46" />
    <path d="M7 10l-3 2 3 2M17 10l3 2-3 2M13 7l-2 10" stroke="#D4FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ENTERPRISE_INTEGRATIONS = [
  { name: 'Zoho CRM', logo: ZohoLogo, highlight: true, category: 'CRM Sync' },
  { name: 'WhatsApp Cloud API', logo: WhatsAppLogo, highlight: true, category: 'Instant Dispatch' },
  { name: 'Ginko', logo: GinkoLogo, highlight: true, category: 'CRM Integration' },
  { name: 'GTEC', logo: GtecLogo, highlight: true, category: 'Telecom & CRM' },
  { name: 'HubSpot', logo: HubSpotLogo, highlight: false, category: 'CRM Sync' },
  { name: 'Salesforce', logo: SalesforceLogo, highlight: false, category: 'CRM Enterprise' },
  { name: 'Shopify Plus', logo: ShopifyLogo, highlight: false, category: 'E-Commerce' },
  { name: 'LeadSquared', logo: LeadSquaredLogo, highlight: false, category: 'Lead Pipeline' },
  { name: 'Google Calendar', logo: GoogleCalendarLogo, highlight: false, category: 'Booking' },
  { name: 'PTCL / SIP Trunks', logo: PtclLogo, highlight: false, category: 'Telephony' },
  { name: 'Custom REST Webhook', logo: RestWebhookLogo, highlight: false, category: 'Webhooks' }
];

export default function IntegrationsSection({ onOpenModal }) {
  return (
    <motion.section 
      id="integrations" 
      initial="hidden"
      whileInView="visible"
      viewport={defaultSectionViewport}
      variants={sectionContainerVariants}
      className="py-12 sm:py-24 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-24">
        
        {/* Sub-Section 1: CRM & Telecom Sync */}
        <motion.div variants={staggerItemVariants}>
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-14">
            <SectionHeading eyebrow="Telephony &amp; CRM" lead="Does it connect with our" accent="CRM and phone lines?" className="mb-5" />
            <p className="text-zinc-300 ios-subtext sm:text-[16px] max-w-2xl mx-auto leading-relaxed">
              Smart Convo plugs into your existing tech stack with simple CRM integration and zero workflow disruption.
            </p>
          </div>

          <IntegrationCards />
        </motion.div>

        <motion.div variants={staggerItemVariants}>
          <IntegrationsBanner onOpenModal={onOpenModal} />
        </motion.div>

      </div>
    </motion.section>
  );
}
