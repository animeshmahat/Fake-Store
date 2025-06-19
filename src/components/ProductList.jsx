import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";
import { CartContext } from "../Context/CartContext";

export default function ProductList() {
  const [products, setProducts] = useState([]); // State to hold the list of products

  const [loading, setLoading] = useState(true); // State to track loading

  const [error, setError] = useState(null); // State to handle errors

  const { addToCart } = useContext(CartContext);

  // UseEffect to fetch data when the components mounts
  useEffect(() => {
    // Fetch products from the fakeStore API
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          // Handle HTTP errors
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data); // Store fetched products
        setLoading(false); // Turn off loading
      })
      .catch((err) => {
        setError(err.message); // Set error message
        setLoading(true); // Turn off loading
      });
  }, []); // Empty dependency array means this runs once after first render

  // Show loading state
  if (loading) {
    return <h2 style={{ color: "#000" }}>Loading Products...</h2>;
  }

  // Show error message if there is an error
  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div className="product-grid">
      {/* Map each product and render a card */}
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          {/* Display product image */}
          <img
            src={product.image || "/default-image.png"}
            alt={product.title}
          />{" "}
          <hr style={{ color: "#444" }} />
          {/* Display product title */}
          <h3>{product.title}</h3>
          {/* Display product price */}
          <p>${product.price.toFixed(2)}</p>
          {/* View Details Button */}
          <Link to={`/product/${product.id}`}>
            <button className="view-btn">View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
