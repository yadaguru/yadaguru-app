'use strict';
var models = require('../models/index');
var response = require('../lib/response');
var Timeframe = models.Timeframe;

var timeframe = {};

timeframe.responseFormat = {
  id: 'id',
  name: 'name',
  type: 'type',
  formula: 'formula'
};

/**
 * Gets all timeframes and generates HTTP response.
 * @param  {Object}  res  The express router response object.
 */
timeframe.getAll = function (res) {

  Timeframe.findAll()
    .then(response.getSuccessHandler(res, timeframe.responseFormat))
    .catch(response.getErrorHandler(res));

};

/**
 * Gets one timeframe and generates HTTP response.
 * @param  {Number}  id   The timeframe ID to get.
 * @param  {Object}  res  The express router response object.
 */
timeframe.getOne = function (id, res) {

  Timeframe.findAll({
      where: {id: id}
    })
    .then(response.getSuccessHandler(res, timeframe.responseFormat))
    .catch(response.getErrorHandler(res));

};

/**
 * Creates a new timeframe and generates HTTP response containing all timeframes.
 * @param  {Object}  data            The new timeframe.
 * @param  {string}  data.name       The timeframe name.
 * @param  {string}  data.type       Type of timeframe: 'relative', 'absolute', or 'now'
 * @param  {string}  [data.formula]  For 'absolute' type, a valid date string and for 'relative', a positive integer (ignored for 'now').
 * @param  {Object}  res             The express router response object.
 */
timeframe.create = function (data, res) {

  Timeframe.create({
    name: data.name,
    type: data.type,
    formula: data.formula
  })
    .then(timeframe._getAllCallback(res))
    .catch(response.getErrorHandler(res));

};

/**
 * Updates an existing timeframe and generates HTTP response containing all timeframes.
 * @param  {Number}  id              The timeframe ID to update.
 * @param  {Object}  data            The timeframe to update.
 * @param  {string}  data.name       The timeframe name.
 * @param  {string}  data.type       Type of timeframe: 'relative', 'absolute', or 'now'
 * @param  {string}  [data.formula]  For 'absolute' type, a valid date string and for 'relative', a positive integer (ignored for 'now').
 * @param  {Object}  res             The express router response object.
 */
timeframe.update = function (id, data, res) {

  Timeframe.update({
    name: data.name,
    type: data.type,
    formula: data.formula
  }, {
    where: {id: id},
    fields: Object.keys(data)
  })
    .then(timeframe._getAllCallback(res))
    .catch(response.getErrorHandler(res));

};

/**
 * Deletes an existing timeframe and generates HTTP response containing all timeframes.
 * @param  {Number}  id         The timeframe ID to update.
 * @param  {Object}  res        The express router response object.
 */
timeframe.delete = function (id, res) {

  Timeframe.destroy({
    where: {id: id}
  })
    .then(timeframe._getAllCallback(res))
    .catch(response.getErrorHandler(res));

};

/**
 * Callback function wrapper for getAll. Used by create/update/delete functions to return all
 * timeframes after the operation.
 * @param     res         The express router response object.
 * @returns   {Function}  The callback function.
 * @private
 */
timeframe._getAllCallback = function (res) {

  return function () {
    timeframe.getAll(res);
  }

};

module.exports = timeframe;