// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { login, signup, logout, fetchUserOrders } from '../api'; // Adjust the path according to your structure

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const data = await login(credentials);
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (userData) => {
    setLoading(true);
    try {
      const data = await signup(userData);
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const fetchOrders = async () => {
    if (!user) return [];
    try {
      const orders = await fetchUserOrders(user.token);
      return orders;
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      return [];
    }
  };

  return {
    user,
    loading,
    error,
    handleLogin,
    handleSignup,
    handleLogout,
    fetchOrders,
  };
};

export default useAuth;
