define(['app'], function(app) {

  'use strict';

  var AdminController = function($scope) {

    $scope.$on('$stateChangeStart', function(e, toState) {
      $scope.currentTab = toState.url;
    });

    $scope.currentTab = '/';
  };

  app.register.controller('AdminController', ['$scope', AdminController]);

});
