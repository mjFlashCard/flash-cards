const { User } = require('../../model/model');

// User batching functions
const createUserByIdFns = () => ({
  batchUsers: async (keys) => {
    const results = await User.find({ _id: { $in: keys } });
    const users = {};
    results.forEach((user) => { users[user._id] = user; });
    return keys.map((key) => users[key]);
  },
  batchAllUsers: async () => User.find({})
});

module.exports = createUserByIdFns;
