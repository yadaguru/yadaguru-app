'use strict';
var models = require('../models/index');
var response = require('../lib/response');
var BaseReminder = models.BaseReminder;
var Timeframe = models.Timeframe;

var baseReminder = {};

baseReminder.responseFormat = {
  id: 'id',
  name: 'name',
  message: 'message',
  detail: 'detail',
  lateMessage: 'lateMessage',
  lateDetail: 'lateDetail',
  category: 'CategoryId',
  timeframes: {value: 'Timeframes', mapper: function(el) { return el.get('id') }}
};

/**
 * Gets all baseReminders and generates HTTP response.
 * @param  {Object}  res  The express router response object.
 */
baseReminder.getAll = function (res) {

  BaseReminder.findAll({
    include: [{
      model: Timeframe,
      attributes: ['id']
    }]
  })
    .then(response.getSuccessHandler(res, baseReminder.responseFormat))
    .catch(response.getErrorHandler(res));

};

/**
 * Gets one baseReminder and generates HTTP response.
 * @param  {Number}  id   The baseReminder ID to get.
 * @param  {Object}  res  The express router response object.
 */
baseReminder.getOne = function (id, res) {

  BaseReminder.findAll({
      where: {id: id},
      include: [{
        model: Timeframe,
        attributes: ['id']
      }]
    })
    .then(response.getSuccessHandler(res, baseReminder.responseFormat))
    .catch(response.getErrorHandler(res));

};

/**
 * Creates a new baseReminder and generates HTTP response containing all baseReminders.
 * @param  {Object}    data                The new baseReminder.
 * @param  {string}    data.name           The baseReminder name.
 * @param  {string}    data.message        The reminder message.
 * @param  {string}    data.detail         Detailed info for the reminder.
 * @param  {string}    [data.lateMessage]  Message for past-due reminders.
 * @param  {string}    [data.lateDetail]   Detailed info for past-due reminders.
 * @param  {number}    data.category       A valid category ID.
 * @param  {number[]}  data.timeframes     An array of valid timeframe IDs (must contain at least one).
 * @param  {Object}    res                 The express router response object.
 */
baseReminder.create = function (data, res) {

  if (!baseReminder._validateTimeframes(data.timeframes)) {
    res.status(400);
    res.send('timeframes is required and must be an array of timeframe IDs');
    return;
  }

  var newBaseReminder = BaseReminder.build({
    name: data.name,
    message: data.message,
    detail: data.detail,
    lateMessage: data.lateMessage,
    lateDetail: data.lateDetail,
    CategoryId: data.category
  });

  newBaseReminder.save()
    .then(baseReminder._setTimeframes(data.timeframes, res))
    .catch(response.getErrorHandler(res));

};

/**
 * Updates an existing baseReminder and generates HTTP response containing all baseReminders.
 * @param  {Number}    id                  The baseReminder ID to update.
 * @param  {Object}    data                The baseReminder data to update.
 * @param  {string}    data.name           The baseReminder name.
 * @param  {string}    data.message        The reminder message.
 * @param  {string}    data.detail         Detailed info for the reminder.
 * @param  {string}    [data.lateMessage]  Message for past-due reminders.
 * @param  {string}    [data.lateDetail]   Detailed info for past-due reminders.
 * @param  {number}    data.category       A valid category ID.
 * @param  {number[]}  data.timeframes     An array of valid timeframe IDs (must contain at least one).
 * @param  {Object}    res                 The express router response object.
 */
baseReminder.update = function (id, data, res) {

  var updateTimeframes = typeof data.timeframes !== 'undefined';

  if (updateTimeframes) {
    if (!baseReminder._validateTimeframes(data.timeframes)) {
      res.status(400);
      res.send('timeframes must be an array of timeframe IDs');
      return;
    }
  }

  BaseReminder.findOne({
    where: {
      id: id
    },
    include: [{
      model: Timeframe,
      attributes: ['id']
    }]
  })
    .then(baseReminder._updateFound(data, updateTimeframes, res))
    .catch(response.getErrorHandler(res));

};

/**
 * Deletes an existing baseReminder and generates HTTP response containing all baseReminders.
 * @param  {Number}  id         The baseReminder ID to delete.
 * @param  {Object}  res        The express router response object.
 */
baseReminder.delete = function (id, res) {

  BaseReminder.destroy({
    where: {id: id}
  })
    .then(baseReminder._getAllCallback(res))
    .catch(response.getErrorHandler(res));

};

/**
 * Callback function wrapper for getAll. Used by create/update/delete functions to return all
 * baseReminders after the operation.
 * @param     res         The express router response object.
 * @returns   {Function}  The callback function.
 * @private
 */
baseReminder._getAllCallback = function (res) {

  return function () {
    baseReminder.getAll(res);
  }

};

/**
 * Returns a callback function that sets timeframes on a new/updated baseReminder.
 *
 * @param    {number[]}  timeframes  An array of timeframes to set.
 * @param    {Object}    res         The express router response object.
 * @returns  {Function}
 * @private
 */
baseReminder._setTimeframes = function (timeframes, res) {

  return function (newBaseReminder) {
    newBaseReminder.setTimeframes(timeframes)
      .then(baseReminder._getAllCallback(res))
      .catch(response.getErrorHandler(res));
  }

};

/**
 * Returns a callback function that updates a found baseReminder.
 *
 * @param    {Object}    data              The data to update.
 * @param    {Boolean}   updateTimeframes  Whether timeframes will be updated.
 * @param    {Object}    res               The express router response object.
 * @returns  {Function}
 * @private
 */
baseReminder._updateFound = function (data, updateTimeframes, res) {

  return function(foundBaseReminder) {
    foundBaseReminder.set({
      name: data.name || foundBaseReminder.get('name'),
      message: data.message || foundBaseReminder.get('message'),
      detail: data.detail || foundBaseReminder.get('detail'),
      lateMessage: data.lateMessage || foundBaseReminder.get('lateMessage'),
      lateDetail: data.lateDetail || foundBaseReminder.get('lateDetail'),
      CategoryId: data.category || foundBaseReminder.get('CategoryId')
    });

    var timeframes = updateTimeframes ? data.timeframes : foundBaseReminder.get('Timeframes');

    foundBaseReminder.save()
      .then(baseReminder._setTimeframes(timeframes, res))
      .catch(response.getErrorHandler(res));
  }

};

/**
 * Returns true if timeframes is s valid. Valid timeframes must be an array of at least one number.
 *
 * @param    {Number[]}  timeframes  An array of timeframe IDs.
 * @returns  {boolean}
 * @private
 */
baseReminder._validateTimeframes = function(timeframes) {

  return typeof timeframes !== 'undefined' && timeframes.constructor === Array && timeframes.length > 0;

};

module.exports = baseReminder;