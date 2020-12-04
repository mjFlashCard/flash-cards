const { User } = require('../../../model/model');

module.exports = {
  createUserResolver: async (parent, args) => {
    try {
      const {
        username, password, firstname: first, lastname: last
      } = args;
      const user = new User({ username, password, name: { first, last } });
      user.save();
      return user;
    } catch (err) {
      return err;
    }
  }
};
