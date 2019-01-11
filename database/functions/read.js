const connect = require('./connect');
/**
* Read from database. If you want a cursor returned, use the __main__ (default) function
* @param {string} collection The collection you want to query
* @param {object} query DB query operator
* @param {string} collectionMethod Default if not provided: find
* @returns {any}
*/
module.exports = (collection, query = {}, collectionMethod = 'find', context, callback) => {
  connect((error, db) => {
    if (error) return callback(error);
    db.collection(collection)[collectionMethod](query, (err, result) => {
      // if find returns a MongoDB cursor that needs to be turned into an array
      if (collectionMethod === 'find') {
        convertToArray(result, callback);
      } else {
        callback(err, JSON.parse(JSON.stringify(result)));
      }
    });
  });
};

function convertToArray (cursor, callback) {
  cursor.toArray((err, docs) => {
    callback(err, JSON.parse(JSON.stringify(docs)));
  });
}
