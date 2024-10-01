// src/api.js
import axios from 'axios';

const API_URL =  'http://localhost:5000/api'; // Your backend API URL

// User Authentication API
// Function to sign up a new user
export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data;
};

// Function to log in a user
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  const { token } = response.data; 
  localStorage.setItem('token', token); 
 
};

// Function to log out a user
export const logout = () => {
  localStorage.removeItem('user');
};



// Function to fetch all products
export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

// Function to fetch a single product by ID
export const fetchProductById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }, // Include Bearer token in headers
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

// Function to add a new product (Admin only)
export const addProduct = async (productData, token) => {
  const response = await axios.post(`${API_URL}/products`, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Function to update an existing product (Admin only)
export const updateProduct = async (productId, productData, token) => {
  const response = await axios.put(`${API_URL}/products/${productId}`, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Function to delete a product (Admin only)
export const deleteProduct = async (productId, token) => {
  const response = await axios.delete(`${API_URL}/products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Cart Management API
// Function to add item to cart
export const addToCart = (item) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Function to get cart items
export const getCartItems = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

// Function to clear the cart
export const clearCart = () => {
  localStorage.removeItem('cart');
};

// Order Management API
// Function to place an order (Requires user to be logged in)
export const placeOrder = async (orderData, token) => {
  const response = await axios.post(`${API_URL}/orders`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Function to fetch user orders (Requires user to be logged in)


// Function to fetch a specific order by ID (Requires user to be logged in)
export const fetchOrderDetails = async (orderId, token) => {
  const response = await axios.get(`${API_URL}/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


// Function to fetch all orders (Admin only)
export const getOrderDetails = async (token) => {
  const response = await axios.get(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // Adjust according to your API response structure
};

// Function to fetch orders of a specific user
export const fetchUserOrders = async (token) => {
  const response = await axios.get(`${API_URL}/orders/myorders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Function to fetch users (Admin only)
export const fetchUsers = async (token) => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

