var express = require('express');
var router = express.Router();
var models = require('../models/index.js');
var Timeframe = models.Timeframe;

router.get('/', function(req, res, next) {

  Timeframe.findAll()
      .then(function(timeframes) {
        res.status(200);
        res.send(timeframes);
      });

});

router.get('/:id', function(req, res, next) {

  Timeframe.findAll({
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

  Timeframe.create({
    name: req.body.name,
    type: req.body.type,
    formula: req.body.formula
  }).then(function () {
    Timeframe.findAll().then(function (timeframes) {
      res.status(200);
      res.send(timeframes);
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

  Timeframe.update({
    name: req.body.name,
    type: req.body.type,
    formula: req.body.formula
  }, {
    where: {id: req.params.id},
    fields: Object.keys(req.body)
  }).then(function() {
    Timeframe.findAll().then(function(timeframes) {
      res.status(200).send(timeframes);
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

  Timeframe.destroy({
    where: {id: req.params.id}
  }).then(function() {
    Timeframe.findAll().then(function(timeframes) {
      res.status(200).send(timeframes);
    })
  }).catch(function(error) {
    res.status(500).send(error);
  });

});


module.exports = router;
