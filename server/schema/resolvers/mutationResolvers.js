const { User, Card } = require('../../model/model');
const { shallowClone } = require('../../helpers/cloneUtils');

const mutationResolvers = {};

mutationResolvers.createUserResolver = async (parent, args) => User.create(args);

mutationResolvers.updateUserResolver = async (parent, args) => {
  const update = shallowClone(args);
  delete update._id;
  const options = { useFindAndModify: false, omitUndefined: true, new: true };
  return User.findByIdAndUpdate(args._id, update, options);
};

mutationResolvers.replaceUserResolver = async (parent, args) => {
  const replacement = shallowClone(args);
  delete replacement._id;
  const options = { useFindAndModify: false, omitUndefined: true, new: true };
  return User.findOneAndReplace({ _id: args._id }, replacement, options);
};

mutationResolvers.destroyUserResolver = async (parent, args) => {
  const options = { useFindAndModify: false };
  return User.findByIdAndDelete(args._id, options);
};

mutationResolvers.createCardResolver = async (parent, args) => Card.create(args);

mutationResolvers.updateCardResolver = async (parent, args) => {
  const update = shallowClone(args);
  delete update._id;
  const options = { useFindAndModify: false, omitUndefined: true, new: true };
  return Card.findByIdAndUpdate(args._id, update, options);
};

mutationResolvers.replaceCardResolver = async (parent, args) => {
  const replacement = shallowClone(args);
  delete replacement._id;
  const options = { useFindAndModify: false, omitUndefined: true, new: true };
  return Card.findOneAndReplace({ _id: args._id }, replacement, options);
};

mutationResolvers.destroyCardResolver = async (parent, args) => {
  const options = { useFindAndModify: false };
  return Card.findByIdAndDelete(args._id, options);
};

module.exports = mutationResolvers;
