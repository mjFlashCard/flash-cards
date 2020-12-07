const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const { authorResolver } = require('../resolvers/cardResolvers');

const CardType = (types) => new GraphQLObjectType({
  name: 'Card',
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    group: { type: GraphQLString },
    author: {
      type: types.UserType,
      resolve: authorResolver
    }
  }
});

module.exports = CardType;
