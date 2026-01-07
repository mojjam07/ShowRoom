import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart3, Users, Folder, Code, Mail, TrendingUp, ArrowUp, ArrowDown, Activity } from 'lucide-react';
import Loading from '../Loading';

const Dashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [animatedStats, setAnimatedStats] = useState({});

  const API_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
        // Initialize animated stats
        const initialAnimated = {};
        Object.keys(data).forEach(key => {
          initialAnimated[key] = 0;
        });
        setAnimatedStats(initialAnimated);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  }, [token, API_URL]);

  // Animate numbers on load
  useEffect(() => {
    if (Object.keys(stats).length > 0) {
      const duration = 1000;
      const steps = 60;
      const interval = duration / steps;

      Object.keys(stats).forEach(key => {
        const targetValue = stats[key] || 0;
        const increment = targetValue / steps;
        let currentValue = 0;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
          }
          setAnimatedStats(prev => ({
            ...prev,
            [key]: Math.floor(currentValue)
          }));
        }, interval);

        return () => clearInterval(timer);
      });
    }
  }, [stats]);

  if (loading) return <Loading />;

  const statCards = [
    {
      title: 'Projects',
      value: animatedStats.totalProjects || 0,
      icon: Folder,
      gradient: 'from-blue-500 to-cyan-500',
      bgLight: 'bg-blue-50 dark:bg-blue-900/20',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Skills',
      value: animatedStats.totalSkills || 0,
      icon: Code,
      gradient: 'from-green-500 to-emerald-500',
      bgLight: 'bg-green-50 dark:bg-green-900/20',
      trend: '+5%',
      trendUp: true,
    },
    {
      title: 'Contacts',
      value: animatedStats.totalContacts || 0,
      icon: Users,
      gradient: 'from-purple-500 to-violet-500',
      bgLight: 'bg-purple-50 dark:bg-purple-900/20',
      trend: '+23%',
      trendUp: true,
    },
    {
      title: 'Unread',
      value: animatedStats.unreadContacts || 0,
      icon: Mail,
      gradient: 'from-orange-500 to-red-500',
      bgLight: 'bg-orange-50 dark:bg-orange-900/20',
      trend: '-8%',
      trendUp: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your portfolio.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
            Export Report
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all">
            Add New Project
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background decoration */}
              <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full ${stat.bgLight} opacity-50 group-hover:scale-150 transition-transform duration-700`} />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg shadow-opacity-25`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    stat.trendUp 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {stat.trendUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                    {stat.trend}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                
                {/* Progress bar */}
                <div className="mt-4 h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000`}
                    style={{ width: `${Math.min((stat.value / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Folder, label: 'Add Project', color: 'bg-blue-500' },
              { icon: Code, label: 'Add Skill', color: 'bg-green-500' },
              { icon: Mail, label: 'View Contacts', color: 'bg-purple-500' },
              { icon: BarChart3, label: 'View Analytics', color: 'bg-orange-500' },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95 group"
                >
                  <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Status</h2>
          <div className="space-y-4">
            {[
              { label: 'Database', status: 'Connected', ok: true },
              { label: 'API Status', status: 'Online', ok: true },
              { label: 'Storage', status: '85% Used', ok: true },
              { label: 'Last Backup', status: '2 hours ago', ok: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.ok ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

