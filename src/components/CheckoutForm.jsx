import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/firestoreService";

function CheckoutForm() {
  const { cart, totalPrice, clearCart } = useCart();
  const [buyer, setBuyer] = useState({ nombre: "", email: "", telefono: "" });
  const [orderId, setOrderId] = useState("");

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      buyer,
      items: cart,
      total: totalPrice,
      date: new Date(),
    };
    const id = await createOrder(order);
    setOrderId(id);
    clearCart();
  };

  if (orderId) {
    return (
      <div className="checkout-success">
        <h2>✅ ¡Gracias por tu compra!</h2>
        <p>ID de orden: <strong>{orderId}</strong></p>
      </div>
    );
  }

  return (
    <div className="checkout-form">
      <h2>Finalizar compra</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={buyer.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={buyer.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={buyer.telefono}
          onChange={handleChange}
          required
        />
        <button type="submit">Confirmar compra</button>
      </form>
    </div>
  );
}

export default CheckoutForm;
