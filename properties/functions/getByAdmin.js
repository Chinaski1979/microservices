const lib = require('lib');
const wePassLib = lib['wepass-services'];
const tokenSecret = process.env.SECRET_KEY;
/**
* Gets properties by Admin
* @returns {any}
*/
module.exports = async (context) => {
  const token = await wePassLib.tokens['@dev'].verify(context.http.headers.authorization, tokenSecret);
  const allProperties = await wePassLib.database['@dev'].read({collection : 'properties', query : {createdBy : token.userId}});
  return allProperties;
};
