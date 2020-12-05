const graphql = require('graphql');
const UserType = require('../UserType');
const CardType = require('../CardType');
const { userResolver, usersResolver } = require('../../resolvers/root/queryResolvers');

const { GraphQLList } = graphql;

const QueryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: {
        _id: { type: graphql.GraphQLID },
        username: { type: graphql.GraphQLString }
      },
      resolve: userResolver
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: usersResolver
    },
    card: {
      type: CardType,
      args: {
        _id: { type: graphql.GraphQLID }
      }
    }
  }
});

module.exports = QueryType;
