var express = require('express'),
    util    = require('util');

var routes = function() {
  var router = express.Router();

  // CSV Test Creation Route
  router.post('/csv', function (req, res) {
      var filename = 'reminders.csv';
      var remindersCsv = 'Subject,Start Date,Description\r\n';
      var reminders = req.body.reminders;
      for (var i in reminders) {
        var newLine = util.format('%s,%s,%s\r\n',
                      reminders[i].subject,
                      reminders[i].startDate,
                      reminders[i].description);
        remindersCsv += newLine;
      }
      res.attachment(filename);
      res.end(remindersCsv, 'UTF-8');
    });
  return router;
};

module.exports = routes;
