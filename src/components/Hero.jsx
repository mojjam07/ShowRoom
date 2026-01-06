import React from 'react';
import { Github, Linkedin, Mail, Instagram, Facebook, MessageCircle, Twitter, ArrowRight } from 'lucide-react';
import profileImg from '../assets/profile.png';

const Hero = ({ scrollTo }) => {
  return (
    <section id="home" className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="mb-4 sm:mb-6">
              <span className="inline-block px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-lg sm:text-base font-medium mb-2 sm:mb-3">
                👋 Hello, I'm
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight text-center sm:text-left">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                    Jamiu Mojeed
                  </span>
                  <span className="text-gray-800 dark:text-gray-300">Adekunle</span>
                </div>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-400 mb-4 max-w-xl mx-auto lg:mx-0">
                Full Stack Developer crafting beautiful digital experiences with modern technologies
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
              <button
                onClick={() => scrollTo('projects')}
                className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 text-white font-medium text-sm sm:text-base"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-purple-500 rounded-full hover:bg-purple-500/10 transition-all text-purple-600 dark:text-purple-400 font-medium text-sm sm:text-base"
              >
                Get In Touch
              </button>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              <a href="https://github.com/mojjam07" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110">
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-400 group-hover:text-purple-500 transition-colors" />
              </a>
              <a href="www.linkedin.com/in/mojeed-jamiu-b279171a2#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-400 group-hover:text-purple-500 transition-colors" />
              </a>
              <a href="mailto:mojjam07@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="group p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-400 group-hover:text-purple-500 transition-colors" />
              </a>
              <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-400 group-hover:text-purple-500 transition-colors" />
              </a>
              <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-400 group-hover:text-purple-500 transition-colors" />
              </a>
              <a href="https://wa.me/07063306325" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="group p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-400 group-hover:text-purple-500 transition-colors" />
              </a>
              <a href="https://twitter.com/el_munjid07" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="group p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-400 group-hover:text-purple-500 transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Side - Large Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-full blur-2xl opacity-20" />
              
              {/* Image Container */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1.5 sm:p-2">
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                    <img
                      src={profileImg}
                      alt="Jamiu Mojeed Adekunle - Full Stack Developer"
                      className="w-full h-full rounded-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-3 -right-3 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
                  <span className="text-xl sm:text-2xl">💻</span>
                </div>
                <div className="absolute -bottom-3 -left-3 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '2.5s' }}>
                  <span className="text-lg sm:text-xl">⚡</span>
                </div>
                <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-lg sm:text-xl">🎯</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-6 h-10 rounded-full border-2 border-purple-500 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-purple-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

