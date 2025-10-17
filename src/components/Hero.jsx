import React from 'react';
import { Github, Linkedin, Mail, Instagram, Facebook, MessageCircle, Twitter } from 'lucide-react';
import profileImg from '../assets/profile.png';

const Hero = ({ scrollTo }) => {
  return (
    <section id="home" className="flex items-center justify-center px-2 xs:px-3 sm:px-4 lg:px-6 pt-24 pb-4 xs:pt-8">
      <div className="text-center max-w-4xl mx-auto w-full">
        <div className="mb-6 xs:mb-8 relative">
          <div className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
              <img src={profileImg} alt="Profile" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
          <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </div>
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-fluid-6xl font-bold mb-4 xs:mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
          Jamiu Mojeed Adekunle
        </h1>
        <p className="text-lg xs:text-xl sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 xs:mb-8 px-2">
          Full Stack Developer : Crafting beautiful digital experiences with modern technologies
        </p>
        <div className="flex gap-3 xs:gap-4 justify-center flex-wrap px-2">
          <button
            onClick={() => scrollTo('projects')}
            className="px-6 xs:px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 text-sm xs:text-base touch-target focus-ring"
          >
            View Works
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-6 xs:px-8 py-3 border-2 border-purple-400 rounded-full hover:bg-purple-400/10 transition-all text-sm xs:text-base touch-target focus-ring"
          >
            Get In Touch
          </button>
        </div>
        <div className="flex gap-4 xs:gap-6 justify-center mt-6 xs:mt-8 flex-wrap">
          <a href="https://github.com/mojjam07" className="hover:text-purple-400 transition-colors touch-target focus-ring p-2">
            <Github size={20} className="xs:w-6 xs:h-6" />
          </a>
          <a href="www.linkedin.com/in/mojeed-jamiu-b279171a2#" className="hover:text-purple-400 transition-colors touch-target focus-ring p-2">
            <Linkedin size={20} className="xs:w-6 xs:h-6" />
          </a>
          <a href="mailto:mojjam07@gmail.com" className="hover:text-purple-400 transition-colors touch-target focus-ring p-2">
            <Mail size={20} className="xs:w-6 xs:h-6" />
          </a>
          <a href="https://instagram.com/yourusername" className="hover:text-purple-400 transition-colors touch-target focus-ring p-2">
            <Instagram size={20} className="xs:w-6 xs:h-6" />
          </a>
          <a href="https://facebook.com/yourusername" className="hover:text-purple-400 transition-colors touch-target focus-ring p-2">
            <Facebook size={20} className="xs:w-6 xs:h-6" />
          </a>
          <a href="https://wa.me/yourphonenumber" className="hover:text-purple-400 transition-colors touch-target focus-ring p-2">
            <MessageCircle size={20} className="xs:w-6 xs:h-6" />
          </a>
          <a href="https://twitter.com/yourusername" className="hover:text-purple-400 transition-colors touch-target focus-ring p-2">
            <Twitter size={20} className="xs:w-6 xs:h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
