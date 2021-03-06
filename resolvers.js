const { User, Book, Genre, Comment } = require("./models");
const bcrypt = require("bcryptjs");
const { AuthenticationError, UserInputError } = require("apollo-server");
const { toJWT } = require("./auth");

const resolvers = {
  Query: {
    users: () => User.find(),
    user(parent, args, context, info) {
      const user = User.findById(args.id).populate("comments");
      return user;
    },
    books: () => Book.find().populate("comments"),
    book: async (_, { id }) => {
      const book = await Book.findById(id).populate("comments");
      console.log(book.comments);
      return book;
    },
    genres: () => Genre.find(),
    comments: () => Comment.find(),
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
      const token = toJWT({
        id: user.id,
      });
      return { token, user };
    },
    removeUser: async (_, { id }) => {
      const user = await User.findByIdAndDelete(id);
      return "User removed from database";
    },
    updateUser: async (_, { id, username, password }) => {
      const hash = bcrypt.hashSync(password, 8);
      const update = { username, password: hash };
      const user = await User.findOneAndUpdate(id, update);
      return "User data updated";
    },
    addBook: async (_, { title, author, description, image, genres }) => {
      const book = new Book({ title, author, description, image, genres });
      await book.save();
      return book;
    },
    addGenre: async (_, { name }) => {
      const genre = new Genre({ name });
      await genre.save();
      return genre;
    },
    addGenreToBook: async (_, { id, genres }) => {
      const update = { $push: { genres: genres } };
      const book = await Book.findOneAndUpdate(id, update);
      return book;
    },
    removeGenreToBook: async (_, { id }) => {
      const update = { $pop: { genres: 1 } };
      const book = await Book.findOneAndUpdate(id, update);
      return book;
    },
    addComment: async (_, { userId, bookId, comment }) => {
      const newComment = new Comment({ userId, bookId, comment });
      await newComment.save();
      await Book.findOneAndUpdate(
        { _id: bookId },
        {
          $push: { comments: newComment },
        }
      );
      await User.findOneAndUpdate(userId, {
        $push: { comments: newComment },
      });
      return newComment;
    },
    removeComment: async (_, { bookId }) => {
      const update = { $pop: { comments: 1 } };
      const book = await Book.findOneAndUpdate({ _id: bookId }, update);
      return "Comment removed!";
    },
  },
};

module.exports = resolvers;
