import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import "./Cart.css";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="center-page">
        <h1>🛒 Your Cart is Empty!!!</h1>
      </div>
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

              {/* Quantity Controls */}
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  disabled={item.quantity === 1}
                >
                  - Reduce Quantity
                </button>
              </div>
              <p>Subtotal- ${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to remove this item from the cart?"
                    )
                  ) {
                    removeFromCart(item.id);
                  }
                }}
                className="remove-btn"
              >
                🗑️ Remove from cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      <Link to="/checkout">
        <button className="place-order-btn">Go to Checkout</button>
      </Link>
    </div>
  );
}
