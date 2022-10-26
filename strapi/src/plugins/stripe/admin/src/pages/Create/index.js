import React from "react";
import { useState } from "react";
import {
  TextInput,
  Box,
  Button,
  Textarea,
  NumberInput,
  Alert,
  Typography
} from "@strapi/design-system";

export default function CreatePage() {
  const [createRes, setCreateRes] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    media: null,
    price: "",
    currency: "eur",
  });

  const createProduct = async () => {
    try {
      const fetchProducts = await fetch(
        "http://localhost:1337/stripe/product/create",
        {
          method: "POST",
          body: JSON.stringify(form),
        }
      );
      const { error, data } = await fetchProducts.json();
      if (error) {
        throw error;
      }
      setCreateRes(data);
      setTimeout(() => {
        setCreateRes("");
      }, 3000)
    } catch (err) {
      setCreateRes(err);
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
      <TextInput
        placeholder="Red Shirt"
        label="Name"
        name="name"
        error={form.name > 50 ? "Content is too long" : undefined}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        value={form.name}
      />
      <Textarea
        placeholder="Describe your product here..."
        label="Description"
        name="description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        value={form.description}
      />
      <div>
        <label>Product images</label>
        <input
          style={{ display: "block" }}
          onChange={(e) => setForm({ ...form, media: e.target.files })}
          name="product_images"
          type="file"
          accept="image/png, image/jpeg"
        />
      </div>
      <NumberInput
        placeholder="10,90"
        label="Price"
        name="price"
        error={undefined}
        onValueChange={(value) => setForm({ ...form, price: value })}
        value={form.price}
      />
      <Button onClick={createProduct}>Create</Button>
    </Box>
  );
}
