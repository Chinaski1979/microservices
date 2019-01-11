const objectID = require('mongodb').ObjectID;
/**
* Sets a document reference value (ObjectId)
* @param {string} referenceId Mongo document _id
* @returns {any}
*/
module.exports = (referenceId, context, callback) => {
  callback(null, JSON.parse(JSON.stringify(objectID(referenceId))));
};
