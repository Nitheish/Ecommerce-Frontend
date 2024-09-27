// src/components/Products/ProductItem.js
import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.sellingPrice}</p>
      <p>HSN Code: {product.hsnCode}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
