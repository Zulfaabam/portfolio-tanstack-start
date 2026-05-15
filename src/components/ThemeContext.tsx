import React, { useState, createContext, useEffect } from 'react';
import { createClientOnlyFn, createIsomorphicFn } from '@tanstack/react-start';
import { ScriptOnce } from '@tanstack/react-router';

export type UserTheme = 'light' | 'dark' | 'system';
export type AppTheme = Exclude<UserTheme, 'system'>;

const themeStorageKey = 'color-theme';
const themes = ['light', 'dark', 'system'] as const satisfies UserTheme[];

const getStoredUserTheme = createIsomorphicFn()
  .server((): UserTheme => 'system')
  .client((): UserTheme => {
    try {
      const stored = localStorage.getItem(themeStorageKey);
      return stored && themes.includes(stored as UserTheme)
        ? (stored as UserTheme)
        : 'system';
    } catch {
      return 'system';
    }
  });

const setStoredTheme = createClientOnlyFn((theme: UserTheme) => {
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {}
});

const getSystemTheme = createIsomorphicFn()
  .server((): AppTheme => 'light')
  .client((): AppTheme => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

const handleThemeChange = createClientOnlyFn((userTheme: UserTheme) => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark', 'system');
  const newTheme = userTheme === 'system' ? getSystemTheme() : userTheme;
  root.classList.add(newTheme);

  if (userTheme === 'system') {
    root.classList.add('system');
  }
});

const setupPreferredListener = createClientOnlyFn(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = () => handleThemeChange('system');
  mediaQuery.addEventListener('change', handler);
  return () => mediaQuery.removeEventListener('change', handler);
});

const themeScript = (function () {
  function themeFn() {
    try {
      const storedTheme = localStorage.getItem('color-theme') || 'system';
      const validTheme = ['light', 'dark', 'system'].includes(storedTheme)
        ? storedTheme
        : 'system';

      if (validTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';
        document.documentElement.classList.add(systemTheme, 'system');
      } else {
        document.documentElement.classList.add(validTheme);
      }
    } catch (e) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      document.documentElement.classList.add(systemTheme, 'system');
    }
  }
  return `(${themeFn.toString()})();`;
})();

type ThemeContextProps = {
  userTheme: UserTheme;
  appTheme: AppTheme;
  setTheme: (theme: UserTheme) => void;
};
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [userTheme, setUserTheme] = useState<UserTheme>(getStoredUserTheme);

  useEffect(() => {
    if (userTheme !== 'system') return;
    return setupPreferredListener();
  }, [userTheme]);

  const appTheme = userTheme === 'system' ? getSystemTheme() : userTheme;

  const setTheme = (newUserTheme: UserTheme) => {
    setUserTheme(newUserTheme);
    setStoredTheme(newUserTheme);
    handleThemeChange(newUserTheme);
  };

  return (
    <ThemeContext value={{ userTheme, appTheme, setTheme }}>
      <ScriptOnce children={themeScript} />
      {children}
    </ThemeContext>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
