import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const KEY = 'sc-theme';
const Ctx = createContext({ theme: 'dark', isLight: false, toggle: () => {}, setTheme: () => {} });

const read = () => {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'light' || v === 'dark') return v;
  } catch { /* storage unavailable */ }
  return 'dark';
};

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(read);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f5fb' : '#060709');
    try { localStorage.setItem(KEY, theme); } catch { /* ignore */ }
  }, [theme]);

  const setTheme = useCallback((t) => setThemeState(t), []);
  const toggle = useCallback(() => setThemeState((t) => (t === 'light' ? 'dark' : 'light')), []);

  return <Ctx.Provider value={{ theme, isLight: theme === 'light', toggle, setTheme }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
