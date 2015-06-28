var express = require('express'),
    account = require('../account');

var routes = function() {
  var router = express.Router();
  
  router.post('/login', account.authenticate);
  
  router.post('/logout', function(req, res) {
    req.logout();
    res.sendStatus(200);
  });
  
  router.get('/currentUser', function(req, res) {
    if (req.user) {
      var user = req.user.toObject();
      delete user.salt;
      delete user.hashedPassword;
      delete user.__v;
      res.send({ success: true, user: user });  
    } else {
      res.send({ success: false });
    }        
  });
  
  return router;
};

module.exports = routes;