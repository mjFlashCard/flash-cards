const graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
  name: 'Card',
  fields: {
    id: { type: graphql.GraphQLString },
    title: { type: graphql.GraphQLString },
    body: { type: graphql.GraphQLString },
    group: { type: graphql.GraphQLString }
  }
});
