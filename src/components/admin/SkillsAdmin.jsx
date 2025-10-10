import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Edit, Trash2 } from 'lucide-react';

const SkillsAdmin = () => {
  const { token } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', level: 0, category: '' });

  const API_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${API_URL}/skills`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `${API_URL}/skills/${editing.id}` : `${API_URL}/skills`;
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchSkills();
        setEditing(null);
        setFormData({ name: '', level: 0, category: '' });
      }
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleEdit = (skill) => {
    setEditing(skill);
    setFormData(skill);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        const response = await fetch(`${API_URL}/skills/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) fetchSkills();
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Manage Skills</h1>
      <form onSubmit={handleSubmit} className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="number"
            placeholder="Level (0-100)"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
            min="0"
            max="100"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {editing ? 'Update' : 'Add'} Skill
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
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Level</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id} className="border-t dark:border-gray-600">
                <td className="p-4">{skill.name}</td>
                <td className="p-4">{skill.level}%</td>
                <td className="p-4">{skill.category}</td>
                <td className="p-4">
                  <button onClick={() => handleEdit(skill)} className="mr-2 text-blue-500 hover:text-blue-700">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(skill.id)} className="text-red-500 hover:text-red-700">
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

export default SkillsAdmin;
