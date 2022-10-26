"use strict";


const stripe = require("stripe")(
  "sk_test_51Hj2udHo7ReTdVEbLMG6ROEEuzXFuOghI8vpq9MhVzb9O57357GDkhDErau4o02JLnaXt6WiPL2FfjFOlfCzznue00dqolcx56"
);
module.exports = {
  async listItems(ctx) {
    try {
      const products = stripe.products
        .list({
          limit: 3,
        })
        .then((res) => {
          return res?.data?.reduce(async (acc, product) => {
            const price = await stripe.prices.retrieve(product.default_price);
             (await acc).push({ ...product, price: price.unit_amount /100, currency : price.currency })
             return acc
          }, [] );
        });
      return await products;
    } catch (err) {
      console.log(err);
    }
  },
  async singlePrice(ctx) {
    try {
      // const price = await stripe.price.retrieve({
      console.log(ctx);
      return ctx;
      // })
    } catch (err) {
      console.log(err);
    }
  },
};
