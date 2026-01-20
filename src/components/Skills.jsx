import React from 'react';
import { Code, Server, Wrench, Cloud, Star, ChevronDown, ChevronUp, Database, Settings, Smartphone, HelpCircle, Palette, CheckCircle, Shield, Terminal } from 'lucide-react';

const Skills = ({ skills }) => {

  // Icon mapping for categories
  const categoryIcons = {
    frontend: Code,
    backend: Server,
    tools: Wrench,
    cloud: Cloud,
    database: Database,
    devops: Settings,
    mobile: Smartphone,
    other: HelpCircle,
    design: Palette,
    testing: CheckCircle,
    security: Shield,
    programming: Terminal,
    default: Star
  };

  // Category colors (3 main colors for consistency)
  const categoryColors = {
    frontend: { from: 'from-blue-500', to: 'to-blue-600', bg: 'blue' },
    backend: { from: 'from-blue-500', to: 'to-blue-600', bg: 'blue' },
    database: { from: 'from-blue-500', to: 'to-blue-600', bg: 'blue' },
    mobile: { from: 'from-blue-500', to: 'to-blue-600', bg: 'blue' },
    programming: { from: 'from-blue-500', to: 'to-blue-600', bg: 'blue' },
    tools: { from: 'from-gray-500', to: 'to-gray-600', bg: 'gray' },
    devops: { from: 'from-gray-500', to: 'to-gray-600', bg: 'gray' },
    security: { from: 'from-gray-500', to: 'to-gray-600', bg: 'gray' },
    cloud: { from: 'from-green-500', to: 'to-green-600', bg: 'green' },
    design: { from: 'from-green-500', to: 'to-green-600', bg: 'green' },
    testing: { from: 'from-green-500', to: 'to-green-600', bg: 'green' },
    other: { from: 'from-gray-500', to: 'to-gray-600', bg: 'gray' },
    default: { from: 'from-blue-500', to: 'to-blue-600', bg: 'blue' }
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
    <section id="skills" className="flex items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">
            What I work with
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-bold mb-3">
            My <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">Skills</span>
          </h2>
        </div>

        {Object.keys(groupedSkills).length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No skills available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => {
              const IconComponent = categoryIcons[category.toLowerCase()] || categoryIcons.default;
              const colors = categoryColors[category.toLowerCase()] || categoryColors.default;

              return (
                <div
                  key={category}
                  className="group relative overflow-hidden rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 transition-all duration-300 hover:shadow-lg"
                >
                  {/* Gradient Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.from} ${colors.to}`} />

                  {/* Category Header */}
                  <div className="w-full p-4 sm:p-5 flex items-center justify-between text-left">
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
                  </div>

                  {/* Skills Grid */}
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-4 sm:pt-5">
                      {categorySkills.map((skill) => (
                        <div
                          key={skill.id}
                          className="skill-item relative p-2.5 rounded-lg bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600/50 hover:border-blue-400 transition-all duration-300 cursor-default"
                        >
                          <div className="flex items-center justify-center text-center">
                            <span className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
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

