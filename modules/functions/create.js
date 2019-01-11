const lib = require('lib');
const wePassLib = lib['wepass-services'];
/**
* Creates a module
* @param {string} parentProperty Propery in which module is located
* @param {string} company Company _id that owns the unit
* @param {string} name Name of module
* @param {string} identifier Code or some sort of unique identifier
* @returns {any}
*/
module.exports = async (parentProperty, company, name = null, identifier, context) => {
  const cleanParams = await wePassLib.utils['@dev'].omitNulls(context.params);
  const token = await wePassLib.tokens['@dev'].verify(context.http.headers.authorization, tokenSecret);
  cleanParams.createdBy = token.userId;
  const newUnitResult = await wePassLib.database['@dev'].create('modules', cleanParams, 'insertOne');
  return newUnitResult[0];
};
