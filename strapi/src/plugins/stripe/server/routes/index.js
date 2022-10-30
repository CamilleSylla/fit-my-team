module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'stripe.listItems',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'POST',
    path: '/product/create',
    handler: 'stripe.createProduct',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'POST',
    path: '/product/delete',
    handler: 'stripe.deleteProduct',
    config: {
      policies: [],
      auth: false
    },
  },
];
