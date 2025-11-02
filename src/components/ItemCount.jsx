import React, { useState } from "react";

function ItemCount({ stock, initial, onAdd }) {
  const [count, setCount] = useState(initial);

  const increment = () => {
    if (count < stock) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div className="item-count">
      <div>
        <button onClick={decrement}>-</button>
        <span>{count}</span>
        <button onClick={increment}>+</button>
      </div>
      <button onClick={() => onAdd(count)} disabled={stock === 0}>
        {stock > 0 ? "Agregar al carrito" : "Sin stock"}
      </button>
    </div>
  );
}

export default ItemCount;
