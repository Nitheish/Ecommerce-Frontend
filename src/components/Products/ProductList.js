import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        console.log('Fetched products:', response); // Log the response
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/products/search?keyword=${search}`);
      console.log('Search results:', response.data); // Log the search results
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />
        <button type="submit">Search</button>
      </form>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className="product-card">
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.name} />
              <p>{product.description}</p>
              <p>Original Price: ${product.originalPrice}</p>
              <p>Discount Price: ${product.discountPrice}</p>
              <p>Selling Price: ${product.sellingPrice}</p>
              <p>Quantity: {product.quantity} {product.uom}</p>
              <p>HSN Code: {product.hsnCode}</p>
              <p>Created At: {new Date(product.createdAt).toLocaleDateString()}</p>
              <p>Updated At: {new Date(product.updatedAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
