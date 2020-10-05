const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }
  type Book {
    id: ID!
    title: String!
    author: String!
    description: String!
    image: String!
    genres: [Genre]
  }
  input GenreInput {
    name: String
  }
  type Genre {
    name: String!
  }
  type Query {
    users: [User]
    user(id: ID!): User
    books: [Book]
    genres: [Genre]
  }
  type Mutation {
    signup(username: String!, password: String!): User!
    login(username: String!, password: String!): String!
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
  }
`;

module.exports = typeDefs;
