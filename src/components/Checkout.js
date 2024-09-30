// src/components/OrderConfirmation/OrderConfirmation.js
import React from 'react';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../utils/api'; // Make sure to import your API call
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/header'; // Adjust the import according to your structure

const OrderConfirmation = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('token'); // Get token from local storage
    const orderData = {
      products: cartItems,
      totalPrice,
    };

    try {
      const response = await placeOrder(orderData, token); // Call the API to place the order
      console.log('Order placed successfully:', response);
      // Redirect to a confirmation page or show success message
      navigate('/order-success'); // Change this to your success route
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Order Confirmation
        </Typography>
        {cartItems.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            Your cart is empty.
          </Typography>
        ) : (
          <>
            <Grid container spacing={4}>
              {cartItems.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Price:</strong> ${product.sellingPrice}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Quantity:</strong> {product.quantity} {product.uom}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Typography variant="h5" sx={{ mt: 3 }}>
              Total Price: ${totalPrice.toFixed(2)}
            </Typography>
            <Button variant="contained" color="primary" onClick={handlePlaceOrder} sx={{ mt: 2 }}>
              Place Order
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default OrderConfirmation;
