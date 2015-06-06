(function(app) {
  'use strict';

  var mainCtrl = function ($scope, YadaAPI, Utils) {
    $scope.reminders = [];
    $scope.dt = new Date();

    $scope.getReminders = function(formData) {
      $scope.formData = formData;
      YadaAPI.reminders.get().then(populate, function(err) {console.log(err);});
    };

    var populate = function(resp) {
      console.log(resp);
      var parseVars = function(string, school, date) {
        var replacements = {'%SCHOOL%': school, '%DATE%': date};
        string = string.replace(/%\w+%/g, function(all) {
          return replacements[all] || all;
        });
        return string;
      };

      var calcDate = function(timeframe) {
        var date = angular.copy($scope.formData.dt);
        date.setDate(date.getDate() - timeframe);
        return date;
      };

      var formatDate = function(date) {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();

        return m + '/' + d + '/' + y;
      };

      var data = resp.data;
      var schoolName = $scope.formData.schoolName;
      var groupedReminders = (Utils.groupBy(data, 'timeframe'));
      $scope.groups = [];
      for (var i = 0; i < groupedReminders.length; i++) {
        var group = {};
        group.name = formatDate(calcDate(groupedReminders[i].name));
        group.members = [];
        for (var j = 0; j < groupedReminders[i].members.length; j++) {
          var reminder = {};
          var current = groupedReminders[i].members[j];
          reminder.date = formatDate(calcDate(current.timeframe));
          reminder.fullName = current.fullName;
          reminder.message = parseVars(current.message, schoolName, reminder.date);
          reminder.detail = parseVars(current.detail, schoolName, reminder.date);
          group.members.push(reminder);
        }
        $scope.groups.push(group);
      }

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

  var adminCtrl = function($scope, YadaAPI) {
    $scope.test = 'test data';
    
    $scope.getReminders = function() {
      YadaAPI.reminders.get().then(populate, function(err) {console.log(err);});

      function populate(resp) {
        var data = resp.data;
        var reminders = [];
        for (var i = 0; i < data.length; i++) {
          var reminder = {};
          var current = data[i];
          reminder.name = current.name;
          reminder.message = current.message;
          reminder.detail = current.detail;
          reminder.lateMessage = current.lateMessage;
          reminder.lateDetail = current.lateDetail;
          reminder.timeframe = current.timeframe;
          reminders.push(reminder);
        }
        $scope.reminders = reminders;
      }
    }();
  };

  app.controller('mainCtrl', ['$scope', 'YadaAPI', 'Utils', mainCtrl]);
  app.controller('adminCtrl', ['$scope', 'YadaAPI',  adminCtrl]);
}(angular.module("yadaApp")));
