const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString
} = require('graphql');
const UserType = require('../UserType');
const CardType = require('../CardType');
const {
  userResolver,
  usersResolver,
  cardResolver,
  cardsResolver
} = require('../../resolvers/root/queryResolvers');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: {
        _id: { type: GraphQLID },
        username: { type: GraphQLString }
      },
      resolve: userResolver
    },
    users: {
      type: GraphQLList(UserType),
      resolve: usersResolver
    },
    card: {
      type: CardType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve: cardResolver
    },
    cards: {
      type: GraphQLList(CardType),
      resolve: cardsResolver
    }
  }
});

module.exports = QueryType;
