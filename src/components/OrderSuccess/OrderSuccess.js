// src/components/OrderSuccess/OrderSuccess.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../Header/header';

const OrderSuccess = () => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Order Placed Successfully!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Thank you for your order. You will receive a confirmation email shortly.
        </Typography>

        <Box sx={{ mt: 4 }}>
          {/* Continue Shopping Button */}
          <Button 
            component={Link} 
            to="/product" 
            variant="contained" 
            sx={{ mr: 2 }}
          >
            Continue Shopping
          </Button>

          {/* View Order Button */}
          <Button 
            component={Link} 
            to="/order-details"  // Update the link to your order details or history page
            variant="outlined"
          >
            View Order
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default OrderSuccess;
