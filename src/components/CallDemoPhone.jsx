import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Video, Mic, MicOff, Play, Phone } from 'lucide-react';
import { SmartConvoMark } from './SmartConvoLogo';

/**
 * iPhone call demo: lock screen (tap the notification) -> iOS call screen with "Monark".
 * Plays /monark-call.mp3 (add the file to the public folder).
 */

const AUDIO_SRC = '/monark-call.mp3';
const CONTACT = 'Monark Customer Care';
const sf = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif';

const StatusIcons = ({ color = '#fff' }) => (
  <div className="flex items-center gap-[5px] scale-[0.88] origin-right">
    <svg width="18" height="12" viewBox="0 0 18 12" fill={color}><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round"><path d="M1.2 4.3a10 10 0 0 1 13.6 0" /><path d="M3.7 7a6.4 6.4 0 0 1 8.6 0" /><circle cx="8" cy="10.2" r="1.1" fill={color} stroke="none" /></svg>
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.8" stroke={color} opacity="0.4" /><rect x="2" y="2" width="19" height="9" rx="2.5" fill={color} /><path d="M24 4.5v4c.9-.3 1.6-1.1 1.6-2s-.7-1.7-1.6-2z" fill={color} opacity="0.45" /></svg>
  </div>
);

const clockTime = (d) => {
  const h = d.getHours() % 12 || 12;
  return `${h}:${String(d.getMinutes()).padStart(2, '0')}`;
};
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

function CallButton({ label, active, disabled, onClick, children }) {
  return (
    <div className="flex flex-col items-center gap-[7px]">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-[64px] h-[64px] rounded-full flex items-center justify-center transition-colors border ${
          active
            ? 'bg-[#FDF1EE] border-transparent text-black'
            : 'bg-white/[0.14] border-white/30 text-white'
        } ${disabled ? 'opacity-50' : 'cursor-pointer active:scale-95'}`}
      >
        {children}
      </button>
      <span className="text-[12.5px] text-white leading-none">{label}</span>
    </div>
  );
}

export default function CallDemoPhone() {
  // 'lock' | 'calling' | 'connected'
  const [stage, setStage] = useState('lock');
  const [seconds, setSeconds] = useState(0);
  const [speaker, setSpeaker] = useState(true);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);

  // Live device clock for lock screen / status bar
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Call timer
  useEffect(() => {
    if (stage !== 'connected') return;
    setSeconds(0);
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [stage]);

  // "Calling..." -> connected, then start audio
  useEffect(() => {
    if (stage !== 'calling') return;
    const t = setTimeout(() => setStage('connected'), 1800);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (stage === 'connected') {
      a.currentTime = 0;
      a.muted = muted;
      const p = a.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      a.pause();
    }
  }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = speaker ? 1 : 0.35;
  }, [speaker]);

  const endCall = () => {
    setStage('lock');
    setMuted(false);
    setSpeaker(true);
  };

  const startCall = () => setStage('calling');

  const inCall = stage !== 'lock';

  return (
    <div className="relative flex flex-col items-center select-none [zoom:0.82] sm:[zoom:1]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[560px] rounded-full blur-[90px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(120,70,255,0.16) 40%, rgba(6,7,9,0) 75%)' }} />

      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" onEnded={endCall} />

      <div className="relative">
        {/* Side hardware */}
        <div className="absolute -left-[3px] top-[96px] w-[3px] h-[24px] rounded-l-sm bg-gradient-to-r from-[#8d8a85] to-[#b9b5ae]" />
        <div className="absolute -left-[3px] top-[140px] w-[3px] h-[46px] rounded-l-sm bg-gradient-to-r from-[#8d8a85] to-[#b9b5ae]" />
        <div className="absolute -left-[3px] top-[198px] w-[3px] h-[46px] rounded-l-sm bg-gradient-to-r from-[#8d8a85] to-[#b9b5ae]" />
        <div className="absolute -right-[3px] top-[160px] w-[3px] h-[72px] rounded-r-sm bg-gradient-to-l from-[#8d8a85] to-[#b9b5ae]" />
        <div className="absolute -right-[3px] top-[290px] w-[3px] h-[40px] rounded-r-sm bg-gradient-to-l from-[#7c7974] to-[#b9b5ae]" />

        {/* Titanium frame */}
        <div
          className="relative w-[312px] sm:w-[336px] h-[680px] rounded-[58px] p-[3px]"
          style={{
            background: 'linear-gradient(145deg,#d6d2ca 0%,#9a968f 22%,#c9c5bd 48%,#85817b 74%,#bdb9b1 100%)',
            boxShadow: '0 40px 90px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.25), inset 0 0 2px rgba(255,255,255,0.7)',
          }}
        >
          <div className="w-full h-full rounded-[55px] bg-black p-[9px]">
            <div className="relative w-full h-full rounded-[46px] overflow-hidden bg-black" style={{ fontFamily: sf }}>

              <AnimatePresence mode="wait" initial={false}>
                {stage === 'lock' ? (
                  /* ------------------------- LOCK SCREEN ------------------------- */
                  <motion.div
                    key="lock"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 text-white"
                    style={{ background: 'radial-gradient(120% 80% at 20% 0%, #5b4bd6 0%, #2d2a7a 38%, #14122e 75%, #0a0a16 100%)' }}
                  >
                    {/* status bar */}
                    <div className="relative h-[54px] px-[24px] flex items-center justify-end">
                      <div className="absolute left-1/2 -translate-x-1/2 top-[11px] w-[104px] h-[32px] rounded-full bg-black" />
                      <StatusIcons />
                    </div>

                    <div className="flex flex-col items-center mt-[22px]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)"><path d="M7 10V8a5 5 0 0 1 10 0v2h1.5A1.5 1.5 0 0 1 20 11.5v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5v-8A1.5 1.5 0 0 1 5.5 10zm2 0h6V8a3 3 0 0 0-6 0z" /></svg>
                      <div className="mt-1 text-[16px] font-medium text-white/85">{new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(now)}</div>
                      <div className="text-[84px] leading-[88px] font-semibold tracking-tight text-white/95">{clockTime(now)}</div>
                    </div>

                    {/* Notification (the button) */}
                    <div className="absolute left-0 right-0 bottom-[150px] px-[10px]">
                      <motion.button
                        onClick={startCall}
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.25 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative w-full text-left rounded-[22px] p-[12px] bg-white/[0.2] backdrop-blur-2xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.35)] cursor-pointer"
                      >
                        <span className="absolute inset-0 rounded-[22px] ring-2 ring-[#D4FF00]/70 animate-pulse pointer-events-none" />
                        <div className="flex items-center gap-[10px]">
                          <div className="w-[38px] h-[38px] rounded-[9px] bg-black flex items-center justify-center shrink-0">
                            <SmartConvoMark size={26} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[15px] font-semibold text-white leading-tight">Listen to a live AI call</span>
                              <span className="text-[12px] text-white/60">now</span>
                            </div>
                            <div className="text-[13px] text-white/75 leading-[17px] mt-[1px]">Monark Customer Care</div>
                          </div>
                        </div>
                        <div className="mt-[12px] h-[48px] rounded-full bg-[#D4FF00] text-zinc-950 text-[16px] font-bold flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(212,255,0,0.4)]">
                          <Play className="w-4 h-4 fill-zinc-950" />
                          Tap to listen
                        </div>
                      </motion.button>
                    </div>

                    {/* lock screen shortcuts */}
                    <div className="absolute bottom-[44px] left-0 right-0 px-[34px] flex items-center justify-between">
                      <div className="w-[46px] h-[46px] rounded-full bg-black/35 backdrop-blur-xl flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M8 2h8v3l-1.5 2.5V10H9.5V7.5L8 5zM9.5 11h5v9.5a1.5 1.5 0 0 1-1.5 1.5h-2a1.5 1.5 0 0 1-1.5-1.5z" /></svg>
                      </div>
                      <div className="w-[46px] h-[46px] rounded-full bg-black/35 backdrop-blur-xl flex items-center justify-center">
                        <svg width="22" height="20" viewBox="0 0 26 22" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round"><path d="M3 5h4l2-3h8l2 3h4a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 23 20H3a1.5 1.5 0 0 1-1.5-1.5v-12A1.5 1.5 0 0 1 3 5z" /><circle cx="13" cy="12.2" r="4.2" /></svg>
                      </div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-[8px] w-[124px] h-[5px] rounded-full bg-white/90" />
                  </motion.div>
                ) : (
                  /* ------------------------- CALL SCREEN ------------------------- */
                  <motion.div
                    key="call"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 text-white"
                    style={{ background: 'linear-gradient(180deg,#2a2927 0%,#34312e 40%,#3e3633 62%,#4a2e29 82%,#5b2c24 100%)' }}
                  >
                    {/* status bar + island with orange mic dot */}
                    <div className="relative h-[54px] px-[24px] flex items-center justify-between">
                      <span className="text-[15px] font-semibold tracking-tight pl-1">{clockTime(now)}</span>
                      <div className="absolute left-1/2 -translate-x-1/2 top-[11px] w-[112px] h-[32px] rounded-full bg-black flex items-center justify-end pr-[26px]">
                        <span className="w-[6px] h-[6px] rounded-full bg-[#FF9F0A]" />
                      </div>
                      <StatusIcons />
                    </div>

                    <div className="flex flex-col items-center mt-[52px]">
                      <div className="text-[19px] text-white/55 font-medium tabular-nums h-[26px]">
                        {stage === 'calling' ? 'calling…' : fmt(seconds)}
                      </div>
                      <div className="text-[30px] leading-[36px] font-semibold tracking-tight mt-[2px] text-center px-6">{CONTACT}</div>
                    </div>

                    {/* Buttons grid */}
                    <div className="absolute left-0 right-0 bottom-[34px] px-[22px]">
                      <div className="grid grid-cols-3 gap-y-[22px] justify-items-center">
                        <CallButton label="Speaker" active={speaker} onClick={() => setSpeaker((v) => !v)}>
                          {speaker ? <Volume2 className="w-7 h-7 fill-current" strokeWidth={2} /> : <VolumeX className="w-7 h-7" strokeWidth={2} />}
                        </CallButton>
                        <CallButton label="FaceTime" disabled>
                          <Video className="w-7 h-7 fill-current opacity-60" strokeWidth={1.5} />
                        </CallButton>
                        <CallButton label="Mute" active={muted} onClick={() => setMuted((v) => !v)}>
                          {muted ? <MicOff className="w-7 h-7" strokeWidth={2} /> : <Mic className="w-7 h-7" strokeWidth={2} />}
                        </CallButton>

                        <CallButton label="More" disabled>
                          <svg width="28" height="8" viewBox="0 0 28 8" fill="#fff"><circle cx="4" cy="4" r="2.6" /><circle cx="14" cy="4" r="2.6" /><circle cx="24" cy="4" r="2.6" /></svg>
                        </CallButton>
                        <div className="flex flex-col items-center gap-[7px]">
                          <button
                            onClick={endCall}
                            className="w-[64px] h-[64px] rounded-full bg-[#D0070B] border border-white/20 flex items-center justify-center cursor-pointer active:scale-95"
                            aria-label="End call"
                          >
                            <Phone className="w-8 h-8 fill-white text-white rotate-[135deg]" strokeWidth={1.5} />
                          </button>
                          <span className="text-[12.5px] text-white leading-none">End</span>
                        </div>
                        <CallButton label="Keypad" disabled>
                          <svg width="26" height="30" viewBox="0 0 26 30" fill="#fff">
                            {[3, 13, 23].flatMap((x) => [3, 11, 19, 27].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" />))}
                          </svg>
                        </CallButton>
                      </div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-[8px] w-[124px] h-[5px] rounded-full bg-white/90" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {!inCall && (
        <div className="mt-5 text-[13px] text-zinc-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
          Tap the notification on the phone to listen to the call
        </div>
      )}
    </div>
  );
}
