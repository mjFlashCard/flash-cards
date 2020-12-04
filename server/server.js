const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv');
const path = require('path');
const schema = require('./schema/schema');
// const resolvers = require('./schema/resolvers/resolvers');

if (process.env.NODE_ENV !== 'production') dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GraphQL
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

// Serve client entrypoint
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../client/index.html')));

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unkown middleware error',
    status: 500,
    msg: { err: 'An error occured.  See logs for details' }
  };
  const { log, status, msg } = { ...defaultErr, ...err };
  // eslint-disable-next-line no-console
  console.log(log);
  return res.status(status).json(msg);
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

module.exports = app;
