const { Schema } = require('mongoose');

module.exports = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  }
});
