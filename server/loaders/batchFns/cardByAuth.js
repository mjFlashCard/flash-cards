const { Card } = require('../../model/model');

// Create cards-owned-by-author batching functions ('loaders' gives access to other loaders)
const createCardByAuthFns = (loaders) => ({
  batchCardsByAuth: async (keys) => {
    const results = await Card.find({ userID: { $in: keys } });
    const cards = {};
    results.forEach((card) => {
      if (card) {
        loaders.cards.prime(card._id, card);
        if (cards[card.userID]) cards[card.userID].push(card);
        else cards[card.userID] = [card];
      }
    });
    return keys.map((key) => cards[key] || null);
  }
});

module.exports = createCardByAuthFns;
