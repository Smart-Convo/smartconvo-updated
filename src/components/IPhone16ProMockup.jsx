import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SmartConvoMark } from './SmartConvoLogo';

/**
 * iPhone 16 Pro (natural titanium) + iOS WhatsApp (light) chat demo.
 * Scripted appointment booking: Dr. Umer Aziz, Cardiology, General Practice Hospital.
 */

const sf = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif';

// Scripted conversation. `from: 'me'` = patient (outgoing), `from: 'bot'` = agent (incoming)
const SCRIPT = [
  { from: 'bot', time: '9:38 AM', text: 'Assalam o Alaikum! 👋 *General Practice Hospital* mein khush aamdeed. Main Zara hoon, aap ki virtual assistant.\n\nBataiye, main aap ki kya madad kar sakti hoon?' },
  { from: 'me', time: '9:38 AM', text: 'Walaikum Assalam. Mujhe pichle ek hafte se seene mein dard hai aur seerhiyan chadhte hue saans phoolti hai. Mujhe heart specialist ko dikhana hai.' },
  { from: 'bot', time: '9:38 AM', text: 'Yeh sun kar afsos hua, aap ne rabta kiya yeh acha kiya. Main abhi Cardiology department mein aap ki appointment book kar deti hoon.\n\n⚠️ Agar dard bohat shadeed ho jaye, bazu ya jabray tak phailay, ya chakkar aayein, to foran hamari *Emergency* mein aa jayein.\n\nPehle apna poora naam bata dein, please?' },
  { from: 'me', time: '9:39 AM', text: 'Ahmed Raza' },
  { from: 'bot', time: '9:39 AM', text: 'Shukriya Ahmed sahab. Kya aap pehli dafa General Practice Hospital aa rahe hain?' },
  { from: 'me', time: '9:39 AM', text: 'Ji, pehli dafa' },
  { from: 'bot', time: '9:39 AM', text: 'Koi baat nahi, main aap ki patient file bana deti hoon.\n\nAap ki alamaat ke mutabiq main *Dr. Umer Aziz* ko recommend karungi:\nConsultant Cardiologist\nMBBS, FCPS (Cardiology)\n\nMain un ka schedule check karti hoon… 🔎' },
  {
    from: 'bot', time: '9:40 AM',
    text: 'Dr. Umer Aziz kal, *Jumeraat 15 October* ko in waqton par available hain:',
    buttons: ['10:00 AM', '11:30 AM', '4:00 PM', '6:30 PM'],
  },
  { from: 'me', time: '9:40 AM', text: 'Shaam 4:00 baje theek rahega' },
  { from: 'bot', time: '9:40 AM', text: 'Behtareen! Maine aap ke liye *4:00 PM* ka slot hold kar diya hai. 🔒\n\nReminder ke liye apna mobile number confirm kar dein? Is chat par 0300-1234567 nazar aa raha hai.' },
  { from: 'me', time: '9:41 AM', text: 'Ji bilkul sahi hai' },
  { from: 'bot', time: '9:41 AM', card: true, text: 'Aap ki appointment confirm ho gayi hai, Ahmed sahab. ✅' },
  { from: 'bot', time: '9:41 AM', text: '📋 Barah-e-meharbani yeh saath layein:\n• CNIC\n• Pehle ki ECG, echo ya blood reports (agar hain)\n• Jo dawaiyan aap istemal kar rahe hain un ki list\n\nRegistration ke liye 15 minute pehle pohanch jayein. Main appointment se 2 ghantay pehle reminder bhej dungi. Waqt badalna ya cancel karna ho to *RESCHEDULE* ya *CANCEL* likh dein.' },
  { from: 'me', time: '9:42 AM', text: 'Bohat shukriya 🙏' },
  { from: 'bot', time: '9:42 AM', text: 'Aap ka bohat shukriya! Apna khayal rakhiye ga, kal milte hain. Allah aap ko sehat de. 💚' },
];


const DoubleTick = () => (
  <svg width="16" height="11" viewBox="0 0 16 11" className="inline-block ml-0.5" fill="none" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 5.8 4.2 9 10.6 1.6" />
    <path d="M6.2 8.6 7 9.4 13.6 1.6" />
  </svg>
);

// Render *bold* segments
const rich = (t) =>
  t.split(/(\*[^*]+\*)/g).map((p, i) =>
    p.startsWith('*') && p.endsWith('*') && p.length > 2 ? <strong key={i} className="font-semibold">{p.slice(1, -1)}</strong> : <React.Fragment key={i}>{p}</React.Fragment>
  );

const Tail = ({ out }) => (
  <svg
    width="8" height="13" viewBox="0 0 8 13"
    className="absolute top-0"
    style={out ? { right: -7.5 } : { left: -7.5 }}
  >
    {out
      ? <path d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" fill="#D9FDD3" />
      : <path d="M1.533 2.568 8 11.358V0H2.812C1.042 0 .474 1.156 1.533 2.568z" fill="#FFFFFF" />}
  </svg>
);

function Bubble({ m, first }) {
  const out = m.from === 'me';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22 }}
      className={`flex flex-col ${out ? 'items-end' : 'items-start'} ${first ? 'mt-[14px]' : 'mt-[5px]'}`}
    >
      <div
        className={`relative max-w-[82%] rounded-[8px] px-[9px] pt-[6px] pb-[6px] shadow-[0_1px_1px_rgba(11,20,26,0.14)] ${
          out ? 'bg-[#D9FDD3]' : 'bg-white'
        } ${first ? (out ? 'rounded-tr-none' : 'rounded-tl-none') : ''}`}
      >
        {first && <Tail out={out} />}
        {m.card ? (
          <div>
            <div className="text-[13.5px] leading-[18.5px] text-[#111B21] mb-2">{rich(m.text)}</div>
            <div className="rounded-[7px] bg-[#F0F2F5] overflow-hidden mb-1.5">
              <div className="px-2.5 py-2 bg-[#008069] text-white text-[11px] font-medium tracking-wider">APPOINTMENT CONFIRMED</div>
              <div className="px-2.5 py-2.5 space-y-[6px] text-[12px] leading-[17px] text-[#111B21]">
                {[
                  ['Doctor', 'Dr. Umer Aziz'],
                  ['Department', 'Cardiology'],
                  ['Hospital', 'General Practice Hospital'],
                  ['Tareekh', 'Jumeraat, 15 Oct'],
                  ['Waqt', '4:00 PM'],
                  ['Mareez', 'Ahmed Raza'],
                  ['Ref #', 'GPH-CAR-20481'],
                  ['Fees', 'Rs. 3,000 (reception par)'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <span className="text-[#667781] shrink-0">{k}</span>
                    <span className="font-medium text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[11px] text-[#667781] text-right leading-none">{m.time}</div>
          </div>
        ) : (
          <>
            <div className="text-[13.5px] leading-[18.5px] text-[#111B21] whitespace-pre-line break-words">
              {rich(m.text)}
              <span className={`inline-block ${out ? 'w-[74px]' : 'w-[50px]'}`} />
            </div>
            <span className="absolute right-[8px] bottom-[5px] text-[11px] leading-none text-[#667781] flex items-center gap-[2px]">
              {m.time}
              {out && <DoubleTick />}
            </span>
          </>
        )}
      </div>

      {m.buttons && (
        <div className="w-[80%] mt-[3px] space-y-[3px]">
          {m.buttons.map((b) => (
            <div
              key={b}
              className="w-full bg-white rounded-[9px] h-[38px] text-[14.5px] text-[#027EB5] shadow-[0_1px_1px_rgba(11,20,26,0.14)] flex items-center justify-center gap-1.5"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#027EB5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              {b}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

const Typing = () => (
  <div className="flex items-start mt-[14px]">
    <div className="bg-white rounded-[9px] rounded-tl-none px-3 py-[11px] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] flex gap-[4px]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[6px] h-[6px] rounded-full bg-[#8696A0]"
          animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  </div>
);

export default function IPhone16ProMockup() {
  const [shown, setShown] = useState(1);
  const [typing, setTyping] = useState(false);
  const [callSeconds, setCallSeconds] = useState(8);
  const scroller = useRef(null);

  // Call timer for the Dynamic Island
  useEffect(() => {
    const t = setInterval(() => setCallSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Reveal the scripted chat progressively, then leave it scrollable
  useEffect(() => {
    if (shown >= SCRIPT.length) return;
    const next = SCRIPT[shown];
    const gap = 700;
    const typingMs = (next.from === 'bot' ? 1100 : 600) + Math.min(next.text.length * 8, 1200);
    const t1 = setTimeout(() => setTyping(next.from === 'bot'), gap);
    const t2 = setTimeout(() => { setTyping(false); setShown((n) => n + 1); }, gap + typingMs);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [shown]);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [shown, typing]);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div data-keep-dark className="relative flex flex-col items-center py-2 sm:py-4 select-none [zoom:0.82] sm:[zoom:1]">
      {/* ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[560px] rounded-full blur-[90px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(0,102,255,0.16) 40%, rgba(6,7,9,0) 75%)' }} />

      <div className="relative">
        {/* Side hardware (natural titanium) */}
        <div className="absolute -left-[3px] top-[96px] w-[3px] h-[24px] rounded-l-sm bg-gradient-to-r from-[#8d8a85] to-[#b9b5ae]" />
        <div className="absolute -left-[3px] top-[140px] w-[3px] h-[46px] rounded-l-sm bg-gradient-to-r from-[#8d8a85] to-[#b9b5ae]" />
        <div className="absolute -left-[3px] top-[198px] w-[3px] h-[46px] rounded-l-sm bg-gradient-to-r from-[#8d8a85] to-[#b9b5ae]" />
        <div className="absolute -right-[3px] top-[160px] w-[3px] h-[72px] rounded-r-sm bg-gradient-to-l from-[#8d8a85] to-[#b9b5ae]" />
        <div className="absolute -right-[3px] top-[290px] w-[3px] h-[40px] rounded-r-sm bg-gradient-to-l from-[#7c7974] to-[#b9b5ae]" />

        {/* Titanium frame */}
        <div
          className="phone-frame relative w-[312px] sm:w-[336px] h-[680px] rounded-[58px] p-[3px]"
          style={{
            background: 'linear-gradient(145deg,#d6d2ca 0%,#9a968f 22%,#c9c5bd 48%,#85817b 74%,#bdb9b1 100%)',
            boxShadow: '0 50px 90px -40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.25), inset 0 0 2px rgba(255,255,255,0.7)',
          }}
        >
          {/* black bezel */}
          <div className="w-full h-full rounded-[55px] bg-black p-[9px]">
            {/* Screen */}
            <div className="relative w-full h-full rounded-[46px] overflow-hidden bg-[#EFEAE2] flex flex-col" style={{ fontFamily: sf }}>

              {/* Status bar + header share the WhatsApp nav colour */}
              <div className="relative z-20 bg-[#F7F7F7]">
                <div className="relative h-[54px] px-[24px] flex items-center justify-between">
                  <span className="text-[15px] font-semibold text-black tracking-tight w-[54px] pl-1">9:41</span>

                  {/* Dynamic Island: live call activity */}
                  <motion.div
                    initial={{ width: 100, opacity: 0 }}
                    animate={{ width: 140, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.3 }}
                    className="absolute left-1/2 -translate-x-1/2 top-[11px] h-[32px] rounded-full bg-black flex items-center justify-between pl-[3px] pr-3"
                  >
                    <div className="w-[26px] h-[26px] shrink-0 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 border border-zinc-600/60 flex items-center justify-center">
                      <SmartConvoMark size={17} />
                    </div>
                    <span className="text-[10.5px] font-medium text-[#30D158] tabular-nums">{fmt(callSeconds)}</span>
                    <div className="flex items-center gap-[2px] h-4">
                      {[0.5, 0.9, 0.45, 1, 0.6, 0.85, 0.5].map((h, i) => (
                        <motion.span
                          key={i}
                          className="w-[2px] rounded-full"
                          style={{ height: 16, background: i < 4 ? '#30D158' : '#FF9F0A' }}
                          animate={{ scaleY: [h * 0.3, h, h * 0.4, h * 0.9, h * 0.3] }}
                          transition={{ duration: 0.9 + (i % 3) * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  <div className="flex items-center gap-[4px] w-[64px] justify-end scale-[0.88] origin-right">
                    <svg width="18" height="12" viewBox="0 0 18 12" fill="#000"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="#000" strokeWidth="1.9" strokeLinecap="round"><path d="M1.2 4.3a10 10 0 0 1 13.6 0" /><path d="M3.7 7a6.4 6.4 0 0 1 8.6 0" /><circle cx="8" cy="10.2" r="1.1" fill="#000" stroke="none" /></svg>
                    <svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.8" stroke="#000" opacity="0.4" /><rect x="2" y="2" width="19" height="9" rx="2.5" fill="#000" /><path d="M24 4.5v4c.9-.3 1.6-1.1 1.6-2s-.7-1.7-1.6-2z" fill="#000" opacity="0.45" /></svg>
                  </div>
                </div>

                {/* WhatsApp chat header */}
                <div className="h-[52px] px-2 flex items-center border-b border-black/[0.08]">
                  <div className="flex items-center -ml-0.5">
                    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="#007AFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2 2 10l8 8" /></svg>
                  </div>
                  <div className="w-[32px] h-[32px] ml-1.5 rounded-full bg-white border border-black/10 flex items-center justify-center shrink-0 overflow-hidden">
                    <img src="/logos/gp-hospital-small.png" alt="General Practice Hospital" className="w-[24px] h-[24px] object-contain" draggable={false} />
                  </div>
                  <div className="ml-1.5 min-w-0 flex-1 leading-tight">
                    <div className="flex items-center gap-1">
                      <span className="text-[13px] font-semibold text-black truncate tracking-tight">General Practice Hospital</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" className="shrink-0"><circle cx="12" cy="12" r="11" fill="#00A884" /><path d="m7 12.5 3.3 3.3L17 9" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div className="text-[12px] text-[#667781] truncate">{typing ? 'typing…' : 'Business Account'}</div>
                  </div>
                  <div className="flex items-center gap-[12px] pr-1 shrink-0">
                    <svg width="22" height="17" viewBox="0 0 24 18" fill="none" stroke="#007AFF" strokeWidth="1.9" strokeLinejoin="round"><rect x="1.5" y="2" width="14.5" height="14" rx="3.5" /><path d="m16 7 6-3.5v11L16 11z" /></svg>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="1.9" strokeLinejoin="round"><path d="M5.5 3h3l1.8 5-2.3 1.5a11 11 0 0 0 6.5 6.5L16 13.7l5 1.8v3a2.5 2.5 0 0 1-2.7 2.5C10.7 20.4 3.6 13.3 3 5.7A2.5 2.5 0 0 1 5.5 3z" /></svg>
                  </div>
                </div>
              </div>

              {/* Chat wallpaper + scrollable messages */}
              <div
                ref={scroller}
                className="flex-1 overflow-y-auto px-[10px] pt-2 pb-2 [&::-webkit-scrollbar]:hidden"
                style={{
                  backgroundColor: '#E5DDD5',
                  backgroundSize: '340px auto',
                  backgroundImage: 'url(/whatsapp-bg.png)',
                  scrollbarWidth: 'none',
                }}
              >
                <div className="flex justify-center my-2">
                  <span className="text-[11px] font-medium text-[#54656F] bg-white/95 rounded-[7px] px-[10px] py-[3px] shadow-[0_1px_1px_rgba(11,20,26,0.1)]">Today</span>
                </div>
                <div className="flex justify-center mb-3">
                  <span className="text-[10.5px] leading-[14px] text-[#54656F] bg-[#FEF4C5] rounded-[8px] px-3 py-[6px] text-center max-w-[94%] shadow-[0_1px_0.5px_rgba(11,20,26,0.08)]">
                    🔒 Messages and calls are end-to-end encrypted. This business uses a secure service from Meta to manage this chat.
                  </span>
                </div>

                {SCRIPT.slice(0, shown).map((m, i) => (
                  <Bubble key={i} m={m} first={i === 0 || SCRIPT[i - 1].from !== m.from} />
                ))}
                {typing && <Typing />}
              </div>

              {/* Input bar */}
              <div className="relative shrink-0 bg-[#F7F7F7] border-t border-black/[0.08] px-2 pt-[7px] pb-[26px] flex items-center gap-2.5">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="1.9" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                <div className="flex-1 h-[34px] rounded-full bg-white border border-black/[0.12] flex items-center justify-between px-3">
                  <span className="text-[15px] text-[#8E8E93]">Message</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /></svg>
                </div>
                <svg width="26" height="22" viewBox="0 0 26 22" fill="none" stroke="#007AFF" strokeWidth="1.9" strokeLinejoin="round"><path d="M3 5h4l2-3h8l2 3h4a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 23 20H3a1.5 1.5 0 0 1-1.5-1.5v-12A1.5 1.5 0 0 1 3 5z" /><circle cx="13" cy="12.2" r="4.2" /></svg>
                <svg width="22" height="26" viewBox="0 0 22 26" fill="none" stroke="#007AFF" strokeWidth="1.9" strokeLinecap="round"><rect x="7" y="1.5" width="8" height="14" rx="4" /><path d="M2.5 12a8.5 8.5 0 0 0 17 0M11 20.5v4" /></svg>

                {/* Home indicator */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[8px] w-[124px] h-[5px] rounded-full bg-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
