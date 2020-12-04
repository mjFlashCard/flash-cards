const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userSchema = require('./schema/userSchema');
const cardSchema = require('./schema/cardSchema');

if (process.env.NODE_ENV !== 'production') dotenv.config();

const { MONGO_URI } = process.env;
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'flash-card-db' };

// eslint-disable-next-line no-console
mongoose.connect(MONGO_URI, OPTIONS).catch((err) => console.log(err));

const User = mongoose.model('user', userSchema);
const Card = mongoose.model('card', cardSchema);

module.exports = { User, Card };
