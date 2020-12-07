const { Schema } = require('mongoose');

module.exports = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  group: { type: String, required: true },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});
