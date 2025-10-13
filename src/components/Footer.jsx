import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 xs:py-8 border-t border-gray-300/20 dark:border-purple-500/20 text-center text-gray-600 dark:text-gray-400">
      <p className="text-sm xs:text-base">&copy; {currentYear} Mojjam Tech. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
