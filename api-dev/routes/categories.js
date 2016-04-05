var express = require('express');
var router = express.Router();
var models = require('../models/index.js');
var Category = models.Category;

router.get('/', function(req, res, next) {

  Category.findAll()
      .then(function(categories) {
        res.status(200);
        res.send(categories);
      });

});

router.get('/:id', function(req, res, next) {

  Category.findAll({
    where: {id: req.params.id}
  }).then(function(category) {
    res.status(200);
    res.send(category);
  }).catch(function(error) {
    res.status(500);
    res.send(error)
  });

});

router.post('/', function(req, res, next) {

  Category.create({
    name: req.body.name
  }).then(function () {
    Category.findAll().then(function (categories) {
      res.status(200);
      res.send(categories);
    });
  }).catch(function(error) {
    if (error.name === "SequelizeValidationError") {
      res.status(400);
    } else {
      res.status(500);
    }
    res.send(error);
  });

});

router.put('/:id', function(req, res, next) {

  Category.update({
    name: req.body.name
  }, {
    where: {id: req.params.id},
    fields: Object.keys(req.body)
  }).then(function() {
    Category.findAll().then(function(categories) {
      res.status(200).send(categories);
    });
  }).catch(function(error) {
    if (error.name === "SequelizeValidationError") {
      res.status(400);
    } else {
      res.status(500);
    }
    res.send(error);
  });

});

router.delete('/:id', function(req, res, next) {

  Category.destroy({
    where: {id: req.params.id}
  }).then(function() {
    Category.findAll().then(function(categories) {
      res.status(200).send(categories);
    })
  }).catch(function(error) {
    res.status(500).send(error);
  });

});


module.exports = router;
