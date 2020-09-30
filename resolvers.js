const users = require("./data");

const resolvers = {
  Query: {
    users: () => users,
  },
};

module.exports = resolvers;
