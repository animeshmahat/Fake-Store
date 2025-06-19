import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import "./Header.css";

export default function Header() {
  const { cartItems } = useContext(CartContext);

  return (
    <header className="header">
      <Link to="/" className="logo">
        FakeStore
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartItems.length})</Link>
      </nav>
    </header>
  );
}
