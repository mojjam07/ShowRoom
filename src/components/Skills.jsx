import React from 'react';
import { Code, Server, Wrench, Cloud, Star } from 'lucide-react';

const Skills = ({ skills }) => {
  // Icon mapping for categories
  const categoryIcons = {
    frontend: Code,
    backend: Server,
    tools: Wrench,
    cloud: Cloud,
    default: Star
  };

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="min-h-screen flex items-center px-2 xs:px-3 sm:px-4 lg:px-6 py-8 xs:py-12 sm:py-16">
      <div className="max-w-8xl p-8 mx-auto w-full">
        <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl font-bold mb-8 xs:mb-10 sm:mb-12 text-center">
          My <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Skills</span>
        </h2>
        {Object.keys(groupedSkills).length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No skills available.</p>
        ) : (
          <div className="space-y-6 xs:space-y-8 sm:space-y-10">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => {
              const IconComponent = categoryIcons[category.toLowerCase()] || categoryIcons.default;
              return (
                <div key={category} className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 xs:p-8 rounded-xl border border-gray-300/20 dark:border-purple-500/20">
                  <h3 className="text-xl xs:text-2xl sm:text-3xl font-semibold mb-4 xs:mb-6 capitalize text-center flex items-center justify-center gap-2">
                    <IconComponent className="w-6 h-6 xs:w-8 xs:h-8" />
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xs:gap-4">
                    {categorySkills.map(skill => (
                      <div key={skill.id} className="bg-white/30 dark:bg-slate-700/50 p-3 xs:p-4 rounded-lg border border-gray-200/30 dark:border-purple-400/30 hover:border-purple-400 dark:hover:border-purple-500/50 transition-all text-center">
                        <span className="font-medium text-sm xs:text-base">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
