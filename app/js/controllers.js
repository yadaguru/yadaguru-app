(function() {
  'use strict';

  var app = angular.module('yadaguruApp', []);

  app.controller('mainCtrl', function ($scope) {
    $scope.testData = 'Hello, World!';
  });

})();
