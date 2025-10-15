import React from 'react';
import { Code, Briefcase } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center px-2 xs:px-3 sm:px-4 lg:px-6 py-8 xs:py-12 sm:py-16">
      <div className="max-w-8xl mx-auto w-full">
        <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl font-bold mb-8 xs:mb-10 sm:mb-12 text-center">
          About <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Me</span>
        </h2>
        <div className="grid lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 items-center">
          <div className="space-y-4 xs:space-y-6 text-base xs:text-lg text-gray-700 dark:text-gray-300">
            <p>
              I'm a passionate full-stack developer with expertise in building scalable web applications.
              My journey in tech has equipped me with a diverse skill set and a problem-solving mindset.
            </p>
            <p>
              I specialize in React, Node.js, and modern JavaScript frameworks, creating seamless user
              experiences backed by robust backend systems.
            </p>
            <p>
              When I'm not coding, I'm exploring new technologies, contributing to open source, or sharing
              knowledge with the developer community.
            </p>
          </div>
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 xs:p-8 rounded-2xl border border-gray-300/20 dark:border-purple-500/20">
            <div className="flex items-center gap-3 xs:gap-4 mb-4 xs:mb-6">
              <Code className="text-purple-400 flex-shrink-0 xs:w-8 xs:h-8" size={28} />
              <div>
                <h3 className="text-xl xs:text-2xl font-bold">2+</h3>
                <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400">Years of Experience</p>
              </div>
            </div>
            <div className="flex items-center gap-3 xs:gap-4">
              <Briefcase className="text-pink-400 flex-shrink-0 xs:w-8 xs:h-8" size={28} />
              <div>
                <h3 className="text-xl xs:text-2xl font-bold">7+</h3>
                <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400">Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
