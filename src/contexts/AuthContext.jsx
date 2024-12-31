import React, { createContext, useState, useEffect } from 'react';
import { isAuthenticated as checkAuth } from '../components/services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(checkAuth());

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthenticated(!!localStorage.getItem('accessToken'));
    };

    // Listen for storage changes (e.g., login/logout in other tabs)
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (token) => {
    localStorage.setItem('accessToken', token);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
