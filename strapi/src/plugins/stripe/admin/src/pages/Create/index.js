import React from "react";
import { useState, useRef } from "react";
import {
  Box,
  Button,
  Alert,
  Typography,
} from "@strapi/design-system";
import {UploadImages } from "../../utils/global-methods";

export default function CreatePage() {
  const [createRes, setCreateRes] = useState("");

  const createProduct = async (e) => {
    e.preventDefault()
    
    const images = await UploadImages(e.target.elements.images.files)

    const form = {
      name: e.target.elements.name.value,
      description: e.target.elements.description.value,
      // media: images,
      price: e.target.elements.price.value,
      currency: "eur",
    }
    
    



    if (images) {
      const create = await fetch(
        "http://localhost:1337/stripe/product/create",
        {
          method: "POST",
          body: JSON.stringify({ ...form, images: images }),
        }
      );
      const creationMessage = await create.json();
      if (creationMessage.data) {
        setCreateRes(creationMessage.data);
        setTimeout(() => {
          setCreateRes("");
        }, 2000);
      }
    }
  };

  return (
    <Box padding={8}>
      <Typography variant="alpha">Create a new product</Typography>
      <div style={{ position: "absolute", right: 0 }}>
        {createRes ? (
          <Alert closeLabel="Close alert" title="Title" variant="success">
            {createRes}
          </Alert>
        ) : (
          ""
        )}
      </div>
      <form onSubmit={createProduct}>
        <input
        type="text"
          placeholder="Red Shirt"
          label="Name"
          name="name"
          required
          style={{display: "block"}}
        />
        <textarea
          placeholder="Describe your product here..."
          label="Description"
          name="description"
          required
          style={{display: "block"}}

        />
        <div>
          <label>Product images</label>
          <input
            style={{ display: "block" }}
            name="images"
            type="file"
            multiple
            accept="image/png, image/jpeg"
            required
          />
        </div>
        <input
        type="number"
          placeholder="10,90"
          label="Price"
          name="price"
          required
          lang="fr"
          style={{display: "block"}}
          step=".01"
        />
        <Button type="submit">Create</Button>
      </form>
    </Box>
  );
}
