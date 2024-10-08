// import React from 'react';
// import { useCart } from '../../context/CartContext';
// import { placeOrder } from '../../utils/api'; 
// import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const OrderConfirmation = () => {
//     const { cartItems } = useCart();
//     const navigate = useNavigate();

//     // Calculate total price
//     const totalPrice = cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);

//     const handlePlaceOrder = async () => {
//         const token = localStorage.getItem('token'); // Get token from local storage
//         const orderData = {
//             products: cartItems.map(item => ({
//                 product: item._id, // Use product ID for reference
//                 quantity: item.quantity,
//                 name: item.name, // Include product name
//                 sellingPrice: item.sellingPrice // Include product price if needed
//             })),
//             totalPrice,
//         };

//         try {
//             const response = await placeOrder(orderData, token); // Call the API to place the order
//             console.log('Order placed successfully:', response);
//             // Redirect to a confirmation page or show success message
//             navigate('/order-success'); // Change this to your success route
//         } catch (error) {
//             console.error('Error placing order:', error);
//             // Handle error (e.g., show an error message)
//         }
//     };

//     return (
//         <Container sx={{ mt: 4 }}>
//             <Typography variant="h4" gutterBottom>
//                 Order Confirmation
//             </Typography>
//             {cartItems.length === 0 ? (
//                 <Typography variant="h6" color="text.secondary">
//                     Your cart is empty.
//                 </Typography>
//             ) : (
//                 <>
//                     <Grid container spacing={4}>
//                         {cartItems.map((product) => (
//                             <Grid item xs={12} sm={6} md={4} key={product._id}>
//                                 <Card>
//                                     <CardContent>
//                                         <Typography variant="h6" gutterBottom>
//                                             {product.name}
//                                         </Typography>
//                                         <Typography variant="body2" color="text.secondary">
//                                             <strong>Price:</strong> ${product.sellingPrice}
//                                         </Typography>
//                                         <Typography variant="body2" color="text.secondary">
//                                             <strong>Quantity:</strong> {product.quantity} {product.uom}
//                                         </Typography>
//                                         <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} /> {/* Display product image */}
//                                     </CardContent>
//                                 </Card>
//                             </Grid>
//                         ))}
//                     </Grid>
//                     <Typography variant="h5" sx={{ mt: 3 }}>
//                         Total Price: ${totalPrice.toFixed(2)}
//                     </Typography>
//                     <Button variant="contained" color="primary" onClick={handlePlaceOrder} sx={{ mt: 2 }}>
//                         Place Order
//                     </Button>
//                 </>
//             )}
//         </Container>
//     );
// };

// export default OrderConfirmation;
