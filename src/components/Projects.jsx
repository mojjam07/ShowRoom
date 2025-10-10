import React from 'react';
import { Code, ExternalLink } from 'lucide-react';

const Projects = ({ projects }) => {
  return (
    <section id="projects" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Featured <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Projects</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div
              key={project.id}
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-300/20 dark:border-purple-500/20 hover:border-purple-400 dark:hover:border-purple-500/50 transition-all transform hover:scale-105"
            >
              <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Code size={64} className="opacity-50" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View Project <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
