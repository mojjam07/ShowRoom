import React, { createContext, useContext, useState, useEffect } from 'react';

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

  const API_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    if (token) {
      // Optionally verify token with backend
      setUser({}); // Mock user, in real app decode JWT
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    console.log('AuthContext: Attempting login for:', email);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log('AuthContext: Login response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('AuthContext: Login successful');
        setToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setUser({}); // Set user data if returned
        return { success: true };
      } else {
        const errorData = await response.json();
        console.error('AuthContext: Login failed:', errorData.error);
        return { success: false, error: errorData.error || 'Login failed' };
      }
    } catch (error) {
      console.error('AuthContext: Login network error:', error.message);
      return { success: false, error: `Network error: ${error.message}` };
    }
  };

  const register = async (email, password) => {
    console.log('AuthContext: Attempting registration for:', email);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log('AuthContext: Register response status:', response.status);

      if (response.ok) {
        console.log('AuthContext: Registration successful');
        return { success: true };
      } else {
        const errorData = await response.json();
        console.error('AuthContext: Registration failed:', errorData.error);
        return { success: false, error: errorData.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('AuthContext: Registration network error:', error.message);
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
    } catch (error) {
      console.error('Logout error:', error);
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
    } catch (error) {
      console.error('Refresh token error:', error);
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
      console.log('apiCall: Token expired, attempting refresh...');
      const newToken = await refreshAccessToken();
      
      if (newToken) {
        console.log('apiCall: Token refreshed successfully, retrying request...');
        headers.Authorization = `Bearer ${newToken}`;
        response = await fetch(url, { ...options, headers });
      } else {
        console.log('apiCall: Refresh failed, logging out user...');
        // Refresh failed - logout user
        logout();
        // Return a response that indicates auth failure
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
