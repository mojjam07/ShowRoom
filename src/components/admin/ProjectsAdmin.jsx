import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Edit, Trash2 } from 'lucide-react';

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

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Manage Projects</h1>
      <form onSubmit={handleSubmit} className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="text"
            placeholder="Tech (comma separated)"
            value={formData.tech}
            onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="url"
            placeholder="Link"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <input
            type="url"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white md:col-span-2"
            required
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="mr-2"
            />
            Featured
          </label>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {editing ? 'Update' : 'Add'} Project
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => setEditing(null)}
            className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Tech</th>
              <th className="p-4 text-left">Featured</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t dark:border-gray-600">
                <td className="p-4">{project.title}</td>
                <td className="p-4">{project.tech.join(', ')}</td>
                <td className="p-4">{project.featured ? 'Yes' : 'No'}</td>
                <td className="p-4">
                  <button onClick={() => handleEdit(project)} className="mr-2 text-blue-500 hover:text-blue-700">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsAdmin;
