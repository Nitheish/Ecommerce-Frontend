// src/components/OrderDetails/OrderDetails.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/header';
import { getOrderDetails, fetchProductById } from '../../utils/api'; // Import your API calls

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]); // State to hold product details
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const orderData = await getOrderDetails(token); // Call your API to get order details
        setOrder(orderData[0]); // Assuming the API returns an array and we want the first order
        
        // Fetch product details for each product ID
        const productDetailsPromises = orderData[0].products.map(product =>
          fetchProductById(product._id) // Use fetchProductById instead
        );
        const fetchedProducts = await Promise.all(productDetailsPromises);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching order details:', error);
        // Handle error (e.g., redirect to an error page or show a message)
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Order Details
        </Typography>
        {order ? (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Order ID: {order.orderUUID}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Payment Method: {order.paymentMethod}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Products:
                  </Typography>
                  {products.map((product, index) => (
                    <Typography key={product._id} variant="body1">
                      {product.name} - ${product.sellingPrice} x {order.products[index].quantity}
                    </Typography>
                  ))}
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Total Price: ${order.totalPrice.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Order Date: {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1">Loading order details...</Typography>
        )}
        <Button variant="contained" onClick={() => navigate('/home')} sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Container>
    </>
  );
};

export default OrderDetails;
