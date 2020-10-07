const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const commentSchema = new Schema(
  {
    comment: String,
    bookId: { type: Schema.Types.ObjectId, ref: "Book" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const genreSchema = new Schema({
  name: String,
});

const bookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  image: String,
  genres: [genreSchema],
  comments: [commentSchema],
});

const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema);
const Genre = mongoose.model("Genre", genreSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = { User, Book, Genre, Comment };
