const graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
  name: 'Card',
  fields: {
    _id: { type: graphql.GraphQLID },
    title: { type: graphql.GraphQLString },
    body: { type: graphql.GraphQLString },
    group: { type: graphql.GraphQLString }
  }
});
