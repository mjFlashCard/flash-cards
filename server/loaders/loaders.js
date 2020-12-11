const Loader = require('./Loader/Loader');
const { batchUsers, queryAllUsers } = require('./batchFn/userBatch');
const { batchCards, queryAllCards, createCardCacheFn } = require('./batchFn/cardBatch');
const { batchCardsByAuthor, createCardByAuthorCacheFn } = require('./batchFn/cardByAuthorBatch');

// Cache keys as strings
const cacheKeyFn = (key) => key.toString();

// Creating named loaders necessary for priming caches
const userLoader = new Loader(batchUsers, { queryAllFn: queryAllUsers, cacheKeyFn });
const cardLoader = new Loader(batchCards, {
  queryAllFn: queryAllCards,
  cacheKeyFn
});
const cardsByAuthorLoader = new Loader(batchCardsByAuthor, {
  cacheFn: createCardByAuthorCacheFn(cardLoader),
  cacheKeyFn
});
cardLoader.setCacheFn(createCardCacheFn(cardsByAuthorLoader));

module.exports = {
  users: userLoader,
  cards: cardLoader,
  cardsByAuthor: cardsByAuthorLoader
};
