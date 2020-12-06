const { Card } = require('../../model/model');

const userResolvers = {};

userResolvers.cardsResolver = (parent) => {
  try {
    return Card.find({ userID: parent._id });
  } catch (err) {
    return err;
  }
};

module.exports = userResolvers;
