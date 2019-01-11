const lib = require('lib');
const wePassLib = lib['wepass-services'];
const tokenSecret = process.env.SECRET_KEY;
/**
* Creates a new property
* @param {string} name Name
* @param {string} label Name [Optional]
* @param {string} address Address
* @param {string} city City [Optional]
* @param {string} state State/Province [Optional]
* @param {string} country Country. [Optional] Defaults to Costa Rica
* @param {object} coordinates {lat: 'string', long: 'string'}
* @param {string} company Company _id who owns the property
* @returns {any}
*/
module.exports = async (
  name,
  label = null,
  address,
  city = null,
  state = null,
  country = 'Costa Rica',
  coordinates = null,
  company = null,
  context) => {
  const cleanParams = await wePassLib.utils['@dev'].omitNulls(context.params);
  const token = await wePassLib.tokens['@dev'].verify(context.http.headers.token, tokenSecret);
  cleanParams.createdBy = token.userId;
  const newPropertyResult = await wePassLib.database['@dev'].create('properties', cleanParams, 'insertOne');
  return newPropertyResult[0];
};
