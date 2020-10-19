const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    comments: [Comment]
  }
  type Comment {
    comment: String!
  }
  type Book {
    id: ID!
    title: String!
    author: String!
    description: String!
    image: String!
    genres: [Genre]
    comments: [Comment]
  }
  input GenreInput {
    name: String
  }
  type Genre {
    name: String!
    book: String!
    username: String!
  }
  type Query {
    users: [User]
    user(id: ID!): User
    books: [Book]
    book(id: ID!): Book
    genres: [Genre]
    comments: [Comment]
  }
  type Mutation {
    signup(username: String!, password: String!): User!
    login(username: String!, password: String!): AuthPayload
    removeUser(id: String!): String!
    updateUser(id: String!, username: String!, password: String!): String!
    addBook(
      title: String!
      author: String
      description: String
      image: String
      genres: [GenreInput]
    ): Book!
    addGenre(name: String!): Genre!
    addGenreToBook(id: ID!, genres: [GenreInput]): Book!
    removeGenreToBook(id: ID!): Book!
    addComment(userId: ID!, bookId: ID!, comment: String!): Comment!
    removeComment(bookId: ID!): String
  }
  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports = typeDefs;
