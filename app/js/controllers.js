(function(app) {
  'use strict';

  var mainCtrl = function ($scope) {
    $scope.testData = 'Hello, World!';

    $scope.format = 'dd-MMMM-yyyy';
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

  app.controller('mainCtrl', ["$scope", mainCtrl]);
}(angular.module("app")));
