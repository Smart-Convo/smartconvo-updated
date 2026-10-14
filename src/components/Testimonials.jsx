import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle2 } from 'lucide-react';
import { sectionContainerVariants, staggerItemVariants, staggerCardGridVariants, cardItemVariants, defaultSectionViewport } from '../utils/motionVariants';

const TESTIMONIALS = [
  {
    name: 'Tariq Mehmood',
    title: 'VP of Commercial Sales, The Vertical',
    quote: 'In high-ticket luxury real estate, a missed call on a 90M PKR penthouse is devastating. Smart Convo answers on the first ring in fluent Urdu and books site visits straight with simple CRM integration.',
    tag: 'Luxury High-Rise Developments',
    imgUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Ayesha Khan',
    title: 'Head of Customer Experience, Monark Apparel',
    quote: 'During flash sales and season launches, COD order verification was our biggest bottleneck. Smart Convo automated 12,000 confirmation calls and cut our Return-to-Origin rate by 38%.',
    tag: 'Fashion & Retail E-Commerce',
    imgUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Hamza Farooq',
    title: 'Director of Omnichannel Operations, Cougar',
    quote: 'Customer support calls during peak campaigns used to overwhelm our phone lines. Smart Convo handles hundreds of simultaneous calls with natural Urdu code-switching and zero hold music.',
    tag: 'Casual Apparel & Lifestyle',
    imgUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Bilal Sheikh',
    title: 'Managing Director, DHA Lahore Properties',
    quote: 'Overseas Pakistani buyers from the UK, UAE, and US call at 3 AM. Smart Convo answers with zero latency, provides square footage pricing, and locks in verified site visits.',
    tag: 'Master-Planned Communities',
    imgUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Daniyal Qureshi',
    title: 'Senior Retail Operations Manager, Royal Tag',
    quote: 'Precision and customer hospitality define our menswear brand. Smart Convo answers every store inquiry, checks nationwide inventory, and books bespoke tailoring slots effortlessly.',
    tag: 'Premium Menswear & Tailoring',
    imgUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Khurram Shahzad',
    title: 'Head of Customer Service & Telephony, Haier',
    quote: 'Handling nationwide warranty registrations, repair technician dispatch, and appliance inquiries across Pakistan 24/7 has never been smoother. Smart Convo scales instantly without adding headcount.',
    tag: 'Consumer Appliances & Electronics',
    imgUrl: 'https://images.unsplash.com/photo-1594824813583-98285514f7b4?auto=format&fit=crop&w=400&q=80'
  }
];

export default function Testimonials({ onOpenModal }) {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <motion.section 
      id="case-studies" 
      initial="hidden"
      whileInView="visible"
      viewport={defaultSectionViewport}
      variants={sectionContainerVariants}
      className="py-20 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div variants={staggerItemVariants} className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-700/80 mb-3 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
            <span className="ios-badge text-[11px] font-bold tracking-wider text-blue-400 uppercase">
              PROOF FROM HIGH-GROWTH ENTERPRISES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Why do industry leaders trust AI to take their phone calls?
          </h2>
          <p className="text-zinc-300 ios-subtext sm:text-[15px] leading-relaxed max-w-2xl mx-auto">
            From premier Real Estate developers to nationwide Retail chains and Healthcare networks, enterprise leaders use Smart Convo to eliminate missed calls and capture high-ticket revenue.
          </p>
        </motion.div>

        {/* 6 Video / Testimonial Cards Grid */}
        <motion.div variants={staggerCardGridVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardItemVariants}
              data-keep-dark className="group relative rounded-2xl overflow-hidden bg-zinc-950 shadow-xl border border-zinc-800 flex flex-col justify-end min-h-[340px] p-6 text-white cursor-pointer hover:shadow-2xl hover:border-zinc-700 transition-all"
              onClick={() => setActiveVideo(activeVideo === idx ? null : idx)}
            >
              {/* Background Photo with Dark Gradient Overlay */}
              <img
                src={item.imgUrl}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              {/* Tag at Top Left */}
              <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 ios-badge text-[10px] text-[#D4FF00] font-bold">
                {item.tag}
              </div>

              {/* Play Button Icon Centered */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#D4FF00] group-hover:border-accent transition-all">
                <Play className="w-5 h-5 text-white fill-white group-hover:text-zinc-950 group-hover:fill-zinc-950 ml-0.5 transition-colors" />
              </div>

              {/* Content at Bottom with iOS typography */}
              <div className="relative z-10 space-y-2">
                <p className="text-sm font-medium text-zinc-100 leading-snug line-clamp-3">
                  "{item.quote}"
                </p>
                <div className="pt-2 border-t border-white/15">
                  <div className="text-xs font-bold text-white tracking-tight">{item.name}</div>
                  <div className="ios-caption text-zinc-400 font-normal">{item.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}
