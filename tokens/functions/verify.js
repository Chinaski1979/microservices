const JWT = require('jsonwebtoken');
const _ = require('lodash');
/**
* Verify a token
* @param {string} token Token you want to validate
* @param {string} secret Secret with which it was signed
* @param {object} options Options. Optional. https://github.com/auth0/node-jsonwebtoken
* @returns {object}
*/
module.exports = (token, secret, options = {}, context, callback) => {
  JWT.verify(cleanToken(token), secret, options, (err, decoded) => {
    callback(err, decoded);
  });
};

function cleanToken (token) {
  return _.replace(token, 'Bearer ', '');
}
