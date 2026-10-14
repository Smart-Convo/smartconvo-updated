import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, PhoneCall, Volume2, CheckCircle, Sparkles, Building2, ShoppingBag, Stethoscope, Zap } from 'lucide-react';
import { sectionContainerVariants, staggerItemVariants, defaultSectionViewport } from '../utils/motionVariants';

const AUDIO_SCENARIOS = [
  {
    id: 'real-estate',
    title: 'Real Estate Developer',
    sub: 'High-ticket villa qualification & site visit',
    business: 'Emaar Developments & Lake City',
    agentName: 'Ayla (Bilingual Urdu/English)',
    callerNumber: '+92 300 849 2311',
    transcript: [
      { speaker: 'system', text: 'Call connected via PTCL Enterprise SIP trunk · Latency: 780ms' },
      { speaker: 'agent', text: 'As-salamu alaykum, thank you for calling Emaar Sales Lounge. My name is Ayla. Are you inquiring about the beachfront residences or our DHA luxury villas today?' },
      { speaker: 'caller', text: 'Walaykum as-salam. I am looking for a 4-bedroom luxury villa in Phase 8, ready for immediate possession.' },
      { speaker: 'agent', text: 'Understood! Our Phase 8 inventory starts around 85 million PKR. What budget range were you looking at, and would you prefer cash purchase or installment plan?' },
      { speaker: 'caller', text: 'Budget is around 90M PKR, outright purchase. Can I see the property this weekend?' },
      { speaker: 'agent', text: 'Perfect. I have locked your private site walk-through with our Senior Director this Saturday at 4:00 PM. I just sent the VIP gate pass and Google Pin to your WhatsApp.' }
    ],
    items: [
      { name: 'Unit Inquired', price: 'DHA Phase 8 Villa' },
      { name: 'Buyer Budget', price: '85M - 90M PKR' },
      { name: 'Site Visit Confirmed', price: 'Saturday 4:00 PM' }
    ],
    total: 'Qualified via Simple CRM'
  },
  {
    id: 'retail',
    title: 'Retail & E-Commerce',
    sub: 'Automated COD verification & address validation',
    business: 'Sapphire Retail Logistics',
    agentName: 'Hamza (Automated Outbound/Inbound)',
    callerNumber: '+92 321 445 1092',
    transcript: [
      { speaker: 'system', text: 'Outbound COD Dispatch Token active · Shopify Order #84920' },
      { speaker: 'agent', text: 'As-salamu alaykum, this is Hamza from Sapphire Customer Care calling regarding your online order #84920 for 18,500 PKR. Am I speaking with Mrs. Zainab?' },
      { speaker: 'caller', text: 'Yes, Zainab speaking.' },
      { speaker: 'agent', text: 'Great! Could you please verify your delivery address: House 42, Street 14, Sector F-7/2 Islamabad?' },
      { speaker: 'caller', text: 'Yes, that is our exact house address. Please dispatch it.' },
      { speaker: 'agent', text: 'Your COD order is verified and dispatched via TCS Courier for delivery within 48 hours. Thank you for choosing Sapphire!' }
    ],
    items: [
      { name: 'Order Value', price: '18,500 PKR (COD)' },
      { name: 'Address Verified', price: 'F-7/2 Islamabad' },
      { name: 'Courier Status', price: 'TCS Dispatch Fired' }
    ],
    total: 'RTO Risk: 0%'
  },
  {
    id: 'healthcare',
    title: 'Healthcare Clinics',
    sub: 'Doctor consultation & diagnostic scheduling',
    business: 'Chughtai Medical Network & Aesthetics',
    agentName: 'Sarah (Medical Intake Specialist)',
    callerNumber: '+92 333 559 8810',
    transcript: [
      { speaker: 'system', text: 'HIPAA Compliant Patient Intake Buffer · Zero Hold Time' },
      { speaker: 'agent', text: 'Good afternoon, thank you for calling Chughtai Medical Center. This is Sarah. How can I assist you with your appointment today?' },
      { speaker: 'caller', text: 'I want to schedule an appointment with Dr. Farhan for a cardiology consultation and ECG.' },
      { speaker: 'agent', text: 'Dr. Farhan is available tomorrow at 5:30 PM at the Main Boulevard clinic. Shall I reserve that slot for you?' },
      { speaker: 'caller', text: 'Yes please, under the name Usman Tariq.' },
      { speaker: 'agent', text: 'Appointment confirmed for Usman Tariq, tomorrow at 5:30 PM. Your appointment token and fasting instructions have been sent via SMS.' }
    ],
    items: [
      { name: 'Physician', price: 'Dr. Farhan (Cardiology)' },
      { name: 'Consultation Fee', price: '5,000 PKR' },
      { name: 'Time Slot', price: 'Tomorrow 5:30 PM' }
    ],
    total: 'Calendar Locked'
  }
];

export default function AudioExperience({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState('real-estate');
  const [isPlaying, setIsPlaying] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callTriggered, setCallTriggered] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorIntervalRef = useRef(null);

  const scenario = AUDIO_SCENARIOS.find(s => s.id === activeTab) || AUDIO_SCENARIOS[0];

  // Gracefully clean up Web Audio on unmount or tab switch
  useEffect(() => {
    return () => {
      if (oscillatorIntervalRef.current) {
        clearInterval(oscillatorIntervalRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Audio tone demo simulation
  useEffect(() => {
    if (!isPlaying) {
      if (oscillatorIntervalRef.current) {
        clearInterval(oscillatorIntervalRef.current);
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new AudioCtx();
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      // Generate soft, pleasant conversational audio harmonic pulses
      const playChirp = () => {
        if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
        const osc = audioContextRef.current.createOscillator();
        const gain = audioContextRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440 + Math.random() * 80, audioContextRef.current.currentTime);
        gain.gain.setValueAtTime(0.015, audioContextRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(audioContextRef.current.destination);
        osc.start();
        osc.stop(audioContextRef.current.currentTime + 0.35);
      };

      playChirp();
      oscillatorIntervalRef.current = setInterval(playChirp, 1400);
    } catch {
      // Audio autoplay policy fallback
    }

    return () => {
      if (oscillatorIntervalRef.current) {
        clearInterval(oscillatorIntervalRef.current);
      }
    };
  }, [isPlaying]);

  const handleCallMe = (e) => {
    e.preventDefault();
    const sanitizedNumber = phoneNumber.trim().replace(/[^\d+ ()-]/g, '');
    if (!sanitizedNumber || sanitizedNumber.length < 7) return;

    setCallTriggered(true);
    const timer = setTimeout(() => {
      setCallTriggered(false);
      onOpenModal({
        phone: sanitizedNumber,
        industry: scenario.title
      });
    }, 1200);

    return () => clearTimeout(timer);
  };

  return (
    <motion.section 
      id="demo" 
      initial="hidden"
      whileInView="visible"
      viewport={defaultSectionViewport}
      variants={sectionContainerVariants}
      className="py-24 bg-transparent relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div variants={staggerItemVariants} className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-700/80 mb-3 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
            <span className="ios-badge text-[11px] font-bold tracking-wider text-blue-400 uppercase">
              EXPERIENCE SMART CONVO
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Does it sound like a Robot?<br />Will high-ticket clients trust it?
          </h2>
          <p className="text-zinc-300 ios-subtext sm:text-[16px] max-w-2xl mx-auto leading-relaxed">
            First impressions are everything in Pakistan. Whether you are dealing with a 100M PKR property buyer, a retail shopper, or a clinical patient, our voice agents speak natural, polite Urdu and English.
          </p>
        </motion.div>

        {/* The Tablet / Interactive Experience Container */}
        <motion.div variants={staggerItemVariants} className="max-w-5xl mx-auto rounded-3xl bg-zinc-900 p-4 sm:p-6 shadow-2xl border-4 border-zinc-800">
          
          {/* Top Scenario Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-4 p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800" role="tablist">
            {AUDIO_SCENARIOS.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={activeTab === s.id}
                onClick={() => { setActiveTab(s.id); setIsPlaying(false); }}
                className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-extrabold tracking-tight transition-all cursor-pointer ${
                  activeTab === s.id
                    ? 'bg-[#D4FF00] text-zinc-950 shadow-[0_0_12px_rgba(212,255,0,0.4)]'
                    : 'text-zinc-300 hover:text-white hover:bg-white/[0.05]'
                }`}
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}
              >
                <span>{s.title}</span>
                <span className={`hidden sm:inline text-xs ml-1.5 ${activeTab === s.id ? 'text-zinc-900 font-bold' : 'text-zinc-400 font-semibold'}`}>
                  ({s.sub.split('&')[0]})
                </span>
              </button>
            ))}
          </div>

          {/* Tablet Screen Content */}
          <div className="rounded-2xl bg-zinc-950 p-6 sm:p-8 border border-zinc-800 text-white">
            
            {/* Call Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0066FF] flex items-center justify-center font-bold text-white text-xs shadow-xs">
                  SC
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{scenario.business}</div>
                  <div className="ios-caption text-zinc-400">Agent: {scenario.agentName} · Sub-second Latency</div>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
                  <span className="ios-badge text-[10px]">01:14 · LIVE TELECOM CALL</span>
                </div>
                <div className="text-zinc-400 hidden sm:block">{scenario.callerNumber}</div>
              </div>
            </div>

            {/* Middle: Transcript & Live Lead Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8 items-start">
              
              {/* Transcript Chat Log */}
              <div className="md:col-span-8 space-y-3 font-sans">
                {scenario.transcript.map((line, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-lg ${
                      line.speaker === 'system'
                        ? 'text-zinc-400 font-mono text-[11px] italic bg-transparent py-1'
                        : line.speaker === 'agent'
                        ? 'bg-zinc-900 border border-zinc-800 text-zinc-100 ml-0 mr-auto'
                        : 'bg-[#0066FF] text-white ml-auto mr-0 shadow-md font-medium'
                    }`}
                  >
                    {line.text}
                  </div>
                ))}
              </div>

              {/* CRM Deal Drawer */}
              <div className="md:col-span-4 rounded-2xl bg-zinc-900 p-4 border border-zinc-800 space-y-3 text-xs">
                <div className="font-bold text-zinc-300 pb-2 border-b border-zinc-800 flex items-center justify-between">
                  <span className="ios-badge text-[11px] text-zinc-300">Simple CRM Lead Feed</span>
                  <span className="ios-badge text-[9px] text-[#D4FF00] font-mono">AUTOMATED</span>
                </div>
                {scenario.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-zinc-400">
                    <span className="ios-caption text-zinc-400">{item.name}</span>
                    <span className="font-mono text-zinc-200 font-semibold">{item.price}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-zinc-800 flex justify-between font-bold text-white text-sm">
                  <span className="text-xs">Pipeline Status</span>
                  <span className="text-[#D4FF00] font-mono text-xs">{scenario.total}</span>
                </div>
              </div>

            </div>

            {/* Bottom Controls: Call Me Input OR Play Demo */}
            <div className="pt-6 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Left: Test Inbound Line */}
              <form onSubmit={handleCallMe} className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-2">
                <span className="ios-caption text-zinc-300 font-medium whitespace-nowrap">
                  Test a live call to your phone:
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={phoneNumber}
                    maxLength={25}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4FF00] w-full sm:w-48 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#D4FF00] hover:bg-[#c6ee00] text-zinc-950 font-bold text-xs transition-colors cursor-pointer shrink-0 border border-[#bfe800]"
                  >
                    {callTriggered ? 'Dialing...' : 'Call me'}
                  </button>
                </div>
              </form>

              {/* Right: Or Listen to a demo first */}
              <div className="flex items-center gap-3">
                <span className="ios-caption text-zinc-300 font-medium">Or listen to demo audio:</span>
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                    isPlaying ? 'bg-[#0066FF] text-white shadow-[0_0_12px_rgba(0,102,255,0.5)]' : 'bg-white hover:bg-zinc-100 text-zinc-950'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-white" />
                      <span>Audio Playing (Tone Active)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#0066FF] fill-[#0066FF]" />
                      <span>Play Audio Demo</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
