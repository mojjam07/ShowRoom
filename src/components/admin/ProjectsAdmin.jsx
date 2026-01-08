import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../config/api';
import { Edit, Trash2, X, CheckCircle, AlertCircle, Folder, ExternalLink, Github } from 'lucide-react';
import Loading from '../Loading';

const ProjectsAdmin = () => {
  const { apiCall } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    tech: '', 
    link: '', 
    image: '', 
    github_link: '', 
    featured: false 
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, title: '' });

  const fetchProjects = useCallback(async () => {
    try {
      const response = await apiCall(`${API_URL}/projects`);
      if (response.ok) {
        const data = await response.json();
        setProjects(Array.isArray(data) ? data : []);
      } else if (response.status === 401) {
        setError('Session expired. Please log in again.');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);
    
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `${API_URL}/projects/${editing.id}` : `${API_URL}/projects`;
    
    try {
      // Ensure tech is formatted correctly as array
      const techArray = typeof formData.tech === 'string' 
        ? formData.tech.split(',').map(t => t.trim()).filter(t => t) 
        : Array.isArray(formData.tech) ? formData.tech : [];

      const response = await apiCall(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tech: techArray }),
      });

      if (response.ok) {
        setSuccess(editing ? 'Project updated successfully!' : 'Project created successfully!');
        fetchProjects();
        setEditing(null);
        setFormData({ title: '', description: '', tech: '', link: '', image: '', github_link: '', featured: false });
        setTimeout(() => setSuccess(null), 3000);
      } else if (response.status === 401) {
        setError('Session expired. Please log in again.');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to save project');
      }
    } catch (err) {
      console.error('Error saving project:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setEditing(project);
    // Ensure tech is converted to string for the input field
    const techString = Array.isArray(project.tech) ? project.tech.join(', ') : String(project.tech || '');
    setFormData({ ...project, tech: techString, github_link: project.github_link || '' });
  };

  const handleDeleteClick = (id, title) => {
    setDeleteModal({ show: true, id, title });
  };

  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    try {
      const response = await apiCall(`${API_URL}/projects/${deleteModal.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProjects();
      } else if (response.status === 401) {
        setError('Session expired. Please log in again.');
      }
    } catch (err) {
      console.error('Error deleting project:', err);
      setError(err.message);
    } finally {
      setDeleteModal({ show: false, id: null, title: '' });
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl xs:text-3xl font-bold mb-4 xs:mb-6 text-gray-900 dark:text-white">Manage Projects</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mb-4 xs:mb-6 bg-white dark:bg-gray-800 p-4 xs:p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="p-3 xs:p-2 border rounded dark:bg-gray-700 dark:text-white focus-ring text-sm xs:text-base"
            required
          />
          <input
            type="text"
            placeholder="Tech (comma separated)"
            value={formData.tech}
            onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
            className="p-3 xs:p-2 border rounded dark:bg-gray-700 dark:text-white focus-ring text-sm xs:text-base"
            required
          />
          <input
            type="url"
            placeholder="Demo Link"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="p-3 xs:p-2 border rounded dark:bg-gray-700 dark:text-white focus-ring text-sm xs:text-base"
          />
          <input
            type="url"
            placeholder="GitHub Link"
            value={formData.github_link}
            onChange={(e) => setFormData({ ...formData, github_link: e.target.value })}
            className="p-3 xs:p-2 border rounded dark:bg-gray-700 dark:text-white focus-ring text-sm xs:text-base"
          />
          <input
            type="url"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="p-3 xs:p-2 border rounded dark:bg-gray-700 dark:text-white focus-ring text-sm xs:text-base"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="p-3 xs:p-2 border rounded dark:bg-gray-700 dark:text-white focus-ring sm:col-span-2 text-sm xs:text-base resize-vertical"
            rows="3"
            required
          />
          <label className="flex items-center sm:col-span-2">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="mr-2 w-4 h-4"
            />
            <span className="text-sm xs:text-base">Featured</span>
          </label>
        </div>
        <div className="flex flex-col xs:flex-row gap-2 xs:gap-0 mt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 touch-target focus-ring text-sm xs:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              editing ? 'Update Project' : 'Add Project'
            )}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setFormData({ title: '', description: '', tech: '', link: '', image: '', github_link: '', featured: false });
              }}
              disabled={isSubmitting}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 touch-target focus-ring text-sm xs:text-base xs:ml-2 disabled:opacity-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-3 xs:p-4 text-left text-sm xs:text-base font-semibold">Title</th>
                <th className="p-3 xs:p-4 text-left text-sm xs:text-base font-semibold">Tech</th>
                <th className="p-3 xs:p-4 text-left text-sm xs:text-base font-semibold">Featured</th>
                <th className="p-3 xs:p-4 text-left text-sm xs:text-base font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t dark:border-gray-600">
                  <td className="p-3 xs:p-4 text-sm xs:text-base">{project.title}</td>
                  <td className="p-3 xs:p-4 text-sm xs:text-base">
                    {Array.isArray(project.tech) ? project.tech.join(', ') : project.tech}
                  </td>
                  <td className="p-3 xs:p-4 text-sm xs:text-base">{project.featured ? 'Yes' : 'No'}</td>
                  <td className="p-3 xs:p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="text-blue-500 hover:text-blue-700 touch-target focus-ring p-2"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 xs:w-5 xs:h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(project.id, project.title)}
                        className="text-red-500 hover:text-red-700 touch-target focus-ring p-2"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 xs:w-5 xs:h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">Delete Project</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              Are you sure you want to delete "{deleteModal.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all disabled:opacity-50"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModal({ show: false, id: null, title: '' })}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsAdmin;
