import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Loading from '../Loading';

const ProjectsAdmin = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', tech: '', link: '', image: '', featured: false });

  const API_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `${API_URL}/projects/${editing.id}` : `${API_URL}/projects`;
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, tech: formData.tech.split(',').map(t => t.trim()) }),
      });
      if (response.ok) {
        fetchProjects();
        setEditing(null);
        setFormData({ title: '', description: '', tech: '', link: '', image: '', featured: false });
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEdit = (project) => {
    setEditing(project);
    setFormData({ ...project, tech: project.tech.join(', ') });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        const response = await fetch(`${API_URL}/projects/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl xs:text-3xl font-bold mb-4 xs:mb-6 text-gray-900 dark:text-white">Manage Projects</h1>
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
            placeholder="Link"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 touch-target focus-ring text-sm xs:text-base">
            {editing ? 'Update' : 'Add'} Project
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 touch-target focus-ring text-sm xs:text-base xs:ml-2"
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
                  <td className="p-3 xs:p-4 text-sm xs:text-base">{project.tech.join(', ')}</td>
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
                        onClick={() => handleDelete(project.id)}
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
    </div>
  );
};

export default ProjectsAdmin;
