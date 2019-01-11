const lib = require('lib');
const wePassLib = lib['wepass-services'];
/**
* Creates a new Unit
* @param {string} parentProperty Parent property
* @param {string} parentModule Parent module
* @param {string} company Company who owns the unit
* @param {string} identifier Code or some sort of unique identifier
* @returns {string}
*/
module.exports = async (parentProperty, parentModule, company, identifier, context, callback) => {
  const cleanParams = await wePassLib.utils['@dev'].omitNulls(context.params);
  await wePassLib.tokens['@dev'].verify(context.http.headers.authorization, tokenSecret);
  cleanParams.createdBy = token.userId;
  const newUnitResult = await wePassLib.database['@dev'].create('units', cleanParams, 'insertOne');
  return newUnitResult[0];
};
