import React from "react";
import { Link } from "react-router-dom";
import placeholder from "../assets/placeholder.png";
import { useCart } from "../context/CartContext";

function Item({ product }) {
  const { addItem } = useCart();
  const img = product.image || placeholder;
  const title = product.title || "Producto";
  const price = Number(product.price) || 0;
  const inStock = (Number(product.stock) || 0) > 0;

  const handleAdd = () => {
    addItem(product, 1);
  };

  return (
    <div className="item-card">
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <p>${price}</p>
      <div style={{ display: "flex", gap: 8 }}>
        <Link to={`/item/${product.id}`} className="btn">
          Ver detalle
        </Link>
        <button className="btn" onClick={handleAdd} disabled={!inStock}>
          {inStock ? "Agregar" : "Sin stock"}
        </button>
      </div>
    </div>
  );
}

export default Item;