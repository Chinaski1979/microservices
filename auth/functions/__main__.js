const tokenSecret = process.env.SECRET_KEY;
const lib = require('lib');
const wePassLib = lib['wepass-services'];
/**
 * Login for admin
 * @param {string} email user email (don't provide if phoneNumber is being sent)
 * @param {string} phoneNumber user phone number (don't provide if email is being sent)
 * @param {string} password user password!
 * @returns {object}
 */
module.exports = async (email = '', phoneNumber = '', password) => {
  const searchBy = email.length ? {email} : {phoneNumber};
  const adminFound = await wePassLib.database['@dev'].read('users', searchBy, 'findOne');
  const passwordMatch = await wePassLib.auth['@dev'].validatePassword(password, adminFound.password);
  if (!passwordMatch) {
    throw new Error('Incorrect password, please try again.');
  }
  const tokenInfo = { userId : adminFound._id };
  // generate tokens
  const tokens = wePassLib.tokens['@dev'].issue('1d', '60d', tokenSecret, tokenInfo);
  return tokens;
};
