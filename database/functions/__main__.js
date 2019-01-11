const connect = require('./connect');
const ObjectID = require('mongodb').ObjectID;
/**
* Performs any CRUD method with esteroids in the DB. If `find` is used and don't want a cursor but an array of docs, use `read` function.
* @param {string} collection The collection you want to query
* @param {string} collectionMethod It can be any CRUD method
* @param {object} query DB query operator [optional]
* @param {string} docId Mongo _id for find by id methods [optional]
* @param {object} populate {schema: <referenced schema>, field: <document field>}
* @returns {any}
*/
module.exports = (collection, collectionMethod, query = {}, docId = '', populate = {}, context, callback) => {
  connect((error, db) => {
    if (error) {
      callback(error);
    } else {
      const methods = {
        find,
        findByIdAndPopulate,
      };
      methods[collectionMethod](db, callback)(context.params);
    }
  });
};

function find (db, callback) {
  return function ({collection, query, collectionMethod}) {
    db.collection(collection)[collectionMethod](query, (err, res) => {
      callback(err, JSON.parse(JSON.stringify(res)));
    });
  };
}

function findByIdAndPopulate (db, callback) {
  return function ({collection, docId, populate}) {
    db.collection(collection).findOne({ _id : ObjectID(docId) }, (err, result) => {
      db.collection(populate.schema).findOne({ _id : ObjectID(result[populate.field]) }, (err, populateResult) => {
        result[populate.field] = populateResult;
        const response = result;
        callback(err, JSON.parse(JSON.stringify(response)));
      });
    });
  };
}
