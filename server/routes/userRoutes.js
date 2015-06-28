var express  = require('express'),
    account  = require('../account'),
    mongoose = require('mongoose'),
    User     = mongoose.model('User');

var routes = function() {
  var router = express.Router();
  
  router.get('/', account.requiresRole('admin'), function(req, res) {
    User.find({}).exec(function(err, collection) {
      res.send(collection);
    });
  });
  
  return router;
};

module.exports = routes;