var express = require('express');
var router = express.Router();
var category = require('../controllers/category');

/**
 * GET api/categories
 *
 * Response:
 * [{
 *   "id": "1",
 *   "name": "Category Name"
 * }, {...}]
 */
router.get('/', function(req, res, next) {

  category.getAll(res);

});

/**
 * GET api/categories/{id}
 *
 * Response:
 * [{
 *   "id": "1",
 *   "name": "Category Name"
 * }]
 */
router.get('/:id', function(req, res, next) {

  category.getOne(req.params.id, res);

});

/**
 * POST api/categories
 *
 * Request data:
 * {
 *   "name": "Category Name (required)"
 * }
 *
 * Response:
 * [{
 *   "id": "1",
 *   "name": "Category Name"
 * }, {...}]
 */
router.post('/', function(req, res, next) {

  category.create(req.body, res);

});

/**
 * PUT api/categories/{id}
 *
 * Request data:
 * {
 *   "name": "Category Name (required)"
 * }
 *
 * Response:
 * [{
 *   "id": "1",
 *   "name": "Category Name"
 * }, {...}]
 */
router.put('/:id', function(req, res, next) {

  category.update(req.params.id, req.body, res);

});

/**
 * DELETE api/categories/{id}
 *
 * Response:
 * [{
 *   "id": "1",
 *   "name": "Category Name"
 * }, {...}]
 */
router.delete('/:id', function(req, res, next) {

  category.delete(req.params.id, res);

});

module.exports = router;
