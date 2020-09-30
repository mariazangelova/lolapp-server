const { gql } = require("apollo-server");

export const typeDefs = gql`
  type User {
    username: String
    password: String
  }
  type Query {
    users: [User]
  }
`;
