import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import "./Cart.css";

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="cart-details">
              <h3>Product Name- {item.title}</h3>
              <p>Quantity- {item.quantity}</p>
              <p>Price- ${item.price.toFixed(2)}</p>
              <p>Subtotal- ${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
              >
                🗑️ Remove from cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
}
