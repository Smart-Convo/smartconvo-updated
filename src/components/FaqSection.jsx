import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { sectionContainerVariants, staggerItemVariants, defaultSectionViewport } from '../utils/motionVariants';

const FAQS = [
  {
    q: 'How will my business receive orders that SmartConvo takes?', cat: 'Product',
    a: 'SmartConvo can place orders directly through an API connection to your POS system or printer. You can also receive orders through our dashboard. All orders are processed in real-time and sent to your existing systems seamlessly.'
  },
  {
    q: 'Can SmartConvo process payments over the phone?', cat: 'Product',
    a: 'Yes, SmartConvo can send secure payment links via SMS or process card details directly through your POS using an encrypted connection. This ensures safe payment processing for all phone orders while maintaining PCI compliance.'
  },
  {
    q: 'How will SmartConvo handle customers who struggle to speak English?', cat: 'Pakistan',
    a: "SmartConvo is trained to understand many accents, including South Asian, East Asian, Caribbean, and more. It ensures clear communication for customers whose first language isn't English, making your service accessible to diverse communities."
  },
  {
    q: 'Which industries and businesses does Pentagon AI currently serve?', cat: 'Product',
    a: 'We are currently serving government agencies and expanding to restaurants, healthcare clinics, automotive service centers, and legal firms. More industries are being added regularly as we grow our AI capabilities and integrations.'
  },
  {
    q: 'How would you provide us with support, and do we need to pay for it?', cat: 'Setup',
    a: 'The complete onboarding process takes 5 days and requires only 45 minutes of your time. This includes filling out an onboarding form, a clarity call with your AI engineer, and 3 days of training and integration. Ongoing support is included in all plans.'
  },
  {
    q: 'Will I be able to see a report of how SmartConvo is doing?', cat: 'Product',
    a: "You'll get a lifetime private chat with our team as soon as you sign up. This lets you ask questions, give feedback, or schedule direct calls with our developers for free - no chatbots or long wait times. Plus, you'll have access to detailed analytics dashboards."
  },
  {
    q: 'How quickly can I get started with SmartConvo?', cat: 'Setup',
    a: 'You can be up and running in as little as 5 days. After signing up, our team will configure your AI voice agent, integrate with your existing systems, and train it on your specific business needs. We offer a free trial so you can experience the benefits risk-free.'
  },
  {
    q: 'Can I customize the AI voice and conversation style?', cat: 'Product',
    a: "Yes! You can customize your AI agent's voice, tone, personality, and conversation style to match your brand. Choose from multiple voice options, set response patterns, and define how the AI should handle different scenarios to create the perfect customer experience."
  },
  {
    q: 'Does SmartConvo understand Urdu, Roman Urdu, and Pakistani accents?', cat: 'Pakistan',
    a: 'Yes. SmartConvo is tuned for Pakistani speech, including regional accents and the natural mix of Urdu and English that callers use. It speaks polite, natural Urdu and English, so callers can talk the way they normally do.'
  },
  {
    q: 'Do we need to change our PTCL, UAN, or existing helpline numbers?', cat: 'Pakistan',
    a: 'No. You keep the numbers your customers already know, including PTCL landlines (042 / 021 / 051), mobile lines, and nationwide UAN 111 helplines. We set up call forwarding or connect through SIP trunking, so there is no new hardware and no change for your callers.'
  },
  {
    q: 'Can SmartConvo verify Cash-on-Delivery (COD) orders for my online store?', cat: 'Pakistan',
    a: 'Yes. When an order is placed on your store, SmartConvo can call the customer shortly after checkout to confirm the order and verify the delivery address, helping you reduce returns on Cash-on-Delivery orders.'
  },
  {
    q: 'Can it answer calls after office hours, on Fridays, and during Eid holidays?', cat: 'Pakistan',
    a: 'Yes. SmartConvo answers every call around the clock, including nights, weekends, and public holidays. It takes the caller details, and your team gets a ready follow-up list on WhatsApp or in your CRM when they are back.'
  },
  {
    q: 'What happens when a caller needs to speak to a real person?', cat: 'Setup',
    a: 'SmartConvo can hand the call over to your team when needed, or take a message with the caller details and the reason for the call, so your staff can call back with full context.'
  }
];

const TABS = ['Product', 'Setup', 'Pakistan'];
const TAB_LABELS = { Product: 'Product', Setup: 'Setup & support', Pakistan: 'For Pakistan' };

export default function FaqSection({ onOpenModal }) {
  const [tab, setTab] = useState('Product');
  const [openIdx, setOpenIdx] = useState(0);
  const list = FAQS.filter((f) => f.cat === tab);

  const switchTab = (t) => { setTab(t); setOpenIdx(0); };

  return (
    <motion.section
      id="faq"
      initial="hidden"
      whileInView="visible"
      viewport={defaultSectionViewport}
      variants={sectionContainerVariants}
      className="py-12 sm:py-24 bg-transparent"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div variants={staggerItemVariants} className="mb-9">
          <SectionHeading eyebrow="FAQ" lead="Got questions?" accent="We've got answers." />
        </motion.div>

        {/* Category tabs */}
        <motion.div variants={staggerItemVariants} className="flex justify-center mb-8">
          <div className="relative inline-flex p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className={`relative z-10 px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[14px] font-medium transition-colors cursor-pointer ${
                  tab === t ? 'text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab === t && (
                  <motion.span
                    layoutId="faq-pill"
                    className="absolute inset-0 rounded-full bg-white light:bg-[#D4FF00]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                {TAB_LABELS[t]}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Compact accordion */}
        <motion.div variants={staggerItemVariants} className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md divide-y divide-white/[0.07] overflow-hidden">
          {list.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.03] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className={`text-[15px] font-medium leading-snug transition-colors ${isOpen ? 'text-white' : 'text-zinc-300'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-[18px] h-[18px] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : 'text-zinc-500'}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-5 text-[14px] text-zinc-400 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          variants={staggerItemVariants}
          className="relative mt-10 overflow-hidden rounded-[28px] border border-accent/25 bg-gradient-to-br from-[#D4FF00]/[0.12] via-white/[0.03] to-transparent p-7 sm:p-9 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div className="pointer-events-none absolute -top-20 -right-16 w-64 h-64 rounded-full bg-[#D4FF00]/20 blur-[80px]" />
          <div className="relative">
            <h3 className="text-[22px] sm:text-[26px] font-semibold tracking-[-0.02em] text-white">Still have questions?</h3>
            <p className="mt-1.5 text-[15px] text-zinc-400">Talk to our team and hear Smart Convo handle your calls.</p>
          </div>
          <button
            onClick={onOpenModal}
            className="group relative shrink-0 inline-flex items-center gap-3 pl-8 pr-2.5 h-[60px] rounded-full bg-[#D4FF00] text-zinc-950 font-semibold text-[16px] shadow-[0_10px_40px_rgba(212,255,0,0.4)] hover:shadow-[0_14px_50px_rgba(212,255,0,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            Book a demo
            <span className="w-11 h-11 rounded-full bg-zinc-950 text-[#D4FF00] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </span>
          </button>
        </motion.div>

      </div>
    </motion.section>
  );
}
