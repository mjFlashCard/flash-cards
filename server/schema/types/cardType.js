const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const CardType = new GraphQLObjectType({
  name: 'Card',
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    group: { type: GraphQLString }
  }
});

module.exports = CardType;
