import React from 'react';
import { Code, ExternalLink } from 'lucide-react';

const Projects = ({ projects }) => {
  return (
    <section id="projects" className="min-h-screen flex items-center px-2 xs:px-3 sm:px-4 lg:px-6 py-8 xs:py-12 sm:py-16">
      <div className="max-w-9xl mx-auto w-full">
        <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl font-bold mb-8 xs:mb-10 sm:mb-12 text-center">
          Featured <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Projects</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
          {projects.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">No projects available.</p>
          ) : (
            projects.map(project => (
            <div
              key={project.id}
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-300/20 dark:border-purple-500/20 hover:border-purple-400 dark:hover:border-purple-500/50 transition-all transform hover:scale-105"
            >
              <div className="h-40 xs:h-44 sm:h-48 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center overflow-hidden">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <Code size={48} className="xs:w-12 xs:h-12 sm:w-16 sm:h-16 opacity-50" />
                )}
              </div>
              <div className="p-4 xs:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg xs:text-xl font-bold">{project.title}</h3>
                  {project.featured && (
                    <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">Featured</span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3 xs:mb-4 text-sm xs:text-base">{project.description}</p>
                <div className="flex flex-wrap gap-1 xs:gap-2 mb-3 xs:mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-2 xs:px-3 py-1 bg-purple-500/20 rounded-full text-xs xs:text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors touch-target focus-ring text-sm xs:text-base"
                >
                  View Project <ExternalLink size={14} className="xs:w-4 xs:h-4" />
                </a>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
