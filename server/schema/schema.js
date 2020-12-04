const graphql = require('graphql');
const QueryType = require('./types/root/QueryType');
const MutationType = require('./types/root/MutationType');

module.exports = new graphql.GraphQLSchema({ query: QueryType, mutation: MutationType });
