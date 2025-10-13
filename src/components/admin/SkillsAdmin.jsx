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

  if (loading) return <div className="p-3 xs:p-4 sm:p-6">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl xs:text-3xl font-bold mb-4 xs:mb-6 text-gray-900 dark:text-white">Manage Skills</h1>
      <form onSubmit={handleSubmit} className="mb-4 xs:mb-6 bg-white dark:bg-gray-800 p-4 xs:p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-3 xs:p-2 border rounded dark:bg-gray-700 dark:text-white focus-ring text-sm xs:text-base"
            required
          />
          <input
            type="number"
            placeholder="Level (0-100)"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
            className="p-3 xs:p-2 border rounded dark:bg-gray-700 dark:text-white focus-ring text-sm xs:text-base"
            min="0"
            max="100"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="p-3 xs:p-2 border rounded dark:bg-gray-700 dark:text-white focus-ring sm:col-span-2 lg:col-span-1 text-sm xs:text-base"
            required
          />
        </div>
        <div className="flex flex-col xs:flex-row gap-2 xs:gap-0 mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 touch-target focus-ring text-sm xs:text-base">
            {editing ? 'Update' : 'Add'} Skill
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
          <table className="w-full min-w-[500px]">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-3 xs:p-4 text-left text-sm xs:text-base font-semibold">Name</th>
                <th className="p-3 xs:p-4 text-left text-sm xs:text-base font-semibold">Level</th>
                <th className="p-3 xs:p-4 text-left text-sm xs:text-base font-semibold">Category</th>
                <th className="p-3 xs:p-4 text-left text-sm xs:text-base font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id} className="border-t dark:border-gray-600">
                  <td className="p-3 xs:p-4 text-sm xs:text-base">{skill.name}</td>
                  <td className="p-3 xs:p-4 text-sm xs:text-base">{skill.level}%</td>
                  <td className="p-3 xs:p-4 text-sm xs:text-base">{skill.category}</td>
                  <td className="p-3 xs:p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="text-blue-500 hover:text-blue-700 touch-target focus-ring p-2"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 xs:w-5 xs:h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
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

export default SkillsAdmin;
