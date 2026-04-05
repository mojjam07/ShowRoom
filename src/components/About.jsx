import React, { useState, useEffect } from 'react';
import { Code, Briefcase, Sparkles, Zap, Target, Lightbulb } from 'lucide-react';
import { API_URL } from '../config/api';

const About = () => {
  const [animatedStats, setAnimatedStats] = useState({
    years: 0,
    projects: 0,
    satisfaction: 100
  });
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);

  // Calculate years of experience from October 2022
  const calculateYearsOfExperience = () => {
    const startDate = new Date('2022-10-01');
    const now = new Date();
    const years = (now - startDate) / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(years);
  };

  // Fetch total projects from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/stats`);
        if (response.ok) {
          const stats = await response.json();
          setTotalProjects(stats.totalProjects || 0);
        } else {
          console.error('Failed to fetch stats');
          setTotalProjects(6); // fallback
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        setTotalProjects(6); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (totalProjects === 0) return; // Wait for data to load

    const duration = 2000; // Animation duration in ms
    const steps = 60; // Number of animation steps
    const yearsTarget = calculateYearsOfExperience();

    let step = 0;
    const interval = duration / steps;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setAnimatedStats({
        years: Math.floor(easeOut * yearsTarget),
        projects: Math.floor(easeOut * totalProjects),
        satisfaction: Math.floor(easeOut * 100)
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedStats({
          years: yearsTarget,
          projects: totalProjects,
          satisfaction: 100
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [totalProjects]);

  const stats = [
    { icon: Code, value: `${animatedStats.years}+`, label: 'Years Experience', color: 'blue' },
    { icon: Briefcase, value: `${animatedStats.projects}+`, label: 'Projects Completed', color: 'blue' },
    { icon: Zap, value: `${animatedStats.satisfaction}%`, label: 'Client Satisfaction', color: 'green' },
    { icon: Target, value: '∞', label: 'Learning Mindset', color: 'gray' },
  ];

  const highlights = [
    {
      icon: Lightbulb,
      title: 'Problem Solver',
      description: 'Transforming complex ideas into clean, efficient solutions',
    },
    {
      icon: Sparkles,
      title: 'Clean Architecture',
      description: 'Building scalable systems with reusable components',
    },
    {
      icon: Zap,
      title: 'Performance Driven',
      description: 'Optimizing every layer for speed and scalability',
    },
  ];

  return (
    <section id="about" className="flex items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">
            Get to know me
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-bold mb-3">
            About <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Left Side - Bio */}
          <div className="space-y-4 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            <div className="relative">
              <div className="absolute -left-3 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
              <p className="pl-4">
                I'm a passionate <span className="font-semibold text-blue-600 dark:text-blue-400">Full Stack Developer</span> with a focus on building scalable, high-performance web applications that solve real-world problems.
              </p>
            </div>

            <p className="pl-0">
              I specialize in <span className="font-semibold text-blue-600 dark:text-blue-400">React, Node.js, and modern JavaScript frameworks</span> like Next.js and Express. My development philosophy emphasizes clean architecture, reusable components, and responsive design.
            </p>

            <p className="pl-0">
              When I'm not coding, I'm exploring emerging technologies, contributing to open-source projects, or mentoring aspiring developers.
            </p>

            {/* Highlights */}
            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-white/10 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300"
                >
                  <item.icon className="w-5 h-5 text-blue-500 mb-2" />
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Stats Cards */}
          <div className="space-y-3 sm:space-y-4">
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat) => {
                // Helper to get gradient classes based on color
                const getGradientClasses = (color) => {
                  switch(color) {
                    case 'blue': return 'from-blue-500 to-blue-600';
                    case 'green': return 'from-green-500 to-green-600';
                    case 'gray': return 'from-gray-500 to-gray-600';
                    default: return 'from-blue-500 to-blue-600';
                  }
                };
                const gradientClasses = getGradientClasses(stat.color);

                return (
                  <div
                    key={stat.label}
                    className="group relative p-4 sm:p-5 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${stat.color === 'blue' ? 'from-blue-500/10' : stat.color === 'green' ? 'from-green-500/10' : 'from-gray-500/10'} to-transparent`} />
                    <div className="relative z-10">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${gradientClasses} flex items-center justify-center mb-3 shadow-lg`}>
                        <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent mb-1">
                        {stat.value}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Info Card */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-white/10">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {['React', 'Node.js', 'Next.js', 'Express', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Docker'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-xs text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-blue-800/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

