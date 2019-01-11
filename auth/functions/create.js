const lib = require('lib');
const wePassLib = lib['wepass-services'];
const roleTypes = ['user', 'guest', 'admin', 'superAdmin'];
/**
* Creates a user.
* @param {string} phoneNumber
* @param {string} firstName
* @param {string} lastName
* @param {string} documentID
* @param {string} email
* @param {string} vehiclePlate [optional]
* @param {string} password
* @param {string} profilePic [optional]
* @param {string} gender [optional]
* @param {array} modules [optional]
* @param {object} unit [optional]
* @param {object} company [optional]
* @param {string} role User role. [user, agent, admin, superAdmin] Defaults to "user"
* @returns {object}
*/
module.exports = async (
  phoneNumber = null,
  firstName,
  lastName,
  documentID = null,
  email,
  vehiclePlate = null,
  password,
  profilePic = null,
  gender = null,
  modules = null,
  unit = null,
  company = null,
  role = 'user',
  context) => {
  validateRole(role);
  const hashedPass = await wePassLib.auth['@dev'].hashPassword(password);
  const cleanParams = await wePassLib.utils['@dev'].omitNulls(context.params);
  const userDetails = Object.assign(cleanParams, { password : hashedPass, email : email.toLowerCase() });
  const newUserResult = await wePassLib.database['@dev'].create('users', userDetails, 'insertOne');
  return newUserResult[0];
};

function validateRole (role) {
  if (roleTypes.includes(role)) {
    return true;
  }
  throw new Error('Role type is invalid.');
}
