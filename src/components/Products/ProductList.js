// src/components/Products/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useCart } from '../../context/CartContext';
import Header from '../Header/header';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Get addToCart from CartContext

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('http://localhost:5000/api/products', config);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products.');
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // Use addToCart from context
  };

  return (
    <>
      <Header />
   
    <Container sx={{ mt: 4 }}>
      {error && <Typography variant="h6" color="error">{error}</Typography>}
      <Grid container spacing={4} sx={{ mt: 3 }}>
        {products.length > 0 ? (
          products.map((product) => (
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
                    {product.description}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    <strong>Original Price:</strong> ${product.originalPrice}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Selling Price:</strong> ${product.sellingPrice}
                  </Typography>
                  
                  {/* Action Buttons */}
                  <Grid container spacing={1} sx={{ mt: 2 }}>
                    <Grid item xs={4}>
                      <IconButton color="primary" onClick={() => handleAddToCart(product)} fullWidth>
                        <ShoppingCartIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No products found</Typography>
        )}
      </Grid>
    </Container>
    </>
  );
};

export default ProductList;
