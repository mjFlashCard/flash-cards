const graphql = require('graphql');
const UserType = require('../UserType');
const { createUserResolver } = require('../../resolvers/root/mutationResolvers');

module.exports = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        username: { type: graphql.GraphQLString },
        password: { type: graphql.GraphQLString },
        firstname: { type: graphql.GraphQLString },
        lastname: { type: graphql.GraphQLString }
      },
      resolve: createUserResolver
    }
  }
});
