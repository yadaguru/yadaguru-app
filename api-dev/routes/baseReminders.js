var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

var connectionString = 'postgres://yadaguru_api_dev:abcd1234@localhost:5432/yadaguru_api_dev';
var sequelizeOptions = {};
var sequelize = new Sequelize(connectionString, sequelizeOptions);
var BaseReminder = sequelize.import('../models/baseReminder');
var Category = sequelize.import('../models/category');
Category.hasMany(BaseReminder);
BaseReminder.belongsTo(Category);

var requiredParameters = ['name', 'message', 'detail', 'category'];
var missingParameters = [];

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {

  // check for missing parameters
  requiredParameters.forEach(function(param) {
    if (!req.body.hasOwnProperty(param)) {
      missingParameters.push(param);
    }
  });

  if (missingParameters.length !== 0) {
    res.status(400);
    var response = 'Missing parameters. The following parameters are not present: ';
    missingParameters.forEach(function(el, i, array) {
      response += array.pop() + ' ';
    });
    res.send(response);
    return;
  }

  console.log('#########Category:', req.body.category);
  BaseReminder
      .create({
        name: req.body.name,
        message: req.body.message,
        detail: req.body.detail,
        lateMessage: req.body.lateMessage,
        lateDetail: req.body.lateDetail,
        categoryId: 1
      })
      .then(function() {
        res.status(200);
        res.send('Saved successfully. Return some JSON here');
      })
      .catch(function(error) {
        res.status(500);
        res.send(error);
      });

});

module.exports = router;
