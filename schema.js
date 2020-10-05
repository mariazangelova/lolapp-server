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
  }
  type Query {
    users: [User]
    user(id: ID!): User
    books: [Book]
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
    ): Book!
  }
`;

module.exports = typeDefs;
