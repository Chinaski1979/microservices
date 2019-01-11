const connect = require('./connect');
/**
* Create a new record in database
* @param {string} collection Name of collection where you want a new insertion
* @param {any} insertion Document(s) to be inserted. It can be Object or Array
* @param {string} writeMethod E.G. inserMany, insertOne(default)
* @returns {any}
*/
module.exports = (collection, insertion, writeMethod = 'insertOne', context, callback) => {
  connect((error, db) => {
    if (error) {
      callback(error);
    }
    db.collection(collection)[writeMethod](insertion, (err, res) => {
      callback(err, JSON.parse(JSON.stringify(res.ops)));
    });
  });
};
