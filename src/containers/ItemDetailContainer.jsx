import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../components/ItemDetail";
import { getProductById } from "../services/firestoreService";

function ItemDetailContainer() {
  const [product, setProduct] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (e) {
        console.error("Error cargando producto:", e);
        setProduct(null);
      }
    };
    fetchProduct();
  }, [id]);

  if (product === undefined) {
    return <p>Cargando producto...</p>;
  }

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div className="item-detail-container">
      <ItemDetail product={product} />
    </div>
  );
}

export default ItemDetailContainer;