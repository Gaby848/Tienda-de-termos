import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (product, quantity) => {
    const exists = cart.find((p) => p.id === product.id);
    if (exists) {
      const updated = cart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
      );
      setCart(updated);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, prod) => acc + prod.quantity, 0);

  const totalPrice = cart.reduce(
    (acc, prod) => acc + prod.quantity * prod.price,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}
