(function(app) {

  'use strict';

  var AdminController = function($scope, $state) {

    $scope.$on('$stateChangeStart', function(e, toState) {
      $scope.currentTab = toState.url;
    });

    $scope.currentTab = '/reminders';
  };

  app.controller('AdminController', ['$scope', '$state', AdminController]);

}(angular.module('yg.admin.controllers', ['yg.admin.controllers.reminders',
                                          'yg.admin.controllers.test-dates',
                                          'yg.admin.controllers.faqs'])));
