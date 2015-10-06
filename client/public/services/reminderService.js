(function(app) {

  'use strict';

  var reminderService = function(Utils) {

    var reminderService = {};

    /**
     * Splits reminders with multiple timeframes up into separate reminders with one timeframe
     * Returns an array of objects.
     * @param {object[]} reminders - an array of reminder objects
     */
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

    /**
     * Generates a sortDate key on a reminder object
     * Returns an array of objects
     * @param {object[]} data - an array of reminder objects
     * @param {string} originKey - the timeframe key used to generate the sortdates
     * @param {date} date - a JavaScript date object representing the student-selected date
     */
    reminderService.generateSortDates = function(data, originKey, date, summerCutoffDate) {
      var getYear = function (currentDate, cutoff, offset) {
        offset = offset || 0;
        if (currentDate.getMonth() < cutoff) {
          return currentDate.getFullYear() - 1 + offset;
        }
        return currentDate.getFullYear() + offset;
      };

      return data.map(function(d) {
        var currentDate = new Date();
        var year, month, day;
        if (d[originKey].match(/^\d+$/)) {
          d.sortDate = reminderService.calcDate(d[originKey], date);
        } else if (d[originKey] === 'summer') {
          year = getYear(currentDate, 2);
          month = summerCutoffDate.month;
          day = summerCutoffDate.day;
          d.sortDate = new Date(year, month, day).toISOString();
        } else if (d[originKey] === 'none') {
          d.sortDate = '0';
        } else if (d[originKey] === 'may1') {
          year = getYear(currentDate, 6, 1);
          d.sortDate = new Date(year, 4, 1).toISOString();
        } else if (d[originKey] === 'jan1') {
          year = getYear(currentDate, 6, 1);
          d.sortDate = new Date(year, 0, 1).toISOString();
        } else {
          d.sortDate = d[originKey];
        }
        return d;
      });
    };

    /**
     * Generates reminder message objects
     * Returns an array of objects
     * @param {object[]} reminderData - an array of reminder objects
     * @param {string} school - the name of the school passed in by the user
     * @param {date} dueDate - a JavaScript date object representing the student-select due date
     * @param {date} currentDate - a JavaScript date object representing the current date
     * @param {string} testCategory - category used by test date reminders
     */
    reminderService.generateMessages = function(reminderData, school, dueDate, currentDate, testCategory) {
      var messages = [];
      reminderData.forEach(function(reminder) {
        var message = {};
        if (reminder.category === testCategory) {
          var registrationDate = new Date (reminder.registrationDate);
          var testDate = new Date (reminder.testDate);
          dueDate = new Date(dueDate);
          if (currentDate < registrationDate && testDate < dueDate) {
            message.category = reminder.category;
            message.date = 'By ' + Utils.formatDate(reminder.sortDate);
            message.name = 'Register for the ' + reminder.testType + ' test';
            var parseTestDateVar = {variable:'%TESTDATE%', value: Utils.formatDate(testDate)};
            var parseRegDateVar = {variable: '%REGDATE%', value: Utils.formatDate(registrationDate)};
            message.message = Utils.parseVars(reminder.message, parseTestDateVar, parseRegDateVar);
            message.detail = Utils.parseVars(reminder.detail, parseTestDateVar, parseRegDateVar);
            messages.push(message);
          }
        } else {
          var messageDate = new Date(reminder.sortDate);
          message.category = reminder.category;
          message.name = reminder.name;
          if (reminder.timeframes === 'none') {
            message.date = 'General Reminders';
          } else if (currentDate > messageDate) {
            message.date = 'Things to do Immediately';
          } else if (reminder.timeframes === 'summer') {
            message.date = 'Before the School Year Starts';
          } else {
            message.date = 'By ' + Utils.formatDate(reminder.sortDate);
          }
          var parseSchoolVar = {variable: '%SCHOOL%', value: school};
          var parseDateVar = {variable: '%DATE%', value: Utils.formatDate(reminder.sortDate)};
          if (currentDate < messageDate) {
            message.message = Utils.parseVars(reminder.message, parseSchoolVar, parseDateVar);
            message.detail = Utils.parseVars(reminder.detail, parseSchoolVar, parseDateVar);
          } else {
            message.message = Utils.parseVars(reminder.lateMessage, parseSchoolVar, parseDateVar);
            message.detail = Utils.parseVars(reminder.lateDetail, parseSchoolVar, parseDateVar);
          }
          messages.push(message);
        }
      });
      return messages;
    };

    /**
     * Calculates the date X amount of days before the due due
     * Returns a string representation of the calculated date
     * @param {number} timeframe - the number of dates before the due date
     * @param {date} date - a JavaScript date object representing the due date
     */
    reminderService.calcDate = function(timeframe, date) {
      var newDate = angular.copy(date);
      newDate.setDate(newDate.getDate() - timeframe);
      return newDate.toISOString();
    };

    return reminderService;

  };

  app.factory('ReminderService', ['Utils', reminderService]);

}(angular.module('yg.root.services.reminder', [])));
