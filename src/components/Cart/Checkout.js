import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });
  const [error, setError] = useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (Object.values(shippingAddress).some((field) => !field)) {
      setError('Please fill in all shipping details.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/checkout`, {
        cartItems,
        shippingAddress,
      });

      console.log('Order placed successfully:', response.data);
      alert('Order placed successfully!');
      // Clear cart after successful checkout
      setCartItems([]);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error during checkout:', error);
      setError('Failed to place the order. Please try again.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart before checking out.</p>
      ) : (
        <div>
          <h3>Your Cart Items</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                <h4>{item.name}</h4>
                <p>Price: ${item.sellingPrice}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
          <h3>Total Price: ${totalPrice}</h3>

          <h3>Shipping Address</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleCheckout}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={shippingAddress.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shippingAddress.address}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingAddress.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={shippingAddress.zipCode}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shippingAddress.country}
              onChange={handleChange}
              required
            />
            <button type="submit">Place Order</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;
