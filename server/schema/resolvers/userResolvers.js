const { Card } = require('../../model/model');

const userResolvers = {};

userResolvers.cardResolver = (parent, args) => {
  try {
    return Card.find({ _id: args._id, userID: parent._id });
  } catch (err) {
    return err;
  }
};

userResolvers.cardsResolver = (parent) => {
  try {
    return Card.find({ userID: parent._id });
  } catch (err) {
    return err;
  }
};

module.exports = userResolvers;
