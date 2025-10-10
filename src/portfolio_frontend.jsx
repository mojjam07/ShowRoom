import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchData();
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, skillsRes] = await Promise.all([
        fetch(`${API_URL}/projects`),
        fetch(`${API_URL}/skills`)
      ]);
      const projectsData = await projectsRes.json();
      const skillsData = await skillsRes.json();
      setProjects(projectsData);
      setSkills(skillsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setProjects([
        { id: 1, title: 'E-Commerce Platform', description: 'Full-stack shopping experience with secure payments', tech: ['React', 'Node.js', 'MongoDB'], link: '#' },
        { id: 2, title: 'Task Management App', description: 'Collaborative project management tool', tech: ['React', 'Express', 'PostgreSQL'], link: '#' },
        { id: 3, title: 'Social Media Dashboard', description: 'Analytics and insights platform', tech: ['React', 'D3.js', 'Firebase'], link: '#' },
        { id: 4, title: 'Real-Time Chat App', description: 'WebSocket-based messaging system', tech: ['React', 'Socket.io', 'Redis'], link: '#' },
        { id: 5, title: 'Weather Forecast App', description: 'Beautiful weather visualization', tech: ['React', 'REST API', 'Charts'], link: '#' },
        { id: 6, title: 'Portfolio CMS', description: 'Content management system', tech: ['React', 'Node.js', 'MySQL'], link: '#' }
      ]);
      setSkills([
        { id: 1, name: 'React.js', level: 90, category: 'frontend' },
        { id: 2, name: 'Node.js', level: 85, category: 'backend' },
        { id: 3, name: 'TypeScript', level: 80, category: 'frontend' },
        { id: 4, name: 'MongoDB', level: 75, category: 'backend' },
        { id: 5, name: 'Express.js', level: 88, category: 'backend' },
        { id: 6, name: 'Tailwind CSS', level: 92, category: 'frontend' },
        { id: 7, name: 'PostgreSQL', level: 78, category: 'backend' },
        { id: 8, name: 'Git & GitHub', level: 85, category: 'tools' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
    setTimeout(() => setFormStatus(''), 3000);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen">
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        scrollTo={scrollTo}
      />
      <Hero scrollTo={scrollTo} />
      <About />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Contact
        formData={formData}
        setFormData={setFormData}
        formStatus={formStatus}
        handleSubmit={handleSubmit}
      />
      <Footer />
    </div>
  );
};

export default Portfolio;