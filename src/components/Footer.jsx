import React from 'react';
import { Github, Linkedin, Twitter, Instagram, Mail, Code, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mojjam07', label: 'GitHub' },
    { icon: Linkedin, href: 'www.linkedin.com/in/mojeed-jamiu-b279171a2#', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/el_munjid07', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/yourusername', label: 'Instagram' },
  ];

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const techStack = ['React', 'Node.js', 'Next.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Docker'];

  return (
    <footer className="bg-gray-100 dark:bg-slate-900/50 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mojjam Tech
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-400 text-sm mb-4">
              Crafting beautiful digital experiences with modern technologies.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110 group"
                >
                  <social.icon className="w-4 h-4 text-gray-700 dark:text-gray-400 group-hover:text-purple-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-700 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
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
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
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
                className="font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
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

