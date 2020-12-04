const { User } = require('../../../model/model');

module.exports = {
  userResolver: async (parent, args) => {
    try {
      return await User.findOne(args);
    } catch (err) {
      return err;
    }
  },
  usersResolver: async () => {
    try {
      return await User.find({});
    } catch (err) {
      return err;
    }
  }
};
