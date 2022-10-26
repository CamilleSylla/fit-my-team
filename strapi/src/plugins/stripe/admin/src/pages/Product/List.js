import React from "react";
import { useState, useEffect } from "react";
import ProductsTable from "../../components/Products/ProductsTable";
const AdminDev = true;

export default function ProductListPage() {
  const [productsList, setProductsList] = useState(null);

  const fetchProducts = fetch(
    AdminDev ? "http://localhost:1337/stripe" : "/stripe"
  )
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });

  useEffect(async () => {
    try {
      const data = await (await fetchProducts).json();
      if (data) {
        setProductsList(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <div>{productsList ? <ProductsTable products={productsList} /> : ""}</div>
  );
}
