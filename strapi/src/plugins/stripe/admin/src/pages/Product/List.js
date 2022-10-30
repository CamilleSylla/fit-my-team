import React from "react";
import { useState, useEffect } from "react";
import ProductsTable from "../../components/Products/ProductsTable";
import {
  Box,
  Button,
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography
} from "@strapi/design-system";

const AdminDev = true;

export default function ProductListPage() {
  const [productsList, setProductsList] = useState(null);
  const [refreshList, setRefreshList] = useState(true)
  const [checkedProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchProducts = fetch(
    AdminDev ? "http://localhost:1337/stripe" : "/stripe"
  )
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });

  const CancelObject = async (e) => {
    console.log(checkedProducts);
    const deleteProducts = await fetch(
      "http://localhost:1337/stripe/product/delete",
      {
        method: "POST",
        body: JSON.stringify({ products: checkedProducts }),
      }
    );
    refresh()
    setShowDeleteModal(false)
  };

  const refresh = async () => {
    try {
      const data = await (await fetchProducts).json();
      if (data) {
        setProductsList(data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (!productsList) {
    refresh()
  }

  return (
    <div>
      {showDeleteModal && (
        <ModalLayout style={{width: "fit-content"}}  onClose={() => setShowDeleteModal(false)}>
          <ModalHeader >
            <Typography fontWeight="bold" textColor="neutral800" as="h2">Are you sure ?</Typography>
          </ModalHeader>
          <ModalBody>
          <Typography fontWeight="bold" textColor="neutral800" variant="Omega bold" as="p">Once deleted, you will not be able to reintroduce it from this interface</Typography>
          <Typography fontWeight="bold" textColor="neutral800" variant="Omega" as="p">Go to Stripe <a href="https://dashboard.stripe.com/test/products?active=false" target="_blank">product archive page</a> to get it back</Typography>

          </ModalBody>
          <ModalFooter startActions={<Button onClick={() => setShowDeleteModal(false)} variant="tertiary">
                    Cancel
                  </Button>} endActions={
                    <Button variant="danger-light" onClick={CancelObject} >Delete {checkedProducts.length} product{checkedProducts>0 && "s"}</Button>}/>
        </ModalLayout>
      )}
        <Box padding={8}>
          {checkedProducts && <Button onClick={() => setShowDeleteModal(true)}>Delete </Button>}
        </Box>
        {productsList ? (
          <ProductsTable
            checkedProducts={checkedProducts}
            products={productsList}
          />
        ) : (
          ""
        )}
    </div>
  );
}
