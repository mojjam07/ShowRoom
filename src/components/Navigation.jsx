import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navigation = ({ activeSection, scrollTo, isDark, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const navLinks = ['home', 'about', 'skills', 'projects', 'contact'];

  if (!mounted) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled ? 'py-1 sm:py-2' : 'py-2 sm:py-3'
        }`}
      >
        <nav
          className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            isScrolled
              ? 'max-w-5xl rounded-xl sm:rounded-2xl shadow-lg'
              : 'max-w-6xl sm:rounded-full'
          } ${
            isDark
              ? 'bg-slate-900/80 dark:bg-slate-900/90 backdrop-blur-xl border border-white/10'
              : 'bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl border border-gray-200 shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between h-12 sm:h-14">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollTo('home')}
                className="group relative inline-flex items-center justify-center"
              >
                <span className="relative text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  Jamiu M. A.
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center space-x-1">
                {navLinks.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    className={`relative px-3 py-2 text-sm font-medium capitalize tracking-wide transition-all duration-300 ${
                      activeSection === item
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <span className="relative z-10">{item}</span>
                    {activeSection === item && (
                      <span className="absolute inset-0 rounded-lg bg-blue-100/50 dark:bg-blue-900/30 -z-0" />
                    )}
                  </button>
                ))}
              </div>

              {/* Theme Toggle */}
              <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                <button
                  onClick={toggleTheme}
                  className="relative group p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-180 focus:outline-none"
                  title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                <span className="relative z-10">
                    {isDark ? (
                      <Sun className="w-5 h-5 text-amber-400" />
                    ) : (
                      <Moon className="w-5 h-5 text-blue-500" />
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative group p-2 mr-2 rounded-full transition-all duration-300 hover:scale-110"
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-500" />
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="relative group p-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" ref={menuRef}>
          <div
            className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(false);
            }}
          />
          <div className="absolute top-full left-4 right-4 mt-2 p-2 rounded-2xl shadow-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700">
            <div className="py-2">
              {navLinks.map((item) => (
                <button
                  key={item}
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollTo(item);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-base font-medium capitalize transition-all duration-300 ${
                    activeSection === item
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;

