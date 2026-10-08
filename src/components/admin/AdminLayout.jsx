import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../ThemeToggle';
import { LogOut, LayoutDashboard, Folder, Code, Mail, Upload, Menu, X, Star, ExternalLink } from 'lucide-react';

const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/projects', icon: Folder, label: 'Projects' },
  { path: '/admin/skills', icon: Code, label: 'Skills' },
  { path: '/admin/contacts', icon: Mail, label: 'Contacts' },
  { path: '/admin/reviews', icon: Star, label: 'Reviews' },
  { path: '/admin/uploads', icon: Upload, label: 'Uploads' },
];

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const title = menuItems.find((m) => pathname.startsWith(m.path))?.label || 'Admin';

  useEffect(() => { setOpen(false); }, [pathname]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-5 dark:border-white/10">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 text-sm font-bold text-white">JM</span>
        <div className="leading-tight">
          <p className="font-display font-semibold">Showroom</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Admin navigation">
        {menuItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5'
              }`
            }
          >
            <Icon className="h-[18px] w-[18px]" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1 border-t border-gray-200 p-3 dark:border-white/10">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
        >
          <ExternalLink className="h-[18px] w-[18px]" /> View site
        </a>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
        >
          <LogOut className="h-[18px] w-[18px]" /> Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-gray-200 bg-white lg:block dark:border-white/10 dark:bg-gray-900">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Admin menu">
          <button className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label="Close menu" />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-2xl dark:bg-gray-900">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-3.5 rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-gray-200 bg-white/85 px-4 backdrop-blur-xl sm:px-6 dark:border-white/10 dark:bg-gray-900/80">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="touch-target inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 lg:hidden dark:border-white/10"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-display text-lg font-semibold sm:text-xl">{title}</h1>
          </div>
          <ThemeToggle />
        </header>

        <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
