import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartWidget() {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="cart-widget">
      🛒 <span>{totalItems > 0 ? totalItems : ""}</span>
    </Link>
  );
}

export default CartWidget;
