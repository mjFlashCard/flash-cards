const queryResolvers = {};

queryResolvers.userResolver = async (parent, args, { loaders }) => loaders.users.load(args._id);

queryResolvers.usersResolver = async (parent, args, { loaders }) => loaders.users.loadAll();

queryResolvers.cardResolver = async (parent, args, { loaders }) => loaders.cards.load(args._id);

queryResolvers.cardsResolver = async (parent, args, { loaders }) => loaders.cards.loadAll();

module.exports = queryResolvers;
