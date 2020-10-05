const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    token: String!
  }
  type Query {
    users: [User]
    user(id: ID!): User
  }
  type Mutation {
    signup(username: String!, password: String!): User!
    login(username: String!, password: String!): String!
    removeUser(id: String!): String!
    updateUser(id: String!, username: String!, password: String!): String!
  }
`;

module.exports = typeDefs;
