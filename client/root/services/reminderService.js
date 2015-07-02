(function(app) {

  'use strict';

  var reminderService = function() {
    
    var reminderService = {};

    reminderService.flattenTimeframes = function (reminders) {
      var flattenedReminders = [];
      reminders.forEach(function (reminder) {
        if (reminder.timeframes.length === 1) {
          reminder.timeframes = reminder.timeframes[0];
          flattenedReminders.push(reminder);
        } else {
          reminder.timeframes.forEach(function (timeframe) {
            var newReminder = angular.copy(reminder);
            newReminder.timeframes = timeframe;
            flattenedReminders.push(newReminder);
          });
        }
      });
      return flattenedReminders;
    };

    return reminderService;

  };

  app.factory('ReminderService', [reminderService]);

}(angular.module('yg.root.services.reminder', [])));
