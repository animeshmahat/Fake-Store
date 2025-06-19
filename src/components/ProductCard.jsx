// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />

      <h3>{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>

      <Link to={`/product/${product.id}`}>
        <button className="view-btn">👁️ View Details</button>
      </Link>
    </div>
  );
}

export default ProductCard;
