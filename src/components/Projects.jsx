import React, { useState } from 'react';
import { Code, ExternalLink, Github, Star } from 'lucide-react';

const Projects = ({ projects }) => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(6);

  return (
    <section id="projects" className="flex items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">
            Recent Work
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-bold mb-3">
            All <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            A selection of projects I've worked on recently, showcasing my expertise in building modern web applications
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No projects available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Gradient Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Image Container */}
                <div className="relative h-40 sm:h-48 bg-gradient-to-br from-blue-600 to-blue-600 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Code className="w-14 h-14 sm:w-16 sm:h-16 text-white/30" />
                    </div>
                  )}
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                      <Star className="w-3 h-3" />
                      Featured
                    </div>
                  )}

                  {/* Hover Content */}
                  <div className={`absolute bottom-3 left-3 right-3 transform transition-all duration-300 ${hoveredProject === project.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-white text-blue-600 rounded-full font-medium text-xs hover:bg-blue-50 transition-colors shadow-lg"
                    >
                      <Github className="w-3.5 h-3.5" />
                      View Code
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-700 dark:text-gray-400 mb-3 line-clamp-2 text-sm">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center gap-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                        >
                          Live Demo
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {project.github_link && (
                        <a
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                          title="View on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Decorative Glow */}
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </article>
            ))}
          </div>
        )}

        {/* View All Projects CTA */}
        <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          {visibleProjects < projects.length && (
            <button
              onClick={() => setVisibleProjects(prev => Math.min(prev + 3, projects.length))}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-blue-700 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 text-sm"
            >
              View More Projects
            </button>
          )}
          <a
            href="https://github.com/mojjam07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-blue-700 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 text-sm"
          >
            <Github className="w-4 h-4" />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

