import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../config/api';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setUser({});
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setUser({});
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: `Network error: ${error.message}` };
    }
  };

  const register = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: `Network error: ${error.message}` };
    }
  };

  const logout = async () => {
    try {
      if (refreshToken) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch {
      // Silent fail on logout
    }
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  // Function to refresh access token
  const refreshAccessToken = async () => {
    if (!refreshToken) {
      logout();
      return null;
    }
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      if (response.ok) {
        const data = await response.json();
        setToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        return data.accessToken;
      } else {
        logout();
        return null;
      }
    } catch {
      logout();
      return null;
    }
  };

  // API call wrapper to handle token refresh
  const apiCall = async (url, options = {}) => {
    if (!token) {
      return new Response(JSON.stringify({ error: 'No authentication token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    let response = await fetch(url, { ...options, headers });

    // If 403 (token expired/invalid), try to refresh
    if (response.status === 403) {
      // Check if this is the refresh endpoint itself - if so, refresh token is invalid
      if (url.includes('/auth/refresh')) {
        logout();
        return new Response(JSON.stringify({ error: 'Session expired, please log in again' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const newToken = await refreshAccessToken();
      
      if (newToken) {
        headers.Authorization = `Bearer ${newToken}`;
        response = await fetch(url, { ...options, headers });
      } else {
        logout();
        return new Response(JSON.stringify({ error: 'Session expired, please log in again' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return response;
  };

  const value = {
    user,
    token,
    refreshToken,
    login,
    register,
    logout,
    refreshAccessToken,
    apiCall,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

