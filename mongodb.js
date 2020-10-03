const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async () => {
  await client.connect();
  const db = client.db("lolapp");
  return db;
};
