// path: ./config/plugins.js

module.exports = {
    //
    'stripe': {
      enabled: true,
      resolve: './src/plugins/stripe'
    },
    graphql: {
      config: {
        endpoint: '/graphql',
        shadowCRUD: true,
        playgroundAlways: false,
        depthLimit: 10,
        amountLimit: 100,
        apolloServer: {
          tracing: false,
        },
      },
    },
  };
  