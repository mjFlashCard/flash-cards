const graphql = require('graphql');
const { userType, cardType } = require('../types');
const {
  createUserResolver,
  updateUserResolver,
  replaceUserResolver,
  destroyUserResolver,
  createCardResolver,
  updateCardResolver,
  replaceCardResolver,
  destroyCardResolver
} = require('../../resolvers/root/mutationResolvers');

const mutationType = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: userType,
      args: {
        username: { type: graphql.GraphQLString },
        password: { type: graphql.GraphQLString },
        firstname: { type: graphql.GraphQLString },
        lastname: { type: graphql.GraphQLString }
      },
      resolve: createUserResolver
    },
    updateUser: {
      type: userType,
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
      type: userType,
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
      type: userType,
      args: { _id: { type: graphql.GraphQLID } },
      resolve: destroyUserResolver
    },
    createCard: {
      type: cardType,
      args: {
        title: { type: graphql.GraphQLString },
        body: { type: graphql.GraphQLString },
        group: { type: graphql.GraphQLString },
        userID: { type: graphql.GraphQLID }
      },
      resolve: createCardResolver
    },
    updateCard: {
      type: cardType,
      args: {
        _id: { type: graphql.GraphQLID },
        title: { type: graphql.GraphQLString },
        body: { type: graphql.GraphQLString },
        group: { type: graphql.GraphQLString },
        userID: { type: graphql.GraphQLID }
      },
      resolve: updateCardResolver
    },
    replaceCard: {
      type: cardType,
      args: {
        _id: { type: graphql.GraphQLID },
        title: { type: graphql.GraphQLString },
        body: { type: graphql.GraphQLString },
        group: { type: graphql.GraphQLString },
        userID: { type: graphql.GraphQLID }
      },
      resolve: replaceCardResolver
    },
    destroyCard: {
      type: cardType,
      args: { _id: { type: graphql.GraphQLID } },
      resolve: destroyCardResolver
    }
  }
});

module.exports = mutationType;
