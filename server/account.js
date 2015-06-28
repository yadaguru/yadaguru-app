var passport = require('passport');

exports.authenticate = function(req, res) {
  var auth = passport.authenticate('local', function (err, user) {
    if (err) { res.send(err); }
    if (!user) { res.send({ success: false }); }
    req.logIn(user, function (err) {
      if (err) { res.send(err); }
      user = user.toObject();
      delete user.salt;
      delete user.hashedPassword;
      delete user.__v;
      res.send({ success: true, user: user });
    });
  });
  auth(req, res);
};

exports.requiresApiRole = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.status(403);
    res.end();
  } else {
    next();
  }
};

exports.requiresRole = function(role) {
  return function(req, res, next) {
    if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  };
};