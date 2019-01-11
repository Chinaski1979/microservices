const bcrypt = require('bcrypt-nodejs');
/**
* @param {string} password Passsword string you want to hash
* @returns {string}
*/
module.exports = (password, context, callback) => {
  bcrypt.hash(password, null, null, (err, hash) => {
    callback(err, hash);
  });
};
