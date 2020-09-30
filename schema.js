const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    username: String
    password: String
  }
  type Query {
    users: [User]
  }
`;

module.exports = typeDefs;
