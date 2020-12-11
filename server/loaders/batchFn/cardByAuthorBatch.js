const { Card } = require('../../model/model');

// Cards-owned-by-authors batch function
async function batchCardsByAuthor(keys) {
  const results = await Card.find({ userID: { $in: keys } });
  const cards = {};
  results.forEach((card) => {
    if (cards[card.userID]) cards[card.userID].push(card);
    else cards[card.userID] = [card];
  });
  return keys.map((key) => cards[key]);
}

// Create function for priming 'cardLoader' cache from 'cardsByAuthorLoader'
const createCardByAuthorCacheFn = (loader) => (results) => {
  results.forEach((cards) => {
    cards.forEach((card) => loader.prime(card._id, card));
  });
};

module.exports = { batchCardsByAuthor, createCardByAuthorCacheFn };
