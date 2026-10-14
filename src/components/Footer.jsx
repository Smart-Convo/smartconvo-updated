import React from 'react';
import { Link } from 'react-router-dom';
import SmartConvoLogo from './SmartConvoLogo';

const col = 'text-[13px] font-semibold text-white uppercase tracking-[0.18em] mb-5';
const link = 'text-[14.5px] text-zinc-400 hover:text-[#D4FF00] transition-colors';

export default function Footer() {
  return (
    <footer className="bg-zinc-950/90 backdrop-blur-md border-t border-white/[0.08] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 pb-14">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-5 space-y-5">
            <Link to="/" className="inline-block">
              <SmartConvoLogo markSize={52} />
            </Link>
            <p className="text-[14.5px] text-zinc-400 max-w-sm leading-relaxed">
              Pioneering artificial intelligence solutions that transform businesses across every industry. AI-powered
              voice agents that understand, engage, and convert 24/7.
            </p>
            <p className="text-sm text-zinc-500">Based in Toronto, Canada</p>

            <div className="flex items-center gap-4 pt-1">
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/smart-convo-voice-ai/', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { label: 'Instagram', href: 'https://instagram.com/smartconvo_ai?dlrf=MTc3MWx1ZzYzNGs3ZQ%3D%3D&utm_source=qr', d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-zinc-500 hover:text-[#D4FF00] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="lg:col-span-2">
            <h3 className={col}>Product</h3>
            <ul className="space-y-3">
              <li><Link to="/industries" className={link}>Industries</Link></li>
              <li><Link to="/#verticals" className={link}>Features</Link></li>
              <li><Link to="/#how-it-works" className={link}>How it works</Link></li>
              <li><Link to="/#calculator" className={link}>ROI calculator</Link></li>
              <li><Link to="/#faq" className={link}>FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className={col}>Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className={link}>About</Link></li>
              <li><Link to="/contact" className={link}>Contact</Link></li>
            </ul>
          </div>

          {/* Legal & contact */}
          <div className="col-span-2 lg:col-span-3">
            <h3 className={col}>Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms-and-conditions" className={link}>Terms &amp; Conditions</Link></li>
              <li><Link to="/privacy-policy" className={link}>Privacy Policy</Link></li>
            </ul>
            <div className="mt-7 space-y-2 text-[14.5px] text-zinc-400">
              <a href="mailto:info@pentagonai.co" className="block hover:text-[#D4FF00] transition-colors">info@pentagonai.co</a>
              <a href="tel:+18733715579" className="block hover:text-[#D4FF00] transition-colors">+1 (873) 371-5579</a>
              <a href="tel:+14168763223" className="block hover:text-[#D4FF00] transition-colors">+1 (416) 876-3223</a>
              <a href="tel:+923008047485" className="block hover:text-[#D4FF00] transition-colors">+92 300 8047485</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-6 text-center">
          <p className="text-sm text-zinc-500">&copy; {new Date().getFullYear()} Smart Convo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
