// src/components/Home/Home.js
import React from 'react';
import Header from '../Header/header';
import ProductList from '../Products/ProductList';
import { Box, Typography, Container } from '@mui/material';

const Home = () => {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(https://namtech.com.au/wp-content/uploads/2019/12/E-Commerce011.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '670px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'black',
        }}
      >
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold' }}>
          Welcome to Our E-Commerce Store
        </Typography>
      </Box>
      
      {/* Product List */}
      {/* <Container sx={{ mt: 4 }}>
        <ProductList />
      </Container> */}
    </>
  );
};

export default Home;
