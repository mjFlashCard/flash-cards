const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://flash-card-user:flash-card-user@cluster0.qmqwd.mongodb.net/flash-card-db?retryWrites=true&w=majority';
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'flash-card-db' };

mongoose.connect(MONGO_URI, OPTIONS)
  .then(() => console.log('Connected to Mongo DB'))
  .catch((err) => console.log(err));

const { Schema } = mongoose;
const userSchema = new Schema({
  username: String,
  password: String,
  name: {
    first: String,
    last: String
  }
});

const cardSchema = new Schema({
  title: String,
  body: String,
  group: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const Users = mongoose.model('user', userSchema);
const Cards = mongoose.model('card', cardSchema);

module.exports = { Users, Cards };
