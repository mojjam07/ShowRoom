import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`touch-target inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white/70 text-gray-700 transition-colors hover:bg-gray-100 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10 ${className}`}
    >
      {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
};

export default ThemeToggle;
