import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, LayoutDashboard, Folder, Code, Mail, Upload, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-lg xs:text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 touch-target focus-ring"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="mt-6 xs:mt-8">
          <Link
            to="/admin"
            className="flex items-center px-4 py-3 xs:py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 touch-target focus-ring"
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard className="w-5 h-5 mr-3 flex-shrink-0" /> Dashboard
          </Link>
          <Link
            to="/admin/projects"
            className="flex items-center px-4 py-3 xs:py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 touch-target focus-ring"
            onClick={() => setSidebarOpen(false)}
          >
            <Folder className="w-5 h-5 mr-3 flex-shrink-0" /> Projects
          </Link>
          <Link
            to="/admin/skills"
            className="flex items-center px-4 py-3 xs:py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 touch-target focus-ring"
            onClick={() => setSidebarOpen(false)}
          >
            <Code className="w-5 h-5 mr-3 flex-shrink-0" /> Skills
          </Link>
          <Link
            to="/admin/contacts"
            className="flex items-center px-4 py-3 xs:py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 touch-target focus-ring"
            onClick={() => setSidebarOpen(false)}
          >
            <Mail className="w-5 h-5 mr-3 flex-shrink-0" /> Contacts
          </Link>
          <Link
            to="/admin/uploads"
            className="flex items-center px-4 py-3 xs:py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 touch-target focus-ring"
            onClick={() => setSidebarOpen(false)}
          >
            <Upload className="w-5 h-5 mr-3 flex-shrink-0" /> Uploads
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setSidebarOpen(false);
            }}
            className="flex items-center w-full px-4 py-3 xs:py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 touch-target focus-ring"
          >
            <LogOut className="w-5 h-5 mr-3 flex-shrink-0" /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 touch-target focus-ring"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Admin Panel</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        <div className="p-3 xs:p-4 sm:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
