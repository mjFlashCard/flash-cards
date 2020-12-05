const { Schema } = require('mongoose');

module.exports = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true }
});
