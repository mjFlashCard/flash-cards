const mongoose = require('mongoose');
const userSchema = require('./schema/userSchema');
const cardSchema = require('./schema/cardSchema');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://flash-card-user:flash-card-user@cluster0.qmqwd.mongodb.net/flash-card-db?retryWrites=true&w=majority';
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'flash-card-db' };

mongoose.connect(MONGO_URI, OPTIONS)
  .then(() => console.log('Connected to Mongo DB'))
  .catch((err) => console.log(err));

const User = mongoose.model('user', userSchema);
const Card = mongoose.model('card', cardSchema);

module.exports = { User, Card };
