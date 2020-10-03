const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }
  type Query {
    users: [User]
    user(id: ID!): User
    login(username: String!, password: String!): String!
  }
  type Mutation {
    signup(username: String!, password: String!): User!
    removeUser(id: String!): String!
    updateUser(id: String!, username: String!, password: String!): String!
  }
`;

module.exports = typeDefs;
