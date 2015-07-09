/* global __dirname */
/* global process */
var port = process.env.PORT || 3000,
    path = require('path');

module.exports = function() {
  console.log('** DEV **');
  var rootPath = path.join(__dirname, '..', '..');
  var clientPath = path.join(rootPath, 'client');
  return {
    port: port,
    rootPath: rootPath,
    clientPath: clientPath
  };
};
