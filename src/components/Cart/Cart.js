import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart items from LocalStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.sellingPrice * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cartItems.map(item =>
      item._id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleCheckout = async () => {
    // Perform checkout logic (like API call to place an order)
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/checkout`, { cartItems });
      console.log('Checkout successful:', response.data);
      // Clear cart after successful checkout
      setCartItems([]);
      localStorage.removeItem('cart');
      alert('Checkout successful!');
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item._id} className="cart-item">
                <h3>{item.name}</h3>
                <img src={item.image} alt={item.name} />
                <p>Price: ${item.sellingPrice}</p>
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                  />
                </label>
                <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total Price: ${totalPrice}</h3>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
