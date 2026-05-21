import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { API_URL } from './config/api';
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
import Reviews from './components/Reviews';
import ReviewsAdmin from './components/admin/ReviewsAdmin';
import UploadsAdmin from './components/admin/UploadsAdmin';



const Portfolio = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [projects, setProjects] = useState([]);
const [skills, setSkills] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchData = useCallback(async () => {
    try {
const [projectsRes, skillsRes, reviewsRes] = await Promise.all([
        fetch(`${API_URL}/projects`),
        fetch(`${API_URL}/skills`),
        fetch(`${API_URL}/reviews`)
      ]);

      const projectsData = await projectsRes.json();
      const skillsData = await skillsRes.json();
      const reviewsData = await reviewsRes.json();

      // Update state with fetched data (could be empty arrays)
      setProjects(projectsData || []);
      setSkills(skillsData || []);
      setReviews(reviewsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Set empty arrays on error
      setProjects([]);
      setSkills([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const handleScroll = () => {
const sections = ['home', 'about', 'skills', 'projects', 'reviews', 'contact'];
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 text-gray-900">
      <Navigation
        activeSection={activeSection}
        scrollTo={scrollTo}
        user={user}
        onLogout={logout}
      />

      <main>
        <Hero scrollTo={scrollTo} />
        <About />
        <Skills skills={skills} />
<Projects projects={projects} />
        <Reviews reviews={reviews} />
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
        <Route path="reviews" element={<ReviewsAdmin />} />
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

