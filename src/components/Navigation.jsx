import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Sun, Moon, LogOut } from 'lucide-react';

const Navigation = ({ activeSection, scrollTo, isDark, toggleTheme, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };
    if (isMenuOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isMenuOpen, closeMenu]);

  const navLinks = ['home', 'about', 'skills', 'projects', 'reviews', 'contact'];

  // Add admin link if user is authenticated
  const allLinks = user ? [...navLinks, 'admin'] : navLinks;

  if (!mounted) {
    return null;
  }

  const handleNavClick = (item) => {
    if (item === 'admin') {
      window.location.href = '/admin';
    } else {
      scrollTo(item);
    }
    closeMenu();
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    closeMenu();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled ? 'py-1 sm:py-2' : 'py-2 sm:py-3'
        }`}
      >
        <nav
          role="navigation"
          aria-label="Main navigation"
          className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            isScrolled
              ? 'max-w-5xl rounded-xl sm:rounded-2xl shadow-lg'
              : 'max-w-6xl sm:rounded-full'
          } ${
            isDark
              ? 'bg-slate-900/80 backdrop-blur-xl border border-white/10'
              : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between h-12 sm:h-14">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollTo('home')}
                className="group relative inline-flex items-center justify-center font-bold text-lg sm:text-xl hover:scale-105 transition-transform duration-300"
                aria-label="Go to home"
              >
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Jamiu M. A.
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {allLinks.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`relative px-3 py-2 text-sm font-medium capitalize tracking-wide transition-all duration-300 hover:scale-105 ${
                    activeSection === item
                      ? 'text-blue-600 dark:text-blue-400 shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  aria-current={activeSection === item ? 'page' : undefined}
                >
                  <span className="relative z-10">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                  {activeSection === item && (
                    <span className="absolute inset-0 rounded-lg bg-blue-100/50 dark:bg-blue-900/30 blur-sm scale-110 -z-10" />
                  )}
                </button>
              ))}

              {/* Theme Toggle */}
              <div className="ml-4 pl-4 border-l border-gray-200/50 dark:border-gray-700">
                <button
                  onClick={toggleTheme}
                  className="relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-180 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ring-inset"
                  title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center md:hidden gap-2">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-500" />
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ring-inset shadow-sm"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          id="mobile-menu"
          className="fixed inset-0 z-[60] md:hidden"
          role="menu"
          aria-modal="true"
          aria-hidden={!isMenuOpen}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
            onClick={closeMenu}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <div 
            ref={menuRef}
            className="fixed top-20 left-4 right-4 mx-2 pt-6 pb-4 z-10 rounded-2xl shadow-2xl bg-white/95 dark:bg-slate-900/95 border border-gray-200/50 dark:border-gray-700 backdrop-blur-xl max-h-[calc(100vh-5rem)] overflow-y-auto"
          >
            <nav className="px-1">
              {allLinks.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`w-full text-left px-6 py-4 text-lg font-semibold capitalize block transition-all duration-300 rounded-xl mb-2 last:mb-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ring-inset ${
                    activeSection === item
                      ? 'text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:shadow-md'
                  }`}
                  role="menuitem"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
              
              {/* Logout button for authenticated users */}
              {user && (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-6 py-4 text-lg font-semibold capitalize flex items-center transition-all duration-300 rounded-xl mt-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ring-inset bg-red-50/50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/30 shadow-sm border border-red-200/50 dark:border-red-800/50"
                  role="menuitem"
                >
                  <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
                  Logout
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;

