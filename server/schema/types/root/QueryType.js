const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString
} = require('graphql');
const { userType, cardType } = require('../types');
const {
  userResolver,
  usersResolver,
  cardResolver,
  cardsResolver
} = require('../../resolvers/root/queryResolvers');

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        _id: { type: GraphQLID },
        username: { type: GraphQLString }
      },
      resolve: userResolver
    },
    users: {
      type: GraphQLList(userType),
      resolve: usersResolver
    },
    card: {
      type: cardType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve: cardResolver
    },
    cards: {
      type: GraphQLList(cardType),
      resolve: cardsResolver
    }
  }
});

module.exports = queryType;
