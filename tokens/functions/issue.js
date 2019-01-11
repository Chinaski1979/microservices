const JWT = require('jsonwebtoken');
const _ = require('lodash');
/**
* Issue user tokens
* @param {string} primaryExp Primary token expiration time
* @param {string} refreshExp Refresh token expiration time
* @param {string} tokenSecret Secret or private key
* @param {object} tokenContent Primary token expiration time
* @returns {object}
*/
module.exports = (primaryExp, refreshExp, tokenSecret, tokenContent, context, callback) => {
  const tokens = {
    token   : generateToken(tokenContent, primaryExp, tokenSecret),
    refresh : generateToken(_.assign(tokenContent, { type : 'refresh'}), refreshExp, tokenSecret),
  };
  callback(null, tokens);
};

function generateToken (payload, time, tokenSecret) {
  return JWT.sign(payload, tokenSecret, {
    expiresIn : time,
  });
}
