import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, CardMedia, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const OrderDetails = () => {
  const { user } = useAuth(); // Get logged-in user from context
  const [orders, setOrders] = useState([]); // Initialize orders as an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('http://localhost:5000/api/orders', config);
        setOrders(response.data || []); // Ensure response data is always an array
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders.');
      }
    };

    if (user) {
      fetchOrders(); // Fetch orders only if user is logged in
    }
  }, [user]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {orders.length === 0 ? (
        <Typography variant="h6">You have no orders.</Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} key={order._id}>
              <Card sx={{ borderRadius: '16px', boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">Order ID: {order._id}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">Status: {order.isPaid ? 'Paid' : 'Pending'}</Typography>
                  <Typography variant="body2">Payment Method: {order.paymentMethod}</Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Total Amount: ${order.totalPrice}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Items:</Typography>
                    {Array.isArray(order.products) && order.products.length > 0 ? (
                      order.products.map((item, index) => {
                        // Check if product exists before trying to access its properties
                        if (item.product) {
                          return (
                            <Card key={index} sx={{ display: 'flex', mt: 2 }}>
                              <CardMedia
                                component="img"
                                sx={{ width: 150, height: 150 }}
                                image={item.product.image}
                                alt={item.product.name}
                              />
                              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent>
                                  <Typography variant="h6">{item.product.name}</Typography>
                                  <Typography variant="body2" color="textSecondary">
                                    {item.product.description}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Price:</strong> ${item.product.sellingPrice}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Quantity:</strong> {item.quantity}
                                  </Typography>
                                </CardContent>
                              </Box>
                            </Card>
                          );
                        } else {
                          // If no product data is available, render a fallback
                          return (
                            <Typography key={index} variant="body2" color="textSecondary">
                              Product information not available.
                            </Typography>
                          );
                        }
                      })
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No items in this order.
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default OrderDetails;
