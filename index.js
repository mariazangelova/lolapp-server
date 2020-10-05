const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");

require("dotenv").config();

const { ApolloServer } = require("apollo-server");

const run = async () => {
  try {
    console.log("Connecting...");
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log(e);
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: run(),
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
