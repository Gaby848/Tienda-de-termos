import React, { useState } from "react";
import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext";

function ItemDetail({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (quantity) => {
    addItem(product, quantity);
    setAdded(true);
  };

  return (
    <div className="item-detail">
      <img src={product.image} alt={product.title} />
      <div className="item-detail-info">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p><strong>${product.price}</strong></p>

        {added ? (
          <p>✅ Producto agregado al carrito</p>
        ) : (
          <ItemCount stock={product.stock} initial={1} onAdd={handleAdd} />
        )}
      </div>
    </div>
  );
}

export default ItemDetail;
