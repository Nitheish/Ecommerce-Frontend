// src/AppRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import ProductList from './components/Products/ProductList';
import Cart from './components/Cart/Cart';
import Home from './components/Home/home';
import Checkout from './components/Checkout';
import OrderSummary from './components/OrderSummary';
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation';
import OrderSuccess from './components/OrderSuccess/OrderSuccess';
import OrderDetails from './components/OrderDetails/OrderDetails';
import Layout from './components/Layout/Layout'; // Import Layout

const AppRouter = () => {
  return (
    <Routes>
      {/* Routes that don't require the header, like login and signup */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Wrap other routes with the Layout that includes the Header */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/home" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-details" element={<OrderDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
