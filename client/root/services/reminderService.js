(function(app) {

  'use strict';

  var reminderService = function(Utils) {
    
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

    reminderService.generateSortDates = function(data, originKey, date) {
      return data.map(function(d) {
        if (d[originKey].match(/^\d+$/)) {
          d.sortDate = reminderService.calcDate(d[originKey], date);
        } else if (d[originKey] === 'summer') {
          var currentDate = new Date();
          var summerDate;
          if (currentDate.getMonth() >= 2) {
            summerDate = new Date(currentDate.getFullYear(), 7, 31).toISOString();
          } else {
            summerDate = new Date(currentDate.getFullYear() - 1, 7, 31).toISOString();
          }
          d.sortDate = summerDate;
        } else if (d[originKey] === 'none') {
          d.sortDate = '0';
        } else {
          d.sortDate = d[originKey];
        }
        return d;
      });
    };

    reminderService.generateMessages = function(reminderData, school, dueDate, currentDate) {
      var messages = [];
      reminderData.forEach(function(reminder) {
        var message = {};
        if (reminder.category === 'Testing') {
          var registrationDate = new Date (reminder.registrationDate);
          var testDate = new Date (reminder.testDate);
          dueDate = new Date(dueDate);
          if (currentDate < registrationDate && testDate < dueDate) {
            message.category = reminder.category;
            message.date = 'By ' + Utils.formatDate(reminder.sortDate);
            message.reminder = 'Register for the ' + reminder.testType + ' test';
            message.message = 'If you are planning on taking the ' + reminder.testType + ' test on ' +
              Utils.formatDate(reminder.testDate) + ', you must register by ' + Utils.formatDate(registrationDate) + '.';
            message.detail = 'Detailed message about registering for tests to go here';
            messages.push(message);
          }
        } else {
          var messageDate = new Date(reminder.sortDate);
          message.category = reminder.category;
          message.reminder = reminder.name;
          if (reminder.timeframes === 'none') {
            message.date = 'General Reminders';
          } else if (reminder.timeframes === 'summer') {
            message.date = 'Before the School Year Starts';
          } else {
            message.date = 'By ' + Utils.formatDate(reminder.sortDate);
          }
          if (currentDate < messageDate) {
            message.message = Utils.parseVars(reminder.message, school, reminder.sortDate);
            message.detail = Utils.parseVars(reminder.detail, school, reminder.sortDate);
          } else {
            message.message = Utils.parseVars(reminder.lateMessage, school, reminder.sortDate);
            message.detail = Utils.parseVars(reminder.lateDetail, school, reminder.sortDate);
          }
          messages.push(message);
        }
      });
      return messages;
    };

    reminderService.calcDate = function(timeframe, date) {
      var newDate = angular.copy(date);
      newDate.setDate(newDate.getDate() - timeframe);
      return newDate.toISOString();
    };

    return reminderService;

  };

  app.factory('ReminderService', ['Utils', reminderService]);

}(angular.module('yg.root.services.reminder', [])));
