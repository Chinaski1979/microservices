const _ = require('lodash');
/**
* Removes null values from an object.
* @returns {object}
*/
module.exports = (context, callback) => {
  callback(null, _.omitBy(context.params, _.isNull));
};
