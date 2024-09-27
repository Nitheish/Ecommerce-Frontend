// src/components/Products/ProductFilter.js
import React from 'react';

const ProductFilter = ({ setFilter }) => {
  return (
    <input
      type="text"
      placeholder="Search products..."
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};

export default ProductFilter;
