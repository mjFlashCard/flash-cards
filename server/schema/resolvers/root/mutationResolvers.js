const { User, Card } = require('../../../model/model');
const { shallowClone } = require('../../../helpers/cloneUtils');

const mutationResolvers = {};

mutationResolvers.createUserResolver = (parent, args) => {
  try {
    return User.create(args);
  } catch (err) {
    return err;
  }
};

mutationResolvers.updateUserResolver = (parent, args) => {
  try {
    const update = shallowClone(args);
    delete update._id;
    const options = { useFindAndModify: false, omitUndefined: true, new: true };
    return User.findByIdAndUpdate(args._id, update, options);
  } catch (err) {
    return err;
  }
};

mutationResolvers.replaceUserResolver = (parent, args) => {
  try {
    const replacement = shallowClone(args);
    delete replacement._id;
    const options = { useFindAndModify: false, omitUndefined: true, new: true };
    return User.findOneAndReplace({ _id: args._id }, replacement, options);
  } catch (err) {
    return err;
  }
};

mutationResolvers.destroyUserResolver = (parent, args) => {
  try {
    const options = { useFindAndModify: false };
    return User.findByIdAndDelete(args._id, options);
  } catch (err) {
    return err;
  }
};

mutationResolvers.createCardResolver = (parent, args) => {
  try {
    return Card.create(args);
  } catch (err) {
    return err;
  }
};

mutationResolvers.updateCardResolver = (parent, args) => {
  try {
    const update = shallowClone(args);
    delete update._id;
    const options = { useFindAndModify: false, omitUndefined: true, new: true };
    return Card.findByIdAndUpdate(args._id, update, options);
  } catch (err) {
    return err;
  }
};

mutationResolvers.replaceCardResolver = (parent, args) => {
  try {
    const replacement = shallowClone(args);
    delete replacement._id;
    const options = { useFindAndModify: false, omitUndefined: true, new: true };
    return Card.findOneAndReplace({ _id: args._id }, replacement, options);
  } catch (err) {
    return err;
  }
};

mutationResolvers.destroyCardResolver = (parent, args) => {
  try {
    const options = { useFindAndModify: false };
    return Card.findByIdAndDelete(args._id, options);
  } catch (err) {
    return err;
  }
};

module.exports = mutationResolvers;
