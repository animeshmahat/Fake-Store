import React, { useState, createContext } from "react";

// Create the context
export const CartContext = createContext();

// Create the provider context
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add product to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  // Remove item
  const removeFromCart = (product) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id != id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
