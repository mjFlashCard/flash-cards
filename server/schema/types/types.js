const userType = require('./UserType');
const cardType = require('./CardType');

const types = {};
types.UserType = userType(types);
types.CardType = cardType(types);

module.exports = types;
