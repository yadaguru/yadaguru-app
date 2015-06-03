var express  = require('express'),
    passport = require('passport');

var routes = function() {
  var router = express.Router();
  
  // CSV Test Creation Route
  router.post('/login', function (req, res) {
      var auth = passport.authenticate('local', function(err, user) {
        if(err) { res.send(err); }
        if(!user) { res.send({ success:false }); }
        req.logIn(user, function(err) {
          if(err) { res.send(err); }
          user = user.toObject();
          delete user.salt;
          delete user.hashed_pwd;
          res.send({ success: true, user: user });
        });
      });
      auth(req, res);
  });
  return router;
};

module.exports = routes;