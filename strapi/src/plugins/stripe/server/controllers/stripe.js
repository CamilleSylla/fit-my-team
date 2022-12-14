"use strict";

const stripe = require("stripe")(
  "sk_test_51Hj2udHo7ReTdVEbLMG6ROEEuzXFuOghI8vpq9MhVzb9O57357GDkhDErau4o02JLnaXt6WiPL2FfjFOlfCzznue00dqolcx56"
);
module.exports = {
  async listItems(ctx) {
    try {
      const products =  stripe.products.search({
        query: 'active:\'true\'',
        limit: 20
      }).then((res) => {
          return res?.data?.reduce(async (acc, product) => {
            const price = await stripe.prices.retrieve(product.default_price);
            
            (await acc).push({
              ...product,
              price: price.unit_amount / 100,
              currency: price.currency,
            });
            return acc;
          }, []);
        });
      return await products;
    } catch (err) {
      console.log(err);
    }
  },
  async createProduct({ request }) {
    try {
      const { body } = request;
      const form = JSON.parse(body);
      const product = await stripe.products.create({
        name: form.name,
        description: form.description,
        images: form.images,
        default_price_data: {
          currency: form.currency,
          unit_amount_decimal: form.price * 100,
        },
      });
      return JSON.stringify({
        data: `Product ${product.id} as been created as ${product.name}`,
      });
    } catch (err) {
      console.log(err);
    }
  },
  async deleteProduct({ request }) {
    try {
      const { body } = request;
      const { products } = JSON.parse(body);
      console.log(products);

      const deleteMap = products.map(async (id) => {
        const deleted = await stripe.products.update(
          id,
          {active: false}
        );;
        return deleted
      });
      return `${deleteMap.length} products have been deleted`
    } catch (err) {
      console.log(err);
    }
  },
};
