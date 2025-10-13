import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart3, Users, Folder, Code, Mail } from 'lucide-react';
import Loading from '../Loading';

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

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl xs:text-3xl font-bold mb-4 xs:mb-6 text-gray-900 dark:text-white">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 xs:p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Folder className="w-6 h-6 xs:w-8 xs:h-8 text-blue-500 mr-2 xs:mr-3 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 truncate">Projects</p>
              <p className="text-xl xs:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProjects || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 xs:p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Code className="w-6 h-6 xs:w-8 xs:h-8 text-green-500 mr-2 xs:mr-3 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 truncate">Skills</p>
              <p className="text-xl xs:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSkills || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 xs:p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="w-6 h-6 xs:w-8 xs:h-8 text-purple-500 mr-2 xs:mr-3 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 truncate">Contacts</p>
              <p className="text-xl xs:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalContacts || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 xs:p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Mail className="w-6 h-6 xs:w-8 xs:h-8 text-red-500 mr-2 xs:mr-3 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 truncate">Unread Contacts</p>
              <p className="text-xl xs:text-2xl font-bold text-gray-900 dark:text-white">{stats.unreadContacts || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
