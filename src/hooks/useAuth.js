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

  const handleLogin = async (email, password) => {
    try {
      const res = await login(email, password);
      setUser(res.user);  // Set the user data
      localStorage.setItem('token', res.token);  // Store the token in localStorage
      localStorage.setItem('user', JSON.stringify(res.user));
    } catch (err) {
      throw new Error('Login failed');
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
    localStorage.removeItem('token');  // Remove the token from localStorage
  };

  const fetchOrders = async () => {
    if (!user) return [];
    try {
      const orders = await fetchUserOrders(); // Token automatically attached
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
