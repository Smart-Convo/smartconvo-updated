import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Workflow, Building2, Calculator, Mail, ArrowUpRight, Info, LayoutDashboard, Plug, HelpCircle } from 'lucide-react';
import SmartConvoLogo from './SmartConvoLogo';
import ThemeToggle from './ThemeToggle';
import { DASHBOARD_URL } from '../lib/links';

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
  { id: 'calculator', label: 'ROI', icon: Calculator },
  { to: '/about', label: 'About', icon: Info },
  { to: '/contact', label: 'Contact', icon: Mail },
  { href: DASHBOARD_URL, label: 'Dashboard', icon: LayoutDashboard, product: true },
  { id: 'how-it-works', label: 'How it works', icon: Workflow },
  { to: '/industries', label: 'Industries', icon: Building2 },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

const font = { fontFamily: 'Poppins, system-ui, sans-serif' };

export default function Navbar({ onOpenModal, onScrollTo }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === '/';
  const barRef = useRef(null);
  const [hover, setHover] = useState(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

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

  // keep the active item visible in the scrolling bar
  useEffect(() => {
    const bar = barRef.current;
    const el = bar && bar.querySelector('[data-active="true"]');
    if (el) bar.scrollTo({ left: el.offsetLeft - bar.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  }, [pathname, active]);

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
        className={`header-glow pointer-events-auto relative mx-auto max-w-6xl flex items-center justify-between gap-3 rounded-full border pl-4 sm:pl-6 pr-2 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 ${
          scrolled ? 'h-[50px] sm:h-[56px]' : 'h-[54px] sm:h-[64px]'
        } ${
          scrolled || !onHome
            ? 'bg-panel/80 border-white/10 shadow-[0_14px_40px_-16px_rgba(0,0,0,0.7)]'
            : 'bg-white/[0.04] border-white/10'
        }`}
      >
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity shrink-0">
          <span className="hidden sm:inline-flex"><SmartConvoLogo markSize={38} underline tagline={false} /></span>
          <span className="inline-flex sm:hidden"><SmartConvoLogo markSize={30} underline tagline={false} /></span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5" onMouseLeave={() => setHover(null)}>
          {LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => go(l)}
              onMouseEnter={() => setHover(l.label)}
              className={`relative px-3.5 py-2 text-[13.5px] tracking-wide cursor-pointer transition-colors ${
                isActive(l) || hover === l.label ? 'text-white' : 'text-zinc-400'
              }`}
            >
              {hover === l.label && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-full bg-white/[0.07]"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{l.label}</span>
              <span
                className={`absolute left-3.5 right-3.5 bottom-0.5 h-[2px] rounded-full bg-[#D4FF00] origin-center transition-transform duration-300 ${
                  isActive(l) ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden xl:inline-flex items-center gap-1.5 h-[42px] px-4 rounded-full border border-white/15 hover:border-white/40 text-[13.5px] font-medium text-white transition-colors"
          >
            Dashboard
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} />
          </a>
          <ThemeToggle />
          <button
            onClick={() => onOpenModal()}
            className="group whitespace-nowrap inline-flex items-center gap-2 h-[36px] sm:h-[42px] pl-4 sm:pl-5 pr-1.5 rounded-full bg-[#D4FF00] hover:bg-[#c6ee00] text-zinc-950 text-[13px] sm:text-[14px] font-semibold shadow-[0_4px_14px_rgba(212,255,0,0.2)] transition-all duration-200 cursor-pointer"
          >
            Book a demo
            <span className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] rounded-full bg-zinc-950 text-[#D4FF00] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <ArrowUpRight className="w-4 h-4" strokeWidth={2.4} />
            </span>
          </button>
        </div>

        {/* reading progress, a quiet hairline along the bottom edge */}
        <motion.span aria-hidden="true" className="pointer-events-none absolute left-8 right-8 -bottom-px h-px origin-left rounded-full bg-accent opacity-70" style={{ scaleX: progress }} />
      </div>
    </header>

    {/* Mobile bottom navigation: glass bar, scrolls sideways */}
    <nav
      aria-label="Primary"
      className="lg:hidden fixed z-50 inset-x-0 bottom-0 px-3 pointer-events-none"
      style={{ paddingBottom: 'max(10px, env(safe-area-inset-bottom))' }}
    >
      <div
        ref={barRef}
        className="pointer-events-auto mx-auto max-w-[460px] flex items-center gap-1 overflow-x-auto snap-x rounded-full px-2 py-1.5 border border-white/15 bg-panel/70 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_12px_40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.12)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ ...font, WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 14px, #000 calc(100% - 22px), transparent 100%)', maskImage: 'linear-gradient(90deg, transparent 0, #000 14px, #000 calc(100% - 22px), transparent 100%)' }}
      >
        {MOBILE_ITEMS.map((it) => {
          const Icon = it.icon;
          const on = mobileActive(it);
          const cls = `snap-start shrink-0 flex flex-col items-center gap-0.5 min-w-[62px] px-2 py-1 rounded-full transition-colors cursor-pointer ${on ? 'text-white' : 'text-zinc-400'}`;
          const inner = (
            <>
              <span className={`flex items-center justify-center w-9 h-6 rounded-full transition-colors ${it.product ? 'bg-[#D4FF00] text-zinc-950' : on ? 'bg-[#D4FF00]/20 text-accent' : ''}`}>
                <Icon className="w-[17px] h-[17px]" strokeWidth={on || it.product ? 2.3 : 1.9} />
              </span>
              <span className={`text-[9.5px] leading-none font-medium tracking-wide whitespace-nowrap ${it.product ? 'text-white' : ''}`}>{it.label}</span>
            </>
          );
          if (it.href) {
            return (
              <a key={it.label} href={it.href} target="_blank" rel="noopener noreferrer" className={cls} data-nav-item>
                {inner}
              </a>
            );
          }
          return (
            <button key={it.label} data-nav-item data-active={on ? 'true' : undefined} onClick={() => (it.home ? goHome() : go(it))} className={cls}>
              {inner}
            </button>
          );
        })}
      </div>
    </nav>
    </>
  );
}
