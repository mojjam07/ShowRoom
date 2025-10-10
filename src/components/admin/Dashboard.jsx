import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart3, Users, Folder, Code, Mail } from 'lucide-react';

const Dashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Folder className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-gray-600 dark:text-gray-400">Projects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProjects || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Code className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <p className="text-gray-600 dark:text-gray-400">Skills</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSkills || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="text-gray-600 dark:text-gray-400">Contacts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalContacts || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Mail className="w-8 h-8 text-red-500 mr-3" />
            <div>
              <p className="text-gray-600 dark:text-gray-400">Unread Contacts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.unreadContacts || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
