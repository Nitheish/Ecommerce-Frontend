// src/components/Header/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Import the useCart hook

const Header = () => {
  const { cartItems } = useCart(); // Use the cart context

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My E-Commerce Site
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/home">Home</Button>
          <Button color="inherit" component={Link} to="/product">Products</Button>
          <Button color="inherit" component={Link} to="/cart">
            Cart ({cartItems.length}) {/* Display cart count */}
          </Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/checkout">Checkout</Button> {/* Checkout Button */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
