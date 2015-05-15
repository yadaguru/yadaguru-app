(function(app) {
  'use strict';

  var mainCtrl = function ($scope, TestData, Utils) {
    $scope.data = TestData.get();
    $scope.reminders = [];
    $scope.dt = new Date();

    $scope.populate = function(formData) {
      var parseVars = function(string, school, date) {
        var replacements = {'%SCHOOL%': school, '%DATE%': date};
        string = string.replace(/%\w+%/g, function(all) {
          return replacements[all] || all;
        });
        return string;
      };

      var calcDate = function(reminder) {
        var date = angular.copy($scope.dt);
        date.setDate(date.getDate() - reminder);
        return date;
      };

      var formatDate = function(date) {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();

        return m + '/' + d + '/' + y;
      };

      $scope.schoolName = formData.schoolName;
      $scope.dt = formData.dt;
      $scope.groupedReminders = (Utils.groupBy($scope.data, 'formula'));
      $scope.groups = [];
      for (var i = 0; i < $scope.groupedReminders.length; i++) {
        var group = {};
        group.name = formatDate(calcDate($scope.groupedReminders[i].name));
        group.members = [];
        for (var j = 0; j < $scope.groupedReminders[i].members.length; j++) {
          var reminder = {};
          var current = $scope.groupedReminders[i].members[j];
          reminder.date = formatDate(calcDate(current.formula));
          reminder.fullName = current.fullName;
          reminder.message = parseVars(current.message, $scope.schoolName, reminder.date);
          reminder.detail = parseVars(current.detail, $scope.schoolName, reminder.date);
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

  app.controller('mainCtrl', ['$scope', 'TestData', 'Utils', mainCtrl]);
}(angular.module("yadaApp")));
