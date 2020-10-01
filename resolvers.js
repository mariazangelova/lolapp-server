const users = require("./data");

const resolvers = {
  Query: {
    users: () => users,
    user(parent, args, context, info) {
      return users.find((user) => user.id === args.id);
    },
    login(parent, args, context, info) {
      return users.find((user) => user.password === args.password);
    },
  },
};

module.exports = resolvers;
