const graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    username: { type: graphql.GraphQLString },
    password: { type: graphql.GraphQLString },
    name: {
      first: { type: graphql.GraphQLString },
      last: { type: graphql.GraphQLString }
    }
  }
});
