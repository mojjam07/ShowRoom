import React, { useState } from 'react';
import { Code, Server, Wrench, Cloud, Star, ChevronDown, ChevronUp } from 'lucide-react';

const Skills = ({ skills }) => {
  const [expandedCategory, setExpandedCategory] = useState(new Set());

  // Icon mapping for categories
  const categoryIcons = {
    frontend: Code,
    backend: Server,
    tools: Wrench,
    cloud: Cloud,
    default: Star
  };

  // Category colors
  const categoryColors = {
    frontend: { from: 'from-purple-500', to: 'to-violet-600', bg: 'purple' },
    backend: { from: 'from-blue-500', to: 'to-cyan-600', bg: 'blue' },
    tools: { from: 'from-amber-500', to: 'to-orange-600', bg: 'amber' },
    cloud: { from: 'from-emerald-500', to: 'to-teal-600', bg: 'emerald' },
    default: { from: 'from-pink-500', to: 'to-rose-600', bg: 'pink' }
  };

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setExpandedCategory(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  return (
    <section id="skills" className="flex items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium mb-3">
            What I work with
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-bold mb-3">
            My <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">Skills</span>
          </h2>
        </div>

        {Object.keys(groupedSkills).length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No skills available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => {
              const IconComponent = categoryIcons[category.toLowerCase()] || categoryIcons.default;
              const colors = categoryColors[category.toLowerCase()] || categoryColors.default;
              const isExpanded = expandedCategory.has(category);

              return (
                <div
                  key={category}
                  className="group relative overflow-hidden rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 transition-all duration-300 hover:shadow-lg"
                >
                  {/* Gradient Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.from} ${colors.to}`} />

                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br ${colors.from} ${colors.to} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 capitalize">
                          {category}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {categorySkills.length} skill{categorySkills.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className={`p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Skills Grid */}
                  <div 
                    className={`px-4 sm:px-5 pb-4 sm:pb-5 transition-all duration-300 ease-in-out ${
                      isExpanded 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                    style={isExpanded ? { maxHeight: '500px' } : {}}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-4 sm:pt-5">
                      {categorySkills.map((skill) => (
                        <div
                          key={skill.id}
                          className="skill-item relative p-2.5 rounded-lg bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600/50 hover:border-purple-400 transition-all duration-300 cursor-default"
                        >
                          <div className="flex items-center justify-center text-center">
                            <span className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                              {skill.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Glow */}
                  <div className={`absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br ${colors.from} ${colors.to} rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
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

