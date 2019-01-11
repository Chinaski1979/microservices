const lib = require('lib');
const wePassLib = lib['wepass-services'];
/**
 * Get all modules of a property
 * @param {string} parentProperty Mongo _id of the parent property
 * @returns {array}
 */
 module.exports = async (parentProperty, context) => {
   await wePassLib.tokens['@dev'].verify(context.http.headers.authorization, tokenSecret);
   const modules = await wePassLib.database['@dev'].read({collection : 'modules', query : { parentProperty }});
   return modules;
 };
