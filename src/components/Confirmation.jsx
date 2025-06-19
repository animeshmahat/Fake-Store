import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Confirmation.css";

export default function Confirmation() {
  const location = useLocation();
  const { user, items, total } = location.state || {};

  if (!user || !items) {
    return (
      <div className="page">
        <p>Invalid order. Please return to the home page.</p>
        <Link to="/">
          <button className="home-btn">Home</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="confirmation">
      <h2>Thank You, {user.name}!</h2>
      <p>Your order has been placed successfully.</p>

      <div className="summary-box">
        <h3>Order Summary</h3>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.title} x {item.quantity} - $
              {(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <p>
          <strong>Grand Total:</strong> ${total.toFixed(2)}
        </p>
      </div>

      <Link to="/">
        <button className="home-btn">Home</button>
      </Link>
    </div>
  );
}
