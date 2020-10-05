const { User, Book } = require("./models");
const bcrypt = require("bcryptjs");
const { AuthenticationError, UserInputError } = require("apollo-server");
const { toJWT } = require("./auth");

const resolvers = {
  Query: {
    users: () => User.find(),
    user(parent, args, context, info) {
      const user = User.findById(args.id);
      return user;
    },
    books: () => Book.find(),
  },
  Mutation: {
    signup: async (_, { username, password }) => {
      const hash = bcrypt.hashSync(password, 8);
      const user = new User({ username, password: hash });
      await user.save();
      return user;
    },
    login: async (parent, args, context, info) => {
      const user = await User.findOne({
        username: args.username,
      }).catch((error) => console.log("Caught:", error.message));
      if (!user) {
        throw new UserInputError("Form Arguments invalid", {
          invalidArgs: Object.keys(args.username),
        });
      }
      const passwordIsValid = bcrypt.compareSync(args.password, user.password);
      if (!passwordIsValid) {
        throw new AuthenticationError("Invalid password");
      }
      const token = toJWT({ id: user.id });
      return token;
    },
    removeUser: async (_, { id }) => {
      const user = await User.findByIdAndDelete(id);
      console.log(user);
      return "User removed from database";
    },
    updateUser: async (_, { id, username, password }) => {
      const hash = bcrypt.hashSync(password, 8);
      const update = { username, password: hash };
      const user = await User.findOneAndUpdate(id, update);
      return "User data updated";
    },
    addBook: async (_, { title, author, description, image }) => {
      const book = new Book({ title, author, description, image });
      await book.save();
      return book;
    },
  },
};

module.exports = resolvers;
