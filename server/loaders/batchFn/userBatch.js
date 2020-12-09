const { User } = require('../../model/model');

// User batching function
async function batchUsers(keys) {
  const results = await User.find({ _id: { $in: keys } });
  const users = {};
  results.forEach((user) => { users[user._id] = user; });
  return keys.map((key) => users[key]);
}

// User queryAll function
async function queryAllUsers() {
  return User.find({});
}

module.exports = { batchUsers, queryAllUsers };
