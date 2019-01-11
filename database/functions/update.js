const connect = require('./connect');
/**
* Updates documents in database
* @param {string} collection Name of collection
* @param {object} query Query selector
* @param {object} newData New document property/value pairs
* @param {string} updateMethod E.G. updateMany, updateOne(default)
* @param {boolean} upsert Create document if it doesn't exist. Defaults to `false`.
* @returns {any}
*/
module.exports = (collection, query, newData, updateMethod = 'updateOne', upsert = false, context, callback) => {
  connect((error, db) => {
    if (error) {
      callback(error);
    }
    db.collection(collection)[updateMethod](query, newData, { upsert }, (err, res) => {
      callback(err, JSON.parse(JSON.stringify(res)));
    });
  });
};
