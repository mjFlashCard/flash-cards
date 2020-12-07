const {
  GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString
} = require('graphql');
const CardType = require('./CardType');
const { cardResolver, cardsResolver } = require('../resolvers/userResolvers');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    card: {
      type: CardType,
      args: { _id: { type: GraphQLID } },
      resolve: cardResolver
    },
    cards: {
      type: GraphQLList(CardType),
      resolve: cardsResolver
    }
  })
});

module.exports = UserType;
