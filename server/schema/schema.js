const graphql = require('graphql');
const QueryType = require('./types/root/QueryType');
const MutationType = require('./types/root/MutationType');

const schema = new graphql.GraphQLSchema({ query: QueryType, mutation: MutationType });

module.exports = schema;
