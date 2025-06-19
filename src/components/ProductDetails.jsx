import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetails.css";
import { CartContext } from "../Context/CartContext";

export default function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // Use Cart Context
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]); // Re-fetch if ID changes

  if (loading)
    return <h2 style={{ color: "#000" }}>Loading product details...</h2>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} />

      <div className="info">
        <h2>{product.title}</h2>
        <p className="category">Category: {product.category}</p>
        <p className="price">Price: {product.price.toFixed(2)}</p>
        <p className="desc">{product.description}</p>
        <p className="rating">
          ⭐ {product.rating.rate} / 5({product.rating.count}) reviews
        </p>
        {/* Add to cart button */}
        <button onClick={() => addToCart(product)} className="back-btn">
          🛒 Add to Cart
        </button>{" "}
        <br />
        <Link to="/">
          <button className="back-btn">🔙 Back to Products</button>
        </Link>
      </div>
    </div>
  );
}
