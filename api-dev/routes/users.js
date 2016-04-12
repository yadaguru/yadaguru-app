var express = require('express');
var router = express.Router();
var user = require('../controllers/user');

router.post('/', function(req, res, next) {

  user.login(req.body, res);

});

module.exports = router;
