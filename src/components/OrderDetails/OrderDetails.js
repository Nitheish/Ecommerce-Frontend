import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const OrderDetails = () => {
  const { user } = useAuth(); // Get logged-in user from context
  const [orders, setOrders] = useState([]); // Initialize orders as an empty array
  const [error, setError] = useState(null);
  const [productDetails, setProductDetails] = useState({}); // Store product details

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

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (orders.length > 0) {
        const productIds = orders.flatMap(order => 
          order.products.map(item => item?.product?._id) // Ensure this returns just product IDs
        ).filter(id => id); // Filter to remove any null or undefined values
  
        if (productIds.length > 0) {
          const uniqueProductIds = [...new Set(productIds)]; // Ensure these are unique IDs
  
          // Debug log to check the values being passed
          console.log('Unique Product IDs:', uniqueProductIds);
  
          const productPromises = uniqueProductIds.map(id => {
            return axios.get(`http://localhost:5000/api/products/${id}`); // Ensure id is the string ID
          });
  
          try {
            const productResponses = await Promise.all(productPromises);
            const details = productResponses.reduce((acc, product) => {
              acc[product.data._id] = product.data; // Store product details by ID
              return acc;
            }, {});
            setProductDetails(details); // Store all product details
          } catch (error) {
            console.error('Error fetching product details:', error);
            setError('Failed to fetch product details.');
          }
        }
      }
    };
  
    fetchProductDetails(); // Fetch product details when orders change
  }, [orders]);
  
  

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
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Total Amount: ${order.totalPrice}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Items:</Typography>
                    {Array.isArray(order.products) && order.products.length > 0 ? (
                      order.products.map((item, index) => {
                        const product = productDetails[item._id]; // Correctly reference product by _id
                        return (
                          <Box key={index} sx={{ mt: 1 }}>
                            <Typography variant="body2">
                              {product ? product.name : 'Product not found'} - {item.quantity} pcs - ${product ? product.sellingPrice : 'N/A'}
                            </Typography>
                          </Box>
                        );
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
