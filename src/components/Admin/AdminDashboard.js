// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api';
import { useAuth } from '../context/useAuth';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      if (user) {
        const userData = await fetchUsers(user);
        setUsers(userData);
      }
    };
    getUsers();
  }, [user]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u._id}>
              <strong>Name:</strong> {u.name}, <strong>Email:</strong> {u.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
