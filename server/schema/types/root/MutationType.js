const graphql = require('graphql');
const UserType = require('../UserType');
const CardType = require('../CardType');
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
    },
    createCard: {
      type: CardType,
      args: {
        title: { type: graphql.GraphQLString },
        body: { type: graphql.GraphQLString },
        group: { type: graphql.GraphQLString },
        userID: { type: graphql.GraphQLID }
      },
      resolve: createCardResolver
    },
    updateCard: {
      type: CardType,
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
      type: CardType,
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
      type: CardType,
      args: { _id: { type: graphql.GraphQLID } },
      resolve: destroyCardResolver
    }
  }
});

module.exports = MutationType;
