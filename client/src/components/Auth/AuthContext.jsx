import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const login = (token) => {
    setAuthToken(token);

    // Store token in localStorage or sessionStorage as well if needed
    localStorage.setItem('memberToken', token);
  };

  const logout = () => {
    setAuthToken(null);
    // Clear token from storage
    localStorage.clear('memberToken');
  };

  const isAuthenticated = () => {
    const token = authToken || localStorage.getItem('memberToken');
    return token !== null;
    // You might also want to check if the token is expired
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
