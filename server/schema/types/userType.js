const graphql = require('graphql');

const UserType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: graphql.GraphQLID },
    username: { type: graphql.GraphQLString },
    password: { type: graphql.GraphQLString },
    firstname: { type: graphql.GraphQLString },
    lastname: { type: graphql.GraphQLString }
  })
});

module.exports = UserType;
