import React, { useState, useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function () {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple Validation
    if (!name || !email || !address) {
      setError("Please fill in all fields");
      return;
    }

    // Create user and cart snapshot
    const user = { name, email, address };
    const orderTotal = total;
    const cartSnapshot = [...cartItems];

    // Clear cart
    clearCart();

    // Navigate to confirmation
    navigate("/confirmation", {
      state: {
        user,
        items: cartSnapshot,
        total: orderTotal,
      },
    });
  };

  if (cartItems.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Your cart is empty.
      </p>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Shipping Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>

        {error && <p className="error">{error}</p>}

        <h3>Order Summary</h3>
        <ul className="order-summary">
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} x {item.quantity} - ${total.toFixed(2)}
            </li>
          ))}
        </ul>

        <p className="total">Total- ${total.toFixed(2)}</p>
        <button type="submit" className="place-order-btn">
          Place Order
        </button>
      </form>
    </div>
  );
}
