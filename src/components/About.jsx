import React from 'react';
import { Code, Briefcase } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          About <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Me</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
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
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-300/20 dark:border-purple-500/20">
            <div className="flex items-center gap-4 mb-6">
              <Code className="text-purple-400" size={32} />
              <div>
                <h3 className="text-2xl font-bold">5+</h3>
                <p className="text-gray-600 dark:text-gray-400">Years Experience</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Briefcase className="text-pink-400" size={32} />
              <div>
                <h3 className="text-2xl font-bold">50+</h3>
                <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
