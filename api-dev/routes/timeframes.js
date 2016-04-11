var express = require('express');
var router = express.Router();
var timeframe = require('../controllers/timeframe');

/**
 * GET api/timeframes
 *
 * Response:
 * [{
 *   "id": "1",
 *   "name": "Timeframe Name"
 *   "type": "'absolute', 'relative', or 'now'"
 *   "formula": "a date string, a positive integer, or null"
 * }, {...}]
 */
router.get('/', function(req, res, next) {

  timeframe.getAll(res);

});

/**
 * GET api/timeframes/{id}
 *
 * Response:
 * [{
 *   "id": "1",
 *   "name": "Timeframe Name"
 *   "type": "'absolute', 'relative', or 'now'"
 *   "formula": "a date string, a positive integer, or null"
 * }]
 */
router.get('/:id', function(req, res, next) {

  timeframe.getOne(req.params.id, res);

});

/**
 * POST api/timeframes/
 *
 * Request data:
 * {
 *   "name": "Timeframe Name (required)"
 *   "type": "'absolute', 'relative', or 'now' (required)"
 *   "formula": "a date string required for 'absolute' type, a positive integer required for 'relative' type, now required for 'now"
 * }
 *
 * Response:
 * [{
 *   "id": "1",
 *   "name": "Timeframe Name"
 *   "type": "'absolute', 'relative', or 'now'"
 *   "formula": "a date string, a positive integer, or null"
 * }, {...}]
 */
router.post('/', function(req, res, next) {

  timeframe.create(req.body, res);

});

/**
 * POST api/timeframes
 *
 * Request data:
 * {
 *   "name": "Timeframe Name (required)"
 *   "type": "'absolute', 'relative', or 'now' (required)"
 *   "formula": "a date string required for 'absolute' type, a positive integer required for 'relative' type, now required for 'now"
 * }
 *
 * Response:
 * [{
 *   "id": "1",
 *   "name": "Timeframe Name"
 *   "type": "'absolute', 'relative', or 'now'"
 *   "formula": "a date string, a positive integer, or null"
 * }, {...}]
 */
router.put('/:id', function(req, res, next) {

  timeframe.update(req.params.id, req.body, res);

});

/**
 * DELETE api/timeframes/{id}
 *
 * Response:
 * [{
 *   "id": "1",
 *   "name": "Timeframe Name"
 *   "type": "'absolute', 'relative', or 'now'"
 *   "formula": "a date string, a positive integer, or null"
 * }, {...}]
 */
router.delete('/:id', function(req, res, next) {

  timeframe.delete(req.params.id, res);

});


module.exports = router;
