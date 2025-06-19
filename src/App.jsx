import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Header from "./components/Header";
import Cart from "./components/Cart";

export default function App() {
  return (
    <div className="app">
      <Header />

      {/* Defining application routes */}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}
