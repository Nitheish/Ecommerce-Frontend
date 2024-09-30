// src/components/OrderSuccess/OrderSuccess.js
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../Header/header';

const OrderSuccess = () => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Order Placed Successfully!
        </Typography>
        <Typography variant="h6">
          Thank you for your order. You will receive a confirmation email shortly.
        </Typography>
        <Button component={Link} to="/product" variant="contained" sx={{ mt: 2 }}>
          Continue Shopping
        </Button>
      </Container>
    </>
  );
};

export default OrderSuccess;
