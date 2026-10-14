import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle({ className = '' }) {
  const { isLight, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Dark mode' : 'Light mode'}
      className={`relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isLight ? 'sun' : 'moon'}
          initial={{ y: 14, opacity: 0, rotate: -60 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 60 }}
          transition={{ duration: 0.22 }}
          className="flex"
        >
          {isLight ? <Sun className="w-[18px] h-[18px]" strokeWidth={2} /> : <Moon className="w-[18px] h-[18px]" strokeWidth={2} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
