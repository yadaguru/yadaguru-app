'use strict';
var models = require('../models/index');
var response = require('../lib/response');
var Category = models.Category;

var category = {};

category.responseFormat = {
  id: 'id',
  name: 'name'
};

/**
 * Gets all categories and generates HTTP response.
 * @param  {Object}  res  The express router response object.
 */
category.getAll = function (res) {

  Category.findAll()
    .then(response.getSuccessHandler(res, category.responseFormat))
    .catch(response.getErrorHandler(res));

};

/**
 * Gets one category and generates HTTP response.
 * @param  {Number}  id   The category ID to get.
 * @param  {Object}  res  The express router response object.
 */
category.getOne = function (id, res) {

  Category.findAll({
      where: {id: id}
    })
    .then(response.getSuccessHandler(res, category.responseFormat))
    .catch(response.getErrorHandler(res));

};

/**
 * Creates a new category and generates HTTP response containing all categories.
 * @param  {Object}  data       The new category.
 * @param  {string}  data.name  The category name.
 * @param  {Object}  res        The express router response object.
 */
category.create = function (data, res) {

  Category.create({
    name: data.name
  })
    .then(category._getAllCallback(res))
    .catch(response.getErrorHandler(res));

};

/**
 * Updates an existing category and generates HTTP response containing all categories.
 * @param  {Number}  id         The category ID to update.
 * @param  {Object}  data       The new category.
 * @param  {string}  data.name  The category name.
 * @param  {Object}  res        The express router response object.
 */
category.update = function (id, data, res) {

  Category.update({
    name: data.name
  }, {
    where: {id: id},
    fields: Object.keys(data)
  })
    .then(category._getAllCallback(res))
    .catch(response.getErrorHandler(res));

};

/**
 * Deletes an existing category and generates HTTP response containing all categories.
 * @param  {Number}  id         The category ID to update.
 * @param  {Object}  res        The express router response object.
 */
category.delete = function (id, res) {

  Category.destroy({
    where: {id: id}
  })
    .then(category._getAllCallback(res))
    .catch(response.getErrorHandler(res));

};

/**
 * Callback function wrapper for getAll. Used by create/update/delete functions to return all
 * categories after the operation.
 * @param     res         The express router response object.
 * @returns   {Function}  The callback function.
 * @private
 */
category._getAllCallback = function (res) {

  return function () {
    category.getAll(res);
  }

};

module.exports = category;