import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";
import { CartContext } from "../Context/CartContext";
import Spinner from "./Spinner";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]); // State to hold the list of products

  // Raw Data
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCatgories] = useState([]);

  const [loading, setLoading] = useState(true); // State to track loading

  const [error, setError] = useState(null); // State to handle errors

  // Search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // UseEffect to fetch data when the components mounts
  useEffect(() => {
    // Fetch products from the fakeStore API
    async function fetchData() {
      try {
        const productRes = await fetch("https://fakestoreapi.com/products");
        const categoryRes = await fetch(
          "https://fakestoreapi.com/products/categories"
        );

        if (!productRes.ok || !categoryRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const productData = await productRes.json();
        const categoryData = await categoryRes.json();

        setProducts(productData);
        setAllProducts(productData); // For Filtering
        setCatgories(categoryData);
        setLoading(false);
      } catch (err) {
        setError(err.message); // Set error message
        setLoading(true); // Turn off loading
      }
    }
    fetchData();
  }, []); // Empty dependency array means this runs once after first render

  // Handle filter logic
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Show loading state
  if (loading) {
    return <Spinner />;
  }

  // Show error message if there is an error
  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div>
      {/* Filter UI */}

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {/* Map each product and render a card */}
        {filteredProducts.length === 0 ? (
          <p style={{ color: "red" }}>No products match your search.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        )}
      </div>
    </div>
  );
}
