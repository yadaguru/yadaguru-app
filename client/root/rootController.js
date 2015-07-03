(function(app) {
  'use strict';

  var RootController = function ($scope, YadaAPI, Utils, ReminderService) {
    $scope.reminders = [];
    $scope.dt = new Date();
    var reminderData, 
        testDateData,
        allData,
        reminderMessages,
        groupedMessages;

    var getTestDateData = function() {
      YadaAPI.testDates.get().then(function(resp) {
        testDateData = resp.data;
        $scope.buildReminderList();
      }, function(err) {console.log(err);});
    };

    var getReminderData = function() {
      YadaAPI.reminders.get().then(function(resp) {
        reminderData = resp.data;
        getTestDateData();
      }, function(err) {console.log(err);});
    };

    $scope.getReminders = function(formData) {
      $scope.formData = formData;
      getReminderData();
    };

    $scope.buildReminderList = function() {
      var currentDate = new Date();
      reminderData = ReminderService.flattenTimeframes(reminderData);
      reminderData = ReminderService.generateSortDates(reminderData, 'timeframes', $scope.formData.dt);
      testDateData = ReminderService.generateSortDates(testDateData, 'registrationDate');
      testDateData = Utils.addKeyValue(testDateData, 'category', 'Testing');
      allData = reminderData.concat(testDateData);
      allData = Utils.sortBy(allData, 'sortDate');
      reminderMessages = ReminderService.generateMessages(allData, $scope.formData.schoolName, $scope.formData.dt, currentDate);
      groupedMessages = Utils.groupBy(reminderMessages, 'date');
      groupedMessages.forEach(function(dateGroup) {
        console.log(dateGroup.members);
        console.log(Utils.groupBy(dateGroup.members, 'category'));
        dateGroup.members = Utils.groupBy(dateGroup.members, 'category');
      });
      $scope.reminders = groupedMessages;

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
