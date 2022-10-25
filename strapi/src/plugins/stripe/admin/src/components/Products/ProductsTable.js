import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Box,
  Avatar,
} from "@strapi/design-system";

export default function ProductsTable({ products }) {

  const i18nCurrency = {
    eur : "€"
  }

  return (
    <Box padding={8} background="neutral100">
      <Table colCount={10} row={6}>
        <Thead>
          <Tr>
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
                  <Box padding={4}>
                    <Avatar src={product.images[0]} alt={product.name} />
                  </Box>
                </Td>
                <Td>{product.name}</Td>
                <Td>{product.id}</Td>
                <Td>{i18nCurrency[product.currency]}{product.price}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
