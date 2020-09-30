import typeDefs from "./schema";
import resolvers from "./resolvers";

const { ApolloServer, gql } = require("apollo-server");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
