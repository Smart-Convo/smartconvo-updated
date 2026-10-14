import React from 'react';
import { Plug, PhoneCall, Webhook, ArrowUpRight } from 'lucide-react';

const L = (f) => `/logos/integrations/${f}`;

// logo: file in /public/logos/integrations. Items without a verified official logo show an icon instead.
const ROW_A = [
  { name: 'Zoho CRM', tag: 'CRM Sync', logo: 'zoho.svg', h: 14 },
  { name: 'WhatsApp Cloud API', tag: 'Instant Dispatch', logo: 'whatsapp.svg' },
  { name: 'Ginko', tag: 'CRM Integration', icon: Plug },
  { name: 'GTEC', tag: 'Telecom & CRM', icon: Plug },
  { name: 'HubSpot', tag: 'CRM Sync', logo: 'hubspot.svg' },
  { name: 'Salesforce', tag: 'CRM Enterprise', logo: 'salesforce.svg', h: 26 },
  { name: 'Shopify Plus', tag: 'E-Commerce', logo: 'shopify.svg' },
  { name: 'LeadSquared', tag: 'Lead Pipeline', logo: 'leadsquared.png', round: true },
  { name: 'Google Calendar', tag: 'Booking', logo: 'googlecalendar.svg' },
  { name: 'PTCL / SIP Trunks', tag: 'Telephony', icon: PhoneCall },
  { name: 'GoHighLevel', tag: 'CRM & Automation', logo: 'highlevel.png', round: true },
  { name: 'Custom REST Webhook', tag: 'Webhooks', icon: Webhook },
];

const ROW_B = [
  { name: 'Facebook', tag: 'Ads & Leads', logo: 'facebook.svg' },
  { name: 'WhatsApp Business', tag: 'Messaging', logo: 'whatsapp.svg' },
  { name: 'Google', tag: 'Search & Ads', logo: 'google.svg' },
  { name: 'Salesforce', tag: 'CRM', logo: 'salesforce.svg', h: 26 },
  { name: 'AccessE11', tag: 'Municipal Software', logo: 'accesse11.png', round: true },
  { name: 'Clover', tag: 'Point of Sale', logo: 'clover.png', round: true },
  { name: 'KitchenHub', tag: 'Order Sync', logo: 'kitchenhub.png', round: true },
  { name: 'PostEx', tag: 'Courier', logo: 'postex.png', dark: true, h: 18 },
  { name: 'Leopards Courier', tag: 'Courier', logo: 'leopards.png', h: 26 },
  { name: 'Shopify', tag: 'E-Commerce', logo: 'shopify.svg' },
  { name: 'Zapier', tag: 'Automation', logo: 'zapier.svg', round: true },
  { name: 'Meta', tag: 'Ads & Messaging', logo: 'meta.svg', h: 22 },
  { name: 'Claude', tag: 'AI Assistant', logo: 'claude.svg' },
  { name: 'n8n', tag: 'Workflow Automation', logo: 'n8n.svg' },
];

function Card({ it }) {
  const Icon = it.icon;
  return (
    <div data-keep-dark className="group shrink-0 mr-3 sm:mr-4 flex items-center gap-2.5 sm:gap-3 rounded-2xl bg-[#0a0b0d] border border-black/80 pl-2 pr-4 sm:pl-2.5 sm:pr-5 py-2 sm:py-2.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 transition-transform">
      <span
        className={`h-9 sm:h-11 min-w-9 sm:min-w-11 px-2 sm:px-2.5 rounded-xl flex items-center justify-center shrink-0 ${it.dark ? 'bg-[#1a2140]' : it.icon ? 'bg-[#D4FF00]/12 border border-[#D4FF00]/30 text-[#D4FF00]' : 'bg-white'}`}
      >
        {Icon ? (
          <Icon className="w-[18px] h-[18px] sm:w-5 sm:h-5" strokeWidth={1.9} />
        ) : (
          <img src={L(it.logo)} alt={`${it.name} logo`} className={`w-auto object-contain ${it.round ? 'rounded-md' : ''}`} style={{ height: `calc(${it.h || 24}px * var(--logo-scale, 1))` }} loading="lazy" draggable={false} />
        )}
      </span>
      <span className="leading-tight whitespace-nowrap">
        <span className="block text-[12.5px] sm:text-[14px] font-semibold text-white">{it.name}</span>
        <span className="block text-[10px] sm:text-[11px] tracking-wide text-zinc-500 group-hover:text-accent transition-colors">{it.tag}</span>
      </span>
    </div>
  );
}

function Row({ items, reverse, seconds }) {
  return (
    <div className="flex w-max hover:[animation-play-state:paused]" style={{ animation: `${reverse ? 'marquee-r' : 'marquee'} ${seconds}s linear infinite` }}>
      {items.map((it) => <Card key={it.name} it={it} />)}
      {items.map((it) => <Card key={`d-${it.name}`} it={it} />)}
    </div>
  );
}

/** Endless two-row integrations banner on a bold lime panel. */
export default function IntegrationsBanner({ onOpenModal }) {
  const mask = 'linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%)';
  return (
    <div data-keep-dark className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] bg-[#D4FF00] py-9 sm:py-14 shadow-[0_40px_100px_-30px_rgba(212,255,0,0.45)] [--logo-scale:0.8] sm:[--logo-scale:1]">
      {/* decoration */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-white/50 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 w-[460px] h-[460px] rounded-full bg-[#9dff00]/60 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '22px 22px' }} />

      <div className="relative px-5 sm:px-12 text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 text-[10.5px] sm:text-[12px] font-semibold tracking-[0.22em] uppercase text-[#0a0a0a]/60 mb-3 sm:mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" /> Integrations
        </div>
        <h2 className="text-[26px] sm:text-5xl lg:text-[52px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#0a0a0a]">
          Plugs into the tools<br className="hidden sm:block" /> you already use.
        </h2>
        <p className="mt-3 sm:mt-4 text-[13px] sm:text-[17px] leading-relaxed text-[#0a0a0a]/70">
          CRMs, WhatsApp, telephony, e-commerce and couriers. Smart Convo connects to your stack, with no manual data entry.
        </p>
        {onOpenModal && (
          <button
            onClick={() => onOpenModal()}
            className="group mt-5 sm:mt-7 inline-flex items-center gap-2.5 h-11 sm:h-[52px] pl-5 sm:pl-7 pr-1.5 rounded-full bg-[#0a0a0a] text-[#D4FF00] text-[13.5px] sm:text-[15px] font-semibold shadow-[0_14px_30px_-10px_rgba(0,0,0,0.6)] hover:bg-black transition-colors cursor-pointer"
          >
            Connect your stack
            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#D4FF00] text-zinc-950 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.4} />
            </span>
          </button>
        )}
      </div>

      <div className="relative space-y-3 sm:space-y-4 overflow-hidden py-1" style={{ WebkitMaskImage: mask, maskImage: mask }}>
        <Row items={ROW_A} seconds={55} />
        <Row items={ROW_B} seconds={62} reverse />
      </div>
    </div>
  );
}
