import React, { useState, createContext, SetStateAction, useMemo } from 'react';
import { ScriptOnce } from '@tanstack/react-router';

type Theme = 'light' | 'dark';
export interface ThemeProviderProps {
  initialTheme?: string | null;
  children: React.ReactNode;
}

const themeScript = `(function() {
  try {
    const theme = localStorage.getItem('color-theme') || 'auto';
    const resolved = theme === 'auto'
      ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    document.documentElement.classList.add(resolved);
    document.documentElement.dataset.theme = resolved;
  } catch (e) {}
})();`;

const getResolvedThemeFromDom = (): Theme => {
  if (typeof document === 'undefined') {
    return 'light';
  }

  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
};

export const ThemeContext = createContext<{
  theme: string;
  setTheme: React.Dispatch<SetStateAction<string>>;
  toggleTheme: () => void;
} | null>(null);

export const ThemeProvider = ({
  initialTheme,
  children,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>(() => {
    if (initialTheme) {
      return initialTheme;
    }

    return getResolvedThemeFromDom();
  });

  const rawSetTheme = (rawTheme: string) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(rawTheme);

    root.dataset.theme = rawTheme;
    localStorage.setItem('color-theme', rawTheme);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      rawSetTheme(newTheme);
      return newTheme;
    });
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <ScriptOnce children={themeScript} />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
