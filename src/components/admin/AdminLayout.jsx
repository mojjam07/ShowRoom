import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, LayoutDashboard, Folder, Code, Mail, Upload, Settings } from 'lucide-react';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        </div>
        <nav className="mt-8">
          <Link to="/admin" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link to="/admin/projects" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Folder className="w-5 h-5 mr-3" /> Projects
          </Link>
          <Link to="/admin/skills" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Code className="w-5 h-5 mr-3" /> Skills
          </Link>
          <Link to="/admin/contacts" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Mail className="w-5 h-5 mr-3" /> Contacts
          </Link>
          <Link to="/admin/uploads" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Upload className="w-5 h-5 mr-3" /> Uploads
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
