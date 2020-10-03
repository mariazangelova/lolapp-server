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
    login(password: String): User
  }
  type Mutation {
    signup(username: String!, password: String!): User!
  }
`;

module.exports = typeDefs;
