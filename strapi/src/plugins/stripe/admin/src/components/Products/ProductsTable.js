import React from "react";
import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Box,
  Avatar,
  Button,
} from "@strapi/design-system";

export default function ProductsTable({ products, checkedProducts }) {
  const i18nCurrency = {
    eur: "€",
  };

  

  const onCheckboxChange = (e) => {
    const productId = e.target.value
    const isCheck = checkedProducts.indexOf(productId)
    if (isCheck === -1) checkedProducts.push(productId)
    if (isCheck !== -1) checkedProducts.splice(isCheck, 1)
  };

  return (
    
      <Box padding={8} background="neutral100">
        
        <Table colCount={10} row={6}>
          <Thead>
            <Tr>
              <Th>
                <input type="checkbox" />
              </Th>
              <Th>Images</Th>
              <Th>Name</Th>
              <Th>ID</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products?.map((product) => {
              return (
                <Tr key={product.id}>
                  <Td>
                  <input type="checkbox" value={product.id} onChange={onCheckboxChange}/>
                  </Td>
                  <Td>
                    <Box padding={4}>
                      <Avatar src={product.images[0]} alt={product.name} />
                    </Box>
                  </Td>
                  <Td>{product.name}</Td>
                  <Td>{product.id}</Td>
                  <Td>
                    {i18nCurrency[product.currency]}
                    {product.price}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
  );
}
