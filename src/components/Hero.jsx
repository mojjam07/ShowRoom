import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import profileImg from '../assets/profile.png';

const Hero = ({ scrollTo }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8 relative">
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
          <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
            <img src={profileImg} alt="Profile" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>
          <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
          Jamiu Mojeed Adekunle
        </h1>
    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
      Full Stack Developer : Crafting beautiful digital experiences with modern technologies
    </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => scrollTo('projects')}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            View Works
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-8 py-3 border-2 border-purple-400 rounded-full hover:bg-purple-400/10 transition-all"
          >
            Get In Touch
          </button>
        </div>
        <div className="flex gap-6 justify-center mt-8">
          <a href="https://github.com/mojjam07" className="hover:text-purple-400 transition-colors">
            <Github size={24} />
          </a>
          <a href="www.linkedin.com/in/mojeed-jamiu-b279171a2#" className="hover:text-purple-400 transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="mailto:mojjam07@gmail.com" className="hover:text-purple-400 transition-colors">
            <Mail size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
