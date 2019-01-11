const lib = require('lib');
const wePassLib = lib['wepass-services'];
/**
* Self registration for trail period
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
* @returns {object}
*
* @returns {any}
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
  context) => {
    const hashedPass = await wePassLib.auth['@dev'].hashPassword(password);
    const cleanParams = await wePassLib.utils['@dev'].omitNulls(context.params);
    const userDetails = Object.assign(cleanParams, { password : hashedPass, email : email.toLowerCase(), role : 'adminTrialPeriod', });
    const newUserResult = await wePassLib.database['@dev'].create('users', userDetails, 'insertOne');
    return newUserResult[0];
};
