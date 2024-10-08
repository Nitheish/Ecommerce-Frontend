import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../utils/api'; // Make sure to import your API call
import { Container, Typography, Grid, Card, CardContent, Button, CardMedia, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/header'; // Adjust the import according to your structure

const Checkout = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('Cash'); // State for payment method

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);

  // Handle placing the order
  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('token'); // Get token from local storage
    const orderData = {
      products: cartItems.map(item => ({
        productId: item._id,
        name: item.name,  // Include product name
        quantity: item.quantity,
        sellingPrice: item.sellingPrice,
        uom: item.uom,
        image: item.image, // Include product image
      })),
      totalPrice,
      paymentMethod, // Pass the selected payment method
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
                    <CardMedia
                      component="img"
                      alt={product.name}
                      height="140"
                      image={product.image} // Set the product image URL here
                    />
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

            <FormControl fullWidth sx={{ mt: 3, width: '150px' }}> {/* Set a fixed width for the select box */}
              <InputLabel id="payment-method-label">Payment Method</InputLabel>
              <Select
                labelId="payment-method-label"
                id="payment-method"
                value={paymentMethod}
                label="Payment Method"
                onChange={(e) => setPaymentMethod(e.target.value)} // Update the state when the user selects a payment method
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Gpay">Gpay</MenuItem>
              </Select>
            </FormControl>

            {/* Add margin-top to push the button further down */}
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handlePlaceOrder} 
              sx={{ mt: 5 }} // Increased margin-top for spacing
            >
              Place Order
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default Checkout;
