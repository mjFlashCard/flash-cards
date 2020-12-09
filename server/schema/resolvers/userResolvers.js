const { Card } = require('../../model/model');

const userResolvers = {};

userResolvers.cardResolver = async (parent, args) => (
  Card.find({ _id: args._id, userID: parent._id })
);

userResolvers.cardsResolver = async (parent, args, { loaders }) => (
  loaders.cardsByAuthor.load(parent._id)
);

module.exports = userResolvers;
