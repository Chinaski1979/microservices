const bcrypt = require('bcrypt-nodejs');
/**
* Validates password with bcrypt
* @param {string} hash1 Token you want to validate
* @param {string} hash2 Secret with which it was signed
* @returns {boolean}
*/
module.exports = (hash1, hash2, context, callback) => {
  bcrypt.compare(hash1, hash2, (err, passed) => {
    callback(err, passed);
  });
};
