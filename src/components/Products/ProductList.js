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
  Box,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Get addToCart from CartContext
  const [quantities, setQuantities] = useState({}); // Track quantities for each product

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

  const handleAddToCart = (product, quantity) => {
    // Add product to cart with selected quantity
    addToCart({ ...product, quantity });
  };

  const handleQuantityChange = (productId, increment) => {
    setQuantities((prev) => {
      const newQuantity = Math.max((prev[productId] || 1) + increment, 1);
      return { ...prev, [productId]: newQuantity };
    });
  };

  return (
    <Container sx={{ mt: 4 }}>
      {error && <Typography variant="h6" color="error">{error}</Typography>}
      <Grid container spacing={4} sx={{ mt: 3 }}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card sx={{ margin: '16px', borderRadius: '16px', boxShadow: 3 }}>
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
                  
                  {/* Quantity Controls */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleQuantityChange(product._id, -1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ mx: 2 }}>
                      {quantities[product._id] || 1}
                    </Typography>
                    <IconButton
                      color="primary"
                      onClick={() => handleQuantityChange(product._id, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>

                  {/* Total Amount based on Quantity */}
                  <Typography variant="body2" color="text.primary" sx={{ mt: 2 }}>
                    <strong>Total:</strong> ${(quantities[product._id] || 1) * product.sellingPrice}
                  </Typography>

                  {/* Action Buttons */}
                  <Grid container spacing={1} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                      <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={() => handleAddToCart(product, quantities[product._id] || 1)}
                      >
                        Add to Cart <ShoppingCartIcon sx={{ ml: 1 }} />
                      </Button>
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
  );
};

export default ProductList;
