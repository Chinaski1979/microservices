const lib = require('lib');
const wePassLib = lib['wepass-services'];
/**
* Get all properties in DB
* @returns {array}
*/
module.exports = async (context) => {
  const allProperties = await wePassLib.database['@dev'].read({collection : 'properties'});
  return allProperties;
};
