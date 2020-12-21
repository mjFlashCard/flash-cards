const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const { loaders, cleanup } = require('../loaders/loaders');

const graphQLController = {};

graphQLController.httpEndpoint = graphqlHTTP({
  schema,
  context: { loaders },
  graphiql: true
});

graphQLController.cleanup = (req, res, next) => {
  try {
    cleanup();
    return next();
  } catch (err) {
    return next({ log: err });
  }
};

module.exports = graphQLController;
