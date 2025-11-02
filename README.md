README — Tienda de Termos (React + Vite + Firebase)
Descripción
App de catálogo y carrito para una tienda de termos. Usa React con Vite, React Router, Context para el carrito y Firebase Firestore para productos y órdenes.

Requisitos
Node 18+
Una cuenta de Firebase con un proyecto y Firestore habilitado
Instalación y ejecución
Clonar el repo y entrar a la carpeta del proyecto Vite:
cd tienda-de-termos
npm install
Crear .env.local en la raíz del proyecto:
VITE_FIREBASE_API_KEY=TU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=TU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=TU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=TU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=TU_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=TU_APP_ID
Ejecutar en desarrollo:
npm run dev
Build y preview:
npm run build
npm run preview
Estructura del proyecto
tienda-de-termos/
  index.html
  package.json
  vite.config.js
  .env.local (no se commitea)
  src/
    main.jsx
    App.jsx
    index.css
    assets/
      placeholder.png
    components/
      NavBar.jsx
      CartWidget.jsx
      ItemList.jsx
      Item.jsx
      ItemDetail.jsx
      ItemCount.jsx
      Cart.jsx
      CartItem.jsx
      CheckoutForm.jsx
    containers/
      ItemListContainer.jsx
      ItemDetailContainer.jsx
    context/
      CartContext.jsx
    services/
      firestoreService.js
Firebase / Firestore
Habilitar Firestore en el proyecto indicado por VITE_FIREBASE_PROJECT_ID.
Reglas recomendadas para desarrollo:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document} { allow read: if true; }
    match /orders/{document} { allow create: if true; }
    match /{document=**} { allow read, write: if false; }
  }
}
Endurecer para producción según tus requisitos (auth, claims, etc.).
Esquema de datos
Colección products (documentos):
title (string) | nombre
price (number) | precio
image (string URL pública) | imagen
description (string) | descripcion
stock (number)
category (string: “acero” | “plastico” | “vidrio”) | categoria
Colección orders (documentos, generados en checkout):
buyer: { nombre, email, telefono }
items: [ { id, title, price, quantity, … } ]
total: number
date: Timestamp (o createdAt: serverTimestamp())
Nota: el servicio normaliza campos en español/inglés para que el UI funcione aunque cambie el nombre (title/nombre, image/imagen, etc.).

Seed de ejemplo (opcional)
Usa este snippet una vez para crear productos de ejemplo:

javascript
import { addDoc, collection } from "firebase/firestore";
import { db } from "./src/services/firestoreService";

async function seed() {
  const products = [
    {
      title: "Termo de acero 1L",
      price: 19999,
      image: "https://picsum.photos/seed/termo1/400/300",
      description: "Termo de acero inoxidable 1L",
      stock: 10,
      category: "acero",
    },
    {
      title: "Termo plástico 750ml",
      price: 8999,
      image: "https://picsum.photos/seed/termo2/400/300",
      description: "Termo plástico 750ml",
      stock: 15,
      category: "plastico",
    },
    {
      title: "Termo de vidrio 1L",
      price: 12999,
      image: "https://picsum.photos/seed/termo3/400/300",
      description: "Termo de vidrio 1L",
      stock: 8,
      category: "vidrio",
    },
  ];
  for (const p of products) await addDoc(collection(db, "products"), p);
  console.log("Seed listo");
}
seed();
Componentes principales
App: define rutas con React Router.
NavBar: navegación a inicio, categorías, carrito.
CartWidget: muestra total de unidades del carrito.
ItemListContainer: obtiene productos (o por categoría) y renderiza lista.
ItemList: presenta grilla de 
Item
.
Item: tarjeta con imagen, título, precio, link a detalle y botón “Agregar”.
ItemDetailContainer: obtiene un producto por id.
ItemDetail: muestra imagen, descripción, precio y 
ItemCount
 para agregar.
ItemCount: permite seleccionar cantidad (min 1, max stock).
Cart: muestra productos del carrito, subtotales y total, vaciado y link a checkout.
CartItem: ítem de carrito con eliminar.
CheckoutForm: formulario que crea una orden en Firestore y muestra orderId.
CartContext: estado global del carrito (add/remove/clear, totales).
Servicios
firestoreService.js
:
db (Firestore inicializado con VITE_*).
getProducts()
getProductsByCategory(categoryId)
getProductById(id)
createOrder(order)
 → devuelve orderId
Normaliza nombres de campos (title/nombre, price/precio, image/imagen, description/descripcion, category/categoria).
Asegúrate de que 
createOrder
 tenga esta firma:

javascript
export async function createOrder(order) {
  const ref = await addDoc(collection(db, "orders"), {
    ...order,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}
Scripts NPM
dev: vite
build: vite build
preview: vite preview
lint: eslint . (si lo usas)
Checklist de consignas
 Conexión a Firebase + Firestore
 Listado dinámico y vista de detalle (ItemListContainer / ItemDetailContainer)
 Separación contenedor/presentación (ItemListContainer / ItemList)
 ItemCount con validaciones (mínimo, límite por stock)
 Navegación entre catálogo, categorías, detalle, carrito y checkout (React Router)
 Carrito en Context (estado global)
 Mostrar contenido del carrito, subtotales y total (Cart / CartItem)
 CartWidget con total de unidades
 Generar orden en Firestore al confirmar compra y mostrar orderId
 Renderizado condicional (loaders, “carrito vacío”, “sin stock”, etc.)
 README del proyecto (este archivo) → agregarlo al repo
 Repo público y “clean install” verificado