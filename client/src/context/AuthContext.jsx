import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null,
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      if (parsedAuth.user && parsedAuth.user.id) {
        setAuth(parsedAuth); // Set the stored auth data if valid
      } else {
        setAuth({ token: null, user: null }); // Clear auth if no valid user data
      }
    }
  }, []);

  const login = (data) => {
    setAuth(data);
    localStorage.setItem('auth', JSON.stringify(data)); // Store user auth in localStorage
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem('auth'); // Remove from localStorage on logout
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
