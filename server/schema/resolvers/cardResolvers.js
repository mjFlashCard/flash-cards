const cardResolvers = {};

cardResolvers.authorResolver = async (parent, args, { loaders }) => (
  loaders.users.load(parent.userID)
);

module.exports = cardResolvers;
