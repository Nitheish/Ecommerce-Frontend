import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter';
import { AuthProvider } from './context/AuthContext'; // Ensure you have this import for Auth context
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRouter />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
