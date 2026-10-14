import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  href?: string;
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm sm:text-base',
  lg: 'px-7 sm:px-9 py-3.5 text-base sm:text-lg',
};

export function Button({ variant = 'primary', size = 'md', icon, href, className, children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap';
  const variants = {
    primary: 'bg-[#D4FF00] text-zinc-950 hover:bg-[#c6ee00] shadow-[0_4px_22px_rgba(212,255,0,0.35)]',
    gradient: 'bg-[#D4FF00] text-zinc-950 hover:bg-[#c6ee00] shadow-[0_4px_22px_rgba(212,255,0,0.35)]',
    secondary: 'bg-transparent border border-white/20 text-white hover:border-[#D4FF00] hover:text-[#D4FF00]',
  };
  const cls = cn(base, variants[variant], sizes[size], className);
  if (href) {
    return (
      <Link to={href} className={cls}>
        {children}
        {icon && <span className="flex-shrink-0">{icon}</span>}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
      {icon && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
}
