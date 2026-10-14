import React from 'react';

/**
 * Official client logo components using the exact PNG assets provided:
 * 1. Monark (/logos/monark.png)
 * 2. The Vertical (/logos/the-vertical.png)
 * 3. Cougar (/logos/cougar.png)
 * 4. Royal Tag (/logos/royal-tag.png)
 * 5. DHA Lahore (/logos/dha-lahore.png)
 * 6. Haier (/logos/haier.png)
 */

export const MonarkLogo = ({ className = 'h-10 sm:h-12' }) => (
  <div className="inline-flex items-center group transition-transform hover:scale-105" title="Monark">
    <img src="/logos/monark.png" alt="Monark" className={`theme-dark-only ${className} w-auto object-contain select-none`} referrerPolicy="no-referrer" loading="eager" />
    <img src="/logos/monark-dark.png" alt="Monark" className={`theme-light-only ${className} w-auto object-contain select-none`} referrerPolicy="no-referrer" loading="eager" />
  </div>
);

export const TheVerticalLogo = ({ className = 'h-11 sm:h-13' }) => (
  <div className="inline-flex items-center group transition-transform hover:scale-105" title="The Vertical">
    <img
      src="/logos/the-vertical.png"
      alt="The Vertical"
      className={`${className} w-auto object-contain drop-shadow-[0_2px_8px_rgba(207,182,130,0.18)] select-none`}
      referrerPolicy="no-referrer"
      loading="eager"
    />
  </div>
);

export const CougarLogo = ({ className = 'h-10 sm:h-12' }) => (
  <div className="inline-flex items-center group transition-transform hover:scale-105" title="Cougar">
    <img
      src="/logos/cougar.png"
      alt="Cougar"
      className={`${className} w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.12)] select-none`}
      referrerPolicy="no-referrer"
      loading="eager"
    />
  </div>
);

export const RoyalTagLogo = ({ className = 'h-10 sm:h-12', seamless = true }) => (
  <div className="inline-flex items-center group transition-transform hover:scale-105" title="Royal Tag">
    <img
      src="/logos/royal-tag.png"
      alt="Royal Tag"
      className={`${className} w-auto object-contain ${seamless ? 'brightness-0 invert' : ''} drop-shadow-[0_2px_8px_rgba(255,255,255,0.12)] select-none`}
      referrerPolicy="no-referrer"
      loading="eager"
    />
  </div>
);

export const DhaLahoreLogo = ({ className = 'h-12 sm:h-14' }) => (
  <div className="inline-flex items-center group transition-transform hover:scale-105" title="DHA Lahore">
    <img
      src="/logos/dha-lahore.png"
      alt="DHA Lahore"
      className={`${className} w-auto object-contain drop-shadow-[0_2px_8px_rgba(160,185,230,0.18)] select-none`}
      referrerPolicy="no-referrer"
      loading="eager"
    />
  </div>
);

export const HaierLogo = ({ className = 'h-10 sm:h-12' }) => (
  <div className="inline-flex items-center group transition-transform hover:scale-105" title="Haier">
    <img
      src="/logos/haier.png"
      alt="Haier"
      className={`${className} w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.12)] select-none`}
      referrerPolicy="no-referrer"
      loading="eager"
    />
  </div>
);

export const CLIENT_LOGOS = [
  { id: 'monark', name: 'Monark', Component: MonarkLogo, src: '/logos/monark.png' },
  { id: 'the-vertical', name: 'The Vertical', Component: TheVerticalLogo, src: '/logos/the-vertical.png' },
  { id: 'cougar', name: 'Cougar', Component: CougarLogo, src: '/logos/cougar.png' },
  { id: 'royal-tag', name: 'Royal Tag', Component: RoyalTagLogo, src: '/logos/royal-tag.png' },
  { id: 'dha-lahore', name: 'DHA Lahore', Component: DhaLahoreLogo, src: '/logos/dha-lahore.png' },
  { id: 'haier', name: 'Haier', Component: HaierLogo, src: '/logos/haier.png' },
];
