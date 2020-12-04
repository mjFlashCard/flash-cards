const graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
  name: 'Name',
  fields: {
    first: { type: graphql.GraphQLString },
    last: { type: graphql.GraphQLString }
  }
});
