const {
  GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString
} = require('graphql');
const { cardResolver, cardsResolver } = require('../resolvers/userResolvers');

const userType = (types) => new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    card: {
      type: types.cardType,
      args: { _id: { type: GraphQLID } },
      resolve: cardResolver
    },
    cards: {
      type: GraphQLList(types.cardType),
      resolve: cardsResolver
    }
  })
});

module.exports = userType;
