// src/components/Cart/Cart.js
import React from 'react';
import { useCart } from '../../context/CartContext';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import Header from '../Header/header';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  // Calculate total price of items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, product) => total + product.sellingPrice * product.quantity, 0).toFixed(2);
  };

  return (
    <>
      
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
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
                      height="200"
                      image={product.image}
                      alt={product.name}
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
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => removeFromCart(product._id)}
                        sx={{ mt: 2 }}
                      >
                        Remove from Cart
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Typography variant="h5" sx={{ mt: 4 }}>
              Total Price: ${calculateTotalPrice()}
            </Typography>
          </>
        )}
      </Container>
    </>
  );
};

export default Cart;
