import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

export default function App() {
  return (
    <div className="app-container">
      <Header />

      {/* Defining application routes */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
      </main>
    </div>
  );
}
