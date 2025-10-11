import React from 'react';

const Skills = ({ skills }) => {
  return (
    <section id="skills" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          My <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Skills</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skills.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">No skills available.</p>
          ) : (
            skills.map(skill => (
            <div key={skill.id} className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-300/20 dark:border-purple-500/20 hover:border-purple-400 dark:hover:border-purple-500/50 transition-all">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{skill.name}</span>
                <span className="text-purple-400">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-300 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
