// src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item._id === product._id);
    if (existingProduct) {
      setCartItems(cartItems.map(item =>
        item._id === product._id ? { ...existingProduct, quantity: existingProduct.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
