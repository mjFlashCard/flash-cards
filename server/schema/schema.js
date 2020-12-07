const graphql = require('graphql');
const queryType = require('./types/root/queryType');
const mutationType = require('./types/root/mutationType');

const schema = new graphql.GraphQLSchema({ query: queryType, mutation: mutationType });

module.exports = schema;
