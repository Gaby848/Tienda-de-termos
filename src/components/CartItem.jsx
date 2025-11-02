import React from "react";
import { useCart } from "../context/CartContext";

function CartItem({ product }) {
  const { removeItem } = useCart();

  return (
    <div className="cart-item">
      <img src={product.image} alt={product.title} />
      <div>
        <h4>{product.title}</h4>
        <p>Cantidad: {product.quantity}</p>
        <p>Subtotal: ${product.quantity * product.price}</p>
        <button onClick={() => removeItem(product.id)}>Eliminar</button>
      </div>
    </div>
  );
}

export default CartItem;
