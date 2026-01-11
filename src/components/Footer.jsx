import React from 'react';
import { Mail, Code, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();



  return (
    <footer className="bg-gray-100 dark:bg-slate-900/50 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                Mojjam Tech
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-400 text-sm mb-4">
              Crafting beautiful digital experiences<br />
              with modern technologies.
            </p>
          </div>

          {/* Contact CTA */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Let's Work Together
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Have a project in mind?
            </p>
            <a
              href="mailto:mojjam07@gmail.com"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-full text-sm font-medium hover:from-blue-700 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              <Mail className="w-3.5 h-3.5" />
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200/50 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {currentYear} Mojjam Tech. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>by</span>
              <a 
                href="#home" 
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Jamiu M. A.
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

