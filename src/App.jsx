import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ProjectsAdmin from './components/admin/ProjectsAdmin';
import SkillsAdmin from './components/admin/SkillsAdmin';
import ContactsAdmin from './components/admin/ContactsAdmin';
import UploadsAdmin from './components/admin/UploadsAdmin';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    const isDarkMode = saved !== 'light';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return isDarkMode;
  });

  const API_URL = import.meta.env.VITE_API_URL || '/api';

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

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    console.log('Toggle theme called. New isDark state:', !isDark);
    setIsDark(!isDark);
  };

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
      // Fallback data
      setProjects([
        { id: 1, title: 'E-Commerce Platform', description: 'Full-stack shopping experience', tech: ['React', 'Node.js', 'MongoDB'], link: '#' },
        { id: 2, title: 'Task Management App', description: 'Collaborative project management', tech: ['React', 'Express', 'PostgreSQL'], link: '#' },
        { id: 3, title: 'Social Media Dashboard', description: 'Analytics and insights platform', tech: ['React', 'D3.js', 'Firebase'], link: '#' }
      ]);
      setSkills([
        { id: 1, name: 'React.js', level: 90, category: 'frontend' },
        { id: 2, name: 'Node.js', level: 85, category: 'backend' },
        { id: 3, name: 'TypeScript', level: 80, category: 'frontend' },
        { id: 4, name: 'MongoDB', level: 75, category: 'backend' }
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
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-white text-black dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 dark:text-white">
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        scrollTo={scrollTo}
        isDark={isDark}
        toggleTheme={toggleTheme}
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

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();
  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  return token ? children : <Navigate to="/admin/login" />;
};

const AppContent = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<ProjectsAdmin />} />
        <Route path="skills" element={<SkillsAdmin />} />
        <Route path="contacts" element={<ContactsAdmin />} />
        <Route path="uploads" element={<UploadsAdmin />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
