const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://flash-card-user:flash-card-user@cluster0.qmqwd.mongodb.net/flash-card-db?retryWrites=true&w=majority';
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'flash-card-db' };

mongoose.connect(MONGO_URI, OPTIONS)
  .then(() => console.log('Connected to Mongo DB'))
  .catch((err) => console.log(err));

const { Schema } = mongoose;
const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  }
});

const cardSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  group: { type: String, required: true },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const User = mongoose.model('user', userSchema);
const Card = mongoose.model('card', cardSchema);

module.exports = { User, Card };
