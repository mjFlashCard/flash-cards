const userType = require('./userType');
const cardType = require('./cardType');

const types = {};
types.userType = userType(types);
types.cardType = cardType(types);

module.exports = types;
