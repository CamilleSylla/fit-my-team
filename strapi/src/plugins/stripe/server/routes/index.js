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
];
