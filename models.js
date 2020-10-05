const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { timestamps: true }
);

const genreSchema = new mongoose.Schema({
  name: String,
});

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  image: String,
  genres: [genreSchema],
});

const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema);
const Genre = mongoose.model("Genre", genreSchema);

module.exports = { User, Book, Genre };
