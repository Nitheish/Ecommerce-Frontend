// src/components/Checkout/OrderSummary.js
import React from 'react';
import { useCart } from '../context/CartContext';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const OrderSummary = () => {
  const { cart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.sellingPrice * product.quantity, 0).toFixed(2);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order Summary
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No items in your order.
        </Typography>
      ) : (
        <>
          <Grid container spacing={4}>
            {cart.map((product) => (
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" sx={{ mt: 4 }}>
            Total: ${calculateTotal()}
          </Typography>
        </>
      )}
    </Container>
  );
};

export default OrderSummary;
