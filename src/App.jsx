import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ProjectsAdmin from './components/admin/ProjectsAdmin';
import SkillsAdmin from './components/admin/SkillsAdmin';
import ContactsAdmin from './components/admin/ContactsAdmin';
import UploadsAdmin from './components/admin/UploadsAdmin';

// Fallback data for faster initial load
const fallbackProjects = [
  { id: 1, title: 'Estate Management Platform', description: 'Full-stack shopping experience with secure payments', tech: ['React', 'Node.js', 'MongoDB', 'Stripe'], link: '#', image: null, featured: true },
  { id: 2, title: 'School Management App', description: 'Collaborative project management tool', tech: ['React', 'Express', 'PostgreSQL', 'WebSocket'], link: '#', image: 'null', featured: false },
  { id: 3, title: 'Social Media Dashboard', description: 'Analytics and insights platform', tech: ['React', 'D3.js', 'Firebase', 'Cloud Functions'], link: '#', image: null, featured: true }
];

const fallbackSkills = [
  { id: 1, name: 'React.js', category: 'frontend' },
  { id: 2, name: 'Node.js', category: 'backend' },
  { id: 3, name: 'TypeScript', category: 'frontend' },
  { id: 4, name: 'MongoDB', category: 'backend' },
  { id: 5, name: 'Express.js', category: 'backend' },
  { id: 6, name: 'Tailwind CSS', category: 'frontend' },
  { id: 7, name: 'PostgreSQL', category: 'backend' },
  { id: 8, name: 'Git & GitHub', category: 'tools' },
  { id: 9, name: 'Docker', category: 'tools' },
  { id: 10, name: 'AWS', category: 'cloud' }
];

// Timeout helper (3 seconds)
const fetchWithTimeout = async (url, options = {}, timeout = 3000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
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
  }, [fetchData]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const fetchData = useCallback(async () => {
    // Set initial state with fallback data for instant UI render
    setProjects(fallbackProjects);
    setSkills(fallbackSkills);
    
    // Try to fetch fresh data with timeout
    try {
      const [projectsRes, skillsRes] = await Promise.all([
        fetchWithTimeout(`${API_URL}/projects?featured=true`),
        fetchWithTimeout(`${API_URL}/skills`)
      ]);
      
      const projectsData = await projectsRes.json();
      const skillsData = await skillsRes.json();
      
      // Only update if we got valid data
      if (projectsData && projectsData.length > 0) {
        setProjects(projectsData);
      }
      if (skillsData && skillsData.length > 0) {
        setSkills(skillsData);
      }
    } catch {
      console.log('Using fallback data - API fetch timed out or failed');
      // Already set to fallback data above, no action needed
    }
    
    // Always set loading to false after timeout (max 3 seconds)
    setIsLoading(false);
  }, [API_URL]);

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
    } catch {
      setFormStatus('error');
    }
    setTimeout(() => setFormStatus(''), 3000);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 text-gray-900 dark:text-white">
      <Navigation
        activeSection={activeSection}
        scrollTo={scrollTo}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      <main>
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
      </main>
      <Footer />
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();
  if (loading) return <Loading />;
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

