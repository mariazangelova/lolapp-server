const User = require("./models");

const resolvers = {
  Query: {
    users: () => User.find(),
    user(parent, args, context, info) {
      const user = User.findById(args.id);
      return user;
    },
    login(parent, args, context, info) {
      const user = User.findById(args.id);
      return user;
    },
  },
  Mutation: {
    signup: async (_, { username, password }) => {
      const user = new User({ username, password });
      await user.save();
      return user;
    },
  },
};

module.exports = resolvers;
