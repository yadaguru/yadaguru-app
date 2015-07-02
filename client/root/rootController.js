(function(app) {
  'use strict';

  var RootController = function ($scope, YadaAPI, Utils, ReminderService) {
    $scope.reminders = [];
    $scope.dt = new Date();

    $scope.getReminders = function(formData) {
      $scope.formData = formData;
      YadaAPI.reminders.get().then(populateReminders, function(err) {console.log(err);});
    };

    var populateReminders = function(resp) {
      var reminders = resp.data;
      reminders = ReminderService.flattenTimeframes(reminders).map(function(reminder) {
        reminder.date = ReminderService.calcDate(reminder.timeframes, $scope.formData.dt);
        return reminder;
      });
      $scope.reminders = reminders;
      YadaAPI.testDates.get().then(populateTestDates, function(err) {console.log(err);});

    };

    var populateTestDates = function(resp) {
      var reminders = $scope.reminders;
      var testDates = resp.data;
      testDates.forEach(function (testDate) {
        var date = new Date(testDate.registrationDate);
        date = date.toISOString();
        testDate.date = date;
        testDate.category = 'Tests';
        return testDate;
      });
      var allReminders = reminders.concat(testDates);
      allReminders.sort(function (a, b) {
        if (a.date > b.date) {
          return 1;
        }
        if (a.date < b.date) {
          return -1;
        }
        return 0;
      });
      var grouped = Utils.groupBy(allReminders, 'date');
      grouped.forEach(function(dateGroup) {
        dateGroup.members = (Utils.groupBy(dateGroup.members, 'category'));
      });
      console.log(grouped);
      //var schoolName = $scope.formData.schoolName;
      //var groupedReminders = (Utils.groupBy(data, 'timeframe'));
      //$scope.groups = [];
      //for (var i = 0; i < groupedReminders.length; i++) {
        //var group = {};
        //group.name = Utils.formatDate(Utils.calcDate(groupedReminders[i].name, $scope.formData.dt));
        //group.members = [];
        //for (var j = 0; j < groupedReminders[i].members.length; j++) {
          //var reminder = {};
          //var current = groupedReminders[i].members[j];
          //reminder.date = Utils.formatDate(Utils.calcDate(current.timeframe, $scope.formData.dt));
          //reminder.fullName = current.fullName;
          //reminder.message = Utils.parseVars(current.message, schoolName, reminder.date);
          //reminder.detail = Utils.parseVars(current.detail, schoolName, reminder.date);
          //group.members.push(reminder);
        //}
        //$scope.groups.push(group);
      //}
    };

    $scope.format = 'M/d/yyyy';
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.minDate = new Date();
  };

  app.controller('RootController', ['$scope', 'YadaAPI', 'Utils', 'ReminderService', RootController]);

}(angular.module('yg.root')));
