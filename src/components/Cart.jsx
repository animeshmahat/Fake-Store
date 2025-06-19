import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import "./Cart.css";

export default function Cart() {
  const { cartItems } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "2rem", color: "black" }}>
        🛒 Your Cart is Empty!!!
      </h1>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>

      <div className="cart-list">
        {cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.image} alt={item.title} />
            <div className="cart-details">
              <h3>Product Name- {item.title}</h3>
              <p>Price- ${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
