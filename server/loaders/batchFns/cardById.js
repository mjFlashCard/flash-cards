const { Card } = require('../../model/model');

// Create card batching functions ('loaders' gives access to other loaders)
const createCardByIdFns = (loaders) => ({
  batchCards: async (keys) => {
    const results = await Card.find({ _id: { $in: keys } });
    const cards = {};
    results.forEach((card) => { cards[card._id] = card; });
    return keys.map((key) => cards[key]);
  },
  batchAllCards: async () => {
    const results = await Card.find({});
    const cardsForCache = {};
    results.forEach((card) => {
      if (cardsForCache[card.userID]) cardsForCache[card.userID].push(card);
      else cardsForCache[card.userID] = [card];
    });
    Object.keys(cardsForCache).forEach((userID) => {
      loaders.cardsByAuth.prime(userID, cardsForCache[userID]);
    });
    return results;
  }
});

module.exports = createCardByIdFns;
