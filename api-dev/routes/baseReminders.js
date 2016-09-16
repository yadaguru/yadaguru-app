var express = require('express');
var router = express.Router();
var baseReminder = require('../controllers/baseReminder');

/**
 * GET api/base_reminders
 *
 * Response:
 * [{
 *   "id": "1",
 *   "name": "Reminder Name",
 *   "message": "Reminder Message",
 *   "detail": "Reminder Detail",
 *   "lateMessage": "Late Reminder Message",
 *   "lateDetail": "Late Reminder Detail",
 *   "category": "category ID",
 *   "timeframes": ["timeframe ID", "timeframe ID", ...]
 * }, {...}]
 */
router.get('/', function(req, res, next) {

  baseReminder.getAll(res);

});

/**
 * GET api/base_reminders/{id}
 *
 * Response:
 * [{
 *   "id": "1",
 *   "name": "Reminder Name",
 *   "message": "Reminder Message",
 *   "detail": "Reminder Detail",
 *   "lateMessage": "Late Reminder Message",
 *   "lateDetail": "Late Reminder Detail",
 *   "category": "category ID",
 *   "timeframes": ["timeframe ID", "timeframe ID", ...]
 * }]
 */
router.get('/:id', function(req, res, next) {

  baseReminder.getOne(req.params.id, res);

});

/**
 * POST api/base_reminders
 *
 * Request data:
 * {
 *   "name": "Reminder Name",
 *   "message": "Reminder Message",
 *   "detail": "Reminder Detail",
 *   "lateMessage": "Late Reminder Message (optional)",
 *   "lateDetail": "Late Reminder Detail (optional)",
 *   "category": "category ID",
 *   "timeframes": ["timeframe ID", "timeframe ID", ...]
 * }
 *
 * Response:
 * [{
 *   "id": "1",
 *   "name": "Reminder Name",
 *   "message": "Reminder Message",
 *   "detail": "Reminder Detail",
 *   "lateMessage": "Late Reminder Message",
 *   "lateDetail": "Late Reminder Detail",
 *   "category": "category ID",
 *   "timeframes": ["timeframe ID", "timeframe ID", ...]
 * }, {...}]
 */
router.post('/', function(req, res, next) {

  baseReminder.create(req.body, res);

});

/**
 * PUT api/base_reminders/{id}
 *
 * Request data:
 * {
 *   "name": "Reminder Name",
 *   "message": "Reminder Message",
 *   "detail": "Reminder Detail",
 *   "lateMessage": "Late Reminder Message (optional)",
 *   "lateDetail": "Late Reminder Detail (optional)",
 *   "category": "category ID",
 *   "timeframes": ["timeframe ID", "timeframe ID", ...]
 * }
 *
 * Response:
 * [{
 *   "id": "1",
 *   "name": "Reminder Name",
 *   "message": "Reminder Message",
 *   "detail": "Reminder Detail",
 *   "lateMessage": "Late Reminder Message",
 *   "lateDetail": "Late Reminder Detail",
 *   "category": "category ID",
 *   "timeframes": ["timeframe ID", "timeframe ID", ...]
 * }, {...}]
 */
router.put('/:id', function(req, res, next) {

  baseReminder.update(req.params.id, req.body, res);

});

/**
 * DELETE api/base_reminders/{id}
 *
 * Response:
 * [{
 *   "id": "1",
 *   "name": "Reminder Name",
 *   "message": "Reminder Message",
 *   "detail": "Reminder Detail",
 *   "lateMessage": "Late Reminder Message",
 *   "lateDetail": "Late Reminder Detail",
 *   "category": "category ID",
 *   "timeframes": ["timeframe ID", "timeframe ID", ...]
 * }, {...}]
 */
router.delete('/:id', function(req, res, next) {

  baseReminder.delete(req.params.id, res);

});


module.exports = router;
