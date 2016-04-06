var express = require('express');
var router = express.Router();
var models = require('../models/index.js');
var BaseReminder = models.BaseReminder;
var utils = require('../lib/utils');

var responseMap = {
  id: 'id',
  name: 'name',
  message: 'message',
  detail: 'detail',
  lateMessage: 'lateMessage',
  lateDetail: 'lateDetail',
  category: 'CategoryId',
  timeframes: {value: 'Timeframes', mapper: function(el) { return el.get('id') }}
};

router.get('/', function(req, res, next) {

  BaseReminder.findAll({
    include: [{
      model: models.Timeframe,
      attributes: ['id']
    }]
  }).then(function(baseReminders) {
    baseReminders = utils.formatResponse(baseReminders, responseMap);
    res.status(200);
    res.send(baseReminders);
  });

});

router.get('/:id', function(req, res, next) {

  BaseReminder.findAll({
    where: {id: req.params.id},
    include: [{
      model: models.Timeframe,
      attributes: ['id']
    }]
  }).then(function(baseReminder) {
    baseReminder = utils.formatResponse(baseReminder, responseMap);
    res.status(200);
    res.send(baseReminder);
  }).catch(function(error) {
    res.status(500);
    res.send(error)
  });

});

router.post('/', function(req, res, next) {

  var newBaseReminder = BaseReminder.build({
    name: req.body.name,
    message: req.body.message,
    detail: req.body.detail,
    lateMessage: req.body.lateMessage,
    lateDetail: req.body.lateDetail,
    CategoryId: req.body.category
  });

  if (typeof req.body.timeframes === 'undefined' || req.body.timeframes.constructor !== Array || req.body.timeframes.length === 0) {
    res.status(400);
    res.send('timeframes is required and must be an array of timeframe IDs');
    return;
  }

  newBaseReminder.save().then(function () {
    newBaseReminder.setTimeframes(req.body.timeframes).then(function() {
      BaseReminder.findAll({
        include: [{
          model: models.Timeframe,
          attributes: ['id']
        }]
      }).then(function (baseReminders) {
        baseReminders = utils.formatResponse(baseReminders, responseMap);
        res.status(200);
        res.send(baseReminders);
      }).catch(function(error) {
        res.status(500);
        res.send(error)
      });
    }).catch(function(error) {
      res.status(500);
      res.send(error);
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

  var updateTimeframes = false;
  if (typeof req.body.timeframes !== 'undefined') {
    if (!Array.isArray(req.body.timeframes) || req.body.timeframes.length === 0) {
      res.status(400);
      res.send('timeframes must be an array of timeframe IDs');
      return;
    }
    updateTimeframes = true;
  }

  BaseReminder.findOne({where: {id: req.params.id}, include: [models.Timeframe]}).then(function(baseReminder) {

    baseReminder.set({
      name: req.body.name || baseReminder.get('name'),
      message: req.body.message || baseReminder.get('message'),
      detail: req.body.detail || baseReminder.get('detail'),
      lateMessage: req.body.lateMessage || baseReminder.get('lateMessage'),
      lateDetail: req.body.lateDetail || baseReminder.get('lateDetail'),
      CategoryId: req.body.category || baseReminder.get('CategoryId')
    });

    var timeframes = updateTimeframes ? req.body.timeframes : baseReminder.get('Timeframes');

    baseReminder.save().then(function() {
      baseReminder.setTimeframes(timeframes).then(function() {
        BaseReminder.findAll({
          include: [{
            model: models.Timeframe,
            attributes: ['id']
          }]
        }).then(function(baseReminders) {
          baseReminders = utils.formatResponse(baseReminders, responseMap);
          res.status(200);
          res.send(baseReminders);
        }).catch(function(error) {
          res.status(500).send(error);
        });
      }).catch(function(error) {
        res.status(500).send(error);
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
});

router.delete('/:id', function(req, res, next) {

  BaseReminder.destroy({
    where: {id: req.params.id}
  }).then(function() {
    BaseReminder.findAll({
      include: [{
        model: models.Timeframe,
        attributes: ['id']
      }]
    }).then(function(baseReminders) {
      baseReminders = utils.formatResponse(baseReminders, responseMap);
      res.status(200).send(baseReminders);
    })
  }).catch(function(error) {
    res.status(500).send(error);
  });

});


module.exports = router;
