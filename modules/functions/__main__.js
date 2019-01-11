const lib = require('lib');
const wePassLib = lib['wepass-services'];
/**
* Get all modules in DB
* @returns {array}
*/
module.exports = async (context) => {
  const allModules = await wePassLib.database['@dev'].read({collection : 'modules'});
  return allModules;
};
