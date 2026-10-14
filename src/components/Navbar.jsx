import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Workflow, Building2, Calculator, Mail, CalendarCheck, ArrowUpRight } from 'lucide-react';
import SmartConvoLogo from './SmartConvoLogo';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { id: 'how-it-works', label: 'How it works' },
  { to: '/industries', label: 'Industries' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'calculator', label: 'ROI' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const MOBILE_ITEMS = [
  { label: 'Home', icon: Home, home: true },
  { id: 'how-it-works', label: 'How', icon: Workflow },
  { to: '/industries', label: 'Industries', icon: Building2 },
  { cta: true },
  { id: 'calculator', label: 'ROI', icon: Calculator },
  { to: '/contact', label: 'Contact', icon: Mail },
];

const font = { fontFamily: 'Poppins, system-ui, sans-serif' };

export default function Navbar({ onOpenModal, onScrollTo }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (!onHome) return setActive('');
      let current = '';
      for (const l of LINKS) {
        if (!l.id) continue;
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 140) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onHome]);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (l) => (l.to ? pathname === l.to : onHome && active === l.id);

  const goHome = () => {
    setOpen(false);
    if (onHome) window.scrollTo({ top: 0, behavior: 'smooth' });
    else navigate('/');
  };
  const mobileActive = (it) => {
    if (it.home) return onHome && !active;
    if (it.to) return pathname === it.to;
    return onHome && active === it.id;
  };

  const go = (l) => {
    setOpen(false);
    if (l.to) return navigate(l.to);
    if (onHome) { setActive(l.id); onScrollTo(l.id); }
    else navigate(`/#${l.id}`);
  };

  return (
    <>
    <header style={font} className="sticky top-0 z-50 px-3 sm:px-6 pt-2.5 sm:pt-4 pointer-events-none">
      <div
        className={`header-glow pointer-events-auto mx-auto max-w-6xl flex items-center justify-between gap-3 rounded-full border pl-4 sm:pl-6 pr-2 h-[52px] sm:h-[60px] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 ${
          scrolled || !onHome
            ? 'bg-panel/80 border-white/10 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)]'
            : 'bg-white/[0.04] border-white/10'
        }`}
      >
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity shrink-0">
          <span className="hidden sm:inline-flex"><SmartConvoLogo markSize={36} underline accentTag /></span>
          <span className="inline-flex sm:hidden"><SmartConvoLogo markSize={28} underline accentTag /></span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => go(l)}
              className={`relative px-3.5 py-2 text-[13.5px] tracking-wide cursor-pointer transition-colors ${
                isActive(l) ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {l.label}
              <span
                className={`absolute left-3.5 right-3.5 bottom-0.5 h-[2px] rounded-full bg-[#D4FF00] origin-center transition-transform duration-300 ${
                  isActive(l) ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />
        <button
          onClick={() => onOpenModal()}
          className="group whitespace-nowrap inline-flex items-center gap-2 h-[38px] sm:h-[44px] pl-4 sm:pl-5 pr-1.5 rounded-full bg-[#D4FF00] hover:bg-[#c6ee00] text-zinc-950 text-[13px] sm:text-[14px] font-semibold shadow-[0_6px_24px_rgba(212,255,0,0.35)] hover:shadow-[0_8px_30px_rgba(212,255,0,0.5)] transition-all duration-200 cursor-pointer"
        >
          Book a demo
          <span className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] rounded-full bg-zinc-950 text-[#D4FF00] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
            <ArrowUpRight className="w-4 h-4" strokeWidth={2.4} />
          </span>
        </button>
        </div>
      </div>
    </header>

    {/* Mobile bottom navigation: floating glass pill */}
    <nav
      aria-label="Primary"
      className="lg:hidden fixed z-50 inset-x-0 bottom-0 px-4 pointer-events-none"
      style={{ paddingBottom: 'max(10px, env(safe-area-inset-bottom))' }}
    >
      <div
        className="pointer-events-auto mx-auto max-w-[360px] flex items-center justify-between rounded-full px-1.5 py-1.5 border border-white/15 bg-panel/70 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_12px_40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.12)]"
        style={font}
      >
        {MOBILE_ITEMS.map((it) => {
          if (it.cta) {
            return (
              <button
                key="cta"
                onClick={() => onOpenModal()}
                aria-label="Book a demo"
                className="relative -my-3 w-[46px] h-[46px] shrink-0 rounded-full bg-[#D4FF00] text-zinc-950 flex items-center justify-center shadow-[0_8px_28px_rgba(212,255,0,0.5)] active:scale-95 transition-transform cursor-pointer"
              >
                <CalendarCheck className="w-5 h-5" strokeWidth={2.2} />
              </button>
            );
          }
          const Icon = it.icon;
          const on = mobileActive(it);
          return (
            <button
              key={it.label}
              onClick={() => (it.home ? goHome() : go(it))}
              className={`flex flex-col items-center gap-0.5 min-w-[46px] px-1.5 py-1 rounded-full transition-colors cursor-pointer ${on ? 'text-white' : 'text-zinc-400'}`}
            >
              <span className={`flex items-center justify-center w-8 h-6 rounded-full transition-colors ${on ? 'bg-[#D4FF00]/20 text-accent' : ''}`}>
                <Icon className="w-[17px] h-[17px]" strokeWidth={on ? 2.3 : 1.9} />
              </span>
              <span className="text-[9.5px] leading-none font-medium tracking-wide">{it.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
    </>
  );
}
