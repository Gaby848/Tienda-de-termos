import React, { useEffect, useState } from "react";
import ItemList from "../components/ItemList";
import { getProducts, getProductsByCategory } from "../services/firestoreService";
import { useParams } from "react-router-dom";

function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (categoryId) {
        const data = await getProductsByCategory(categoryId);
        setProducts(data);
      } else {
        const data = await getProducts();
        setProducts(data);
      }
    };
    fetchData();
  }, [categoryId]);

  return (
    <div className="item-list-container">
      <h1>{categoryId ? `Termos de ${categoryId}` : "Catálogo de Termos"}</h1>
      <ItemList products={products} />
    </div>
  );
}

export default ItemListContainer;
