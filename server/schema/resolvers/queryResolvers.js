const { User, Card } = require('../../model/model');

const queryResolvers = {};

queryResolvers.userResolver = (parent, args) => {
  try {
    return User.findOne(args);
  } catch (err) {
    return err;
  }
};

queryResolvers.usersResolver = () => {
  try {
    return User.find({});
  } catch (err) {
    return err;
  }
};

queryResolvers.cardResolver = (parent, args) => {
  try {
    return Card.findOne(args);
  } catch (err) {
    return err;
  }
};

queryResolvers.cardsResolver = () => {
  try {
    return Card.find({});
  } catch (err) {
    return err;
  }
};

module.exports = queryResolvers;
