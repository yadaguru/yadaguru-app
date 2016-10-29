define(['app'], function (app) {

  'use strict';

  app.controller('RootController', ['$scope', 'yg.services.help', 'yg.services.auth', '$state',
    function ($scope, helpService, authService, $state) {

      $scope.showHelp = function() {
        helpService.getHelpMessage('help-' + $scope.currentState);
      };

      $scope.showPrint = false;

      $scope.logout = function() {
        authService.removeUserToken();
        $state.go('login');
      }

    }]
  );
});
