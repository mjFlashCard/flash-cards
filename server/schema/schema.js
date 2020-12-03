const graphql = require('graphql');
const userType = require('./types/userType');
const cardType = require('./types/cardType');

const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: graphql.GraphQLString }
      }
    },
    card: {
      type: cardType,
      args: {
        id: { type: graphql.GraphQLString }
      }
    }
  }
});

module.exports = new graphql.GraphQLSchema({ query: queryType });
