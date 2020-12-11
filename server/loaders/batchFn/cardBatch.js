const { Card } = require('../../model/model');

// Card batching function
async function batchCards(keys) {
  const results = await Card.find({ _id: { $in: keys } });
  const cards = {};
  results.forEach((card) => { cards[card._id] = card; });
  return keys.map((key) => cards[key]);
}

// Card queryAll function
async function queryAllCards() {
  return Card.find({});
}

// Create function for priming 'cardsByAuthorLoader' cache from 'cardLoader'
const createCardCacheFn = (loader) => (results) => {
  const cardsForCache = {};
  results.forEach((card) => {
    if (cardsForCache[card.userID]) cardsForCache[card.userID].push(card);
    else cardsForCache[card.userID] = [card];
  });
  Object.keys(cardsForCache).forEach((userID) => loader.prime(userID, cardsForCache[userID]));
};

module.exports = { batchCards, queryAllCards, createCardCacheFn };
