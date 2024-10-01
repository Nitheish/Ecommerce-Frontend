// src/components/Header/Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Import the useCart hook
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook (for authentication context)

const Header = () => {
  const { cartItems } = useCart(); // Use the cart context
  const { user, logout } = useAuth(); // Use the auth context to get user info and logout
  const navigate = useNavigate();

  // State to manage the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  // Functions to handle menu actions
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout(); // Call the logout function from auth context
    handleMenuClose(); // Close the menu after logout
    navigate('/login'); // Redirect to login page after logout
  };

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
          
          {/* Display user profile menu if user is logged in */}
          {user ? (
            <>
              <Button
                color="inherit"
                onClick={handleProfileMenuOpen} // Open menu on click
              >
                {user.name} {/* Display user's name */}
              </Button>
              <Menu
                anchorEl={anchorEl} // Reference to the button that opens the menu
                open={isMenuOpen} // Control the open state of the menu
                onClose={handleMenuClose} // Close menu on outside click or selection
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* Logout option */}
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
