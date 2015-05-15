(function(app) {
  'use strict';

  var mainCtrl = function ($scope, TestData, Utils) {
    $scope.data = TestData.get();
    $scope.reminders = [];
    $scope.dt = new Date();

    console.log(Utils.groupBy($scope.data, 'reminder'));

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
      $scope.reminders = [];

      for (var i = 0; i < $scope.data.length; i++) {
        var reminder = {};
        reminder.date = formatDate(calcDate($scope.data[i].reminder));
        reminder.fullName = $scope.data[i].fullName;
        reminder.message = parseVars($scope.data[i].message, $scope.schoolName, reminder.date);
        reminder.detail = parseVars($scope.data[i].detail, $scope.schoolName, reminder.date);
        $scope.reminders.push(reminder);
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
