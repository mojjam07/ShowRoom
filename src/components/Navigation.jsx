import React from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navigation = ({ isMenuOpen, setIsMenuOpen, activeSection, scrollTo, isDark, toggleTheme }) => {
  return (
    <nav className="fixed w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg z-50 border-b border-gray-300/20 dark:border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Jamiu M. A.
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'skills', 'projects', 'contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`capitalize transition-all ${
                  activeSection === item
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-400'
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => {
                console.log('Theme button clicked in Navigation. Calling toggleTheme.');
                toggleTheme();
              }}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => {
                console.log('Theme button clicked in Navigation (mobile). Calling toggleTheme.');
                toggleTheme();
              }}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors mr-2"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-purple-500/20">
          {['home', 'about', 'skills', 'projects', 'contact'].map(item => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="block w-full text-left px-4 py-3 capitalize text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-purple-900/30"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
