const Loader = require('./Loader/Loader');
const createUserByIdFns = require('./batchFns/userById');
const createCardByIdFns = require('./batchFns/cardById');
const createCardByAuthFns = require('./batchFns/cardByAuth');

// Cache keys as strings
const cacheKeyFn = (key) => key.toString();

// Create batch functions
const loaders = {};
const { batchUsers, batchAllUsers } = createUserByIdFns();
const { batchCards, batchAllCards } = createCardByIdFns(loaders);
const { batchCardsByAuth } = createCardByAuthFns(loaders);

// Create loaders
loaders.users = new Loader(batchUsers, { batchAllFn: batchAllUsers, cacheKeyFn });
loaders.cards = new Loader(batchCards, { batchAllFn: batchAllCards, cacheKeyFn });
loaders.cardsByAuth = new Loader(batchCardsByAuth, { cacheKeyFn });

module.exports = { loaders, cleanup: Loader.cleanup.bind(Loader) };
