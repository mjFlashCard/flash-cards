const graphql = require('graphql');
const UserType = require('../UserType');
const {
  createUserResolver,
  updateUserResolver,
  replaceUserResolver,
  destroyUserResolver
} = require('../../resolvers/root/mutationResolvers');

const MutationType = new graphql.GraphQLObjectType({
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
    },
    updateUser: {
      type: UserType,
      args: {
        _id: { type: graphql.GraphQLID },
        username: { type: graphql.GraphQLString },
        password: { type: graphql.GraphQLString },
        firstname: { type: graphql.GraphQLString },
        lastname: { type: graphql.GraphQLString }
      },
      resolve: updateUserResolver
    },
    replaceUser: {
      type: UserType,
      args: {
        _id: { type: graphql.GraphQLID },
        username: { type: graphql.GraphQLString },
        password: { type: graphql.GraphQLString },
        firstname: { type: graphql.GraphQLString },
        lastname: { type: graphql.GraphQLString }
      },
      resolve: replaceUserResolver
    },
    destroyUser: {
      type: UserType,
      args: { _id: { type: graphql.GraphQLID } },
      resolve: destroyUserResolver
    }
  }
});

module.exports = MutationType;
