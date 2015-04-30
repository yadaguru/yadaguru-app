(function(app) {
  'use strict';

  var mainCtrl = function ($scope) {
    $scope.testData = 'Hello, World!';
  };

  app.controller('mainCtrl', ["$scope", mainCtrl]);
}(angular.module("app")));
