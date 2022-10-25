/*
 *
 * HomePage
 *
 */
import React from "react";
import { useState, useEffect } from "react";
import pluginId from "../../pluginId";
import ProductsTable from "../../components/Products/ProductsTable";
import { Typography, Box } from "@strapi/design-system";
const AdminDev = true;
export default function HomePage() {
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
    <div>
      <Box padding={8}>
      <Typography  variant="alpha">{pluginId.toUpperCase()}</Typography>
      </Box>
      {productsList ? <ProductsTable products={productsList} /> : ""}
      {/* {productsList
        ? productsList.map((product) => {
            return <Cards product={product} />;
          })
        : ""} */}
    </div>
  );
}
