const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { timestamps: true }
);

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  image: String,
});

const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema);

module.exports = { User, Book };
