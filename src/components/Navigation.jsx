import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const links = ['home', 'about', 'skills', 'projects', 'reviews', 'contact'];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const Navigation = ({ activeSection, scrollTo, user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (item) => {
    if (item === 'admin') window.location.href = '/admin';
    else scrollTo(item);
    setOpen(false);
  };

  const all = user ? [...links, 'admin'] : links;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
        <nav
          aria-label="Main navigation"
          className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border pl-3 pr-2 backdrop-blur-xl transition-all duration-300 sm:pl-4 ${
            scrolled
              ? 'border-gray-200 bg-white/85 shadow-lg shadow-black/5 dark:border-white/10 dark:bg-gray-900/80'
              : 'border-transparent bg-transparent'
          }`}
        >
          <button onClick={() => go('home')} className="flex items-center gap-2.5 font-display text-base font-semibold" aria-label="Go to home">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-sm font-bold text-white">JM</span>
            <span className="hidden xs:inline">Jamiu M. A.</span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {all.map((item) => (
              <button
                key={item}
                onClick={() => go(item)}
                aria-current={activeSection === item ? 'page' : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item
                    ? 'bg-blue-50 text-blue-700 dark:bg-white/10 dark:text-blue-300'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {cap(item)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user && onLogout && (
              <button
                onClick={onLogout}
                aria-label="Log out"
                title="Log out"
                className="touch-target hidden h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100 md:inline-flex dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10"
              >
                <LogOut className="h-[18px] w-[18px]" />
              </button>
            )}
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="touch-target inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white/70 text-gray-700 md:hidden dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label="Close menu" />
          <div className="animate-slide-down absolute left-3 right-3 top-[4.5rem] max-h-[calc(100svh-6rem)] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-gray-900">
            {all.map((item) => (
              <button
                key={item}
                onClick={() => go(item)}
                aria-current={activeSection === item ? 'page' : undefined}
                className={`block w-full rounded-xl px-4 py-3.5 text-left text-base font-medium ${
                  activeSection === item
                    ? 'bg-blue-50 text-blue-700 dark:bg-white/10 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5'
                }`}
              >
                {cap(item)}
              </button>
            ))}
            {user && onLogout && (
              <button
                onClick={() => { onLogout(); setOpen(false); }}
                className="mt-1 flex w-full items-center gap-3 rounded-xl border-t border-gray-100 px-4 py-3.5 text-left text-base font-medium text-gray-700 dark:border-white/10 dark:text-gray-300"
              >
                <LogOut className="h-5 w-5" /> Log out
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
