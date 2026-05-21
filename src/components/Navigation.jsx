import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, LogOut } from 'lucide-react';

const Navigation = ({ activeSection, scrollTo, user, onLogout }) => {

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
          isScrolled ? 'py-1 sm:py-1.5' : 'py-2 sm:py-2.5'
        }`}
      >
        <nav
          role="navigation"
          aria-label="Main navigation"
          className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 bg-white/75 backdrop-blur-xl border border-gray-200/50 shadow-lg rounded-full`}
        >

          <div className="flex items-center justify-between h-11 sm:h-13">

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
                  className={`relative px-3 py-2 text-sm font-semibold capitalize tracking-wide transition-all duration-300 hover:scale-105 ${
                    activeSection === item
                      ? 'text-blue-700'
                      : 'text-gray-600 hover:text-blue-700'
                  }`}
                  aria-current={activeSection === item ? 'page' : undefined}
                >
                  <span className="relative z-10">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                  {activeSection === item ? (
                    <span className="absolute inset-0 rounded-full bg-blue-50/70 border border-blue-100/70 shadow-sm -z-10" />
                  ) : (
                    <span className="absolute inset-0 rounded-full bg-transparent border border-transparent -z-10" />
                  )}
                </button>

              ))}



            </div>

            {/* Mobile controls */}
            <div className="flex items-center md:hidden gap-2">

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="touch-target group relative p-2.5 sm:p-3 rounded-full bg-white/70 backdrop-blur-xl border border-gray-200/60 hover:bg-white transition-all duration-300 shadow-sm overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ring-inset"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" aria-hidden="true" />
                <span className="relative z-10 inline-flex items-center justify-center w-10 h-10">
                  {isMenuOpen ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700 group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700 group-hover:scale-105 transition-transform duration-300" />
                  )}
                </span>
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
          role="dialog"
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
            className="fixed top-16 left-4 right-4 mx-2 pt-6 pb-4 z-10 rounded-2xl shadow-2xl bg-white/95 border border-gray-200/50 backdrop-blur-xl max-h-[calc(100vh-4rem)] overflow-y-auto"

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

