const { User } = require('../../model/model');

const cardResolvers = {};

cardResolvers.authorResolver = (parent) => {
  try {
    return User.findOne({ _id: parent.userID });
  } catch (err) {
    return err;
  }
};

module.exports = cardResolvers;
