import users from "./data";
export const resolvers = {
  Query: {
    users: () => users,
  },
};
