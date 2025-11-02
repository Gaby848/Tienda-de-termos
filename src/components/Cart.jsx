import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

function Cart() {
  const { cart, clearCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío 🛒</h2>
        <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cart.map((prod) => (
        <CartItem key={prod.id} product={prod} />
      ))}
      <h3>Total: ${totalPrice}</h3>
      <button onClick={clearCart}>Vaciar carrito</button>
      <Link to="/checkout" className="btn">Finalizar compra</Link>
    </div>
  );
}

export default Cart;
