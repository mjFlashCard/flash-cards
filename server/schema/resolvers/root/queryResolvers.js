const { User } = require('../../../model/model');

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

module.exports = queryResolvers;
