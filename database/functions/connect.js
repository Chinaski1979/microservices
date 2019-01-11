const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
let cache = null;
/**
* Connects to MongoDB
* @returns {any}
*/
module.exports = (callback) => {
  // TODO: Consider using a pool size (poolSize) and db.isConnected()
  if (cache) {
    return callback(null, cache);
  }
  MongoClient.connect(uri, (error, client) => {
    if (error) {
      return callback(error);
    }
    const db = client.db(dbName);
    cache = db;
    return callback(null, db);
  });
};
