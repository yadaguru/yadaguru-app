/* global __dirname */
/* global process */
var port = process.env.PORT || 3000,
    path = require('path'),
    mongoose = require('mongoose');

module.exports = function() {
  var db;
  if (process.env.NODE_ENV == 'TEST') {
    console.log('** TEST **');
    db = mongoose.connect('mongodb://localhost/yadaguru_test');
  } else {
    console.log('** DEV **');
    db = mongoose.connect('mongodb://localhost/yadaguru');
  }
  var rootPath = path.join(__dirname, '..', '..');
  var clientPath = path.join(rootPath, 'client');
  return {
    port: port,
    rootPath: rootPath,
    clientPath: clientPath,
    db: db
  };
};
