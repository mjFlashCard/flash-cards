const graphql = require('graphql');
const NameType = require('./NameType');

module.exports = new graphql.GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: graphql.GraphQLID },
    username: { type: graphql.GraphQLString },
    password: { type: graphql.GraphQLString },
    name: { type: NameType }
  })
});
