const { User } = require('../../../model/model');

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
    const update = {
      username: args.username,
      password: args.password,
      firstname: args.firstname,
      lastname: args.lastname
    };
    const options = { useFindAndModify: false, omitUndefined: true, new: true };
    return User.findByIdAndUpdate(args._id, update, options);
  } catch (err) {
    return err;
  }
};

mutationResolvers.replaceUserResolver = (parent, args) => {
  try {
    const replacement = {
      username: args.username,
      password: args.password,
      firstname: args.firstname,
      lastname: args.lastname
    };
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

module.exports = mutationResolvers;
