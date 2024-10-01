// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to provide authentication context
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On component mount, check for a stored user in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user from localStorage
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // Send the login request to the server
      const { data } = await axios.post(`http://localhost:5000/api/auth/login`, { email, password });

      // Update user state and store token & user in localStorage
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return data;  // Return the data to be handled by the calling component
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error(error.response?.data?.message || 'Login failed'); // Throw the error to be caught in the component
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      // Send the signup request to the server
      const { data } = await axios.post(`http://localhost:5000/api/auth/signup`, { name, email, password });

      // Update user state and store token & user in localStorage
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return data;  // Return the data to be handled by the calling component
    } catch (error) {
      console.error('Error during signup:', error);
      throw new Error(error.response?.data?.message || 'Signup failed'); // Throw the error to be caught in the component
    }
  };

  // Logout function
  const logout = () => {
    // Clear user state and remove token & user from localStorage
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider'); // Ensure useAuth is called within a provider
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth }; // Export both AuthContext and useAuth
