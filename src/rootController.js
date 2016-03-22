define(['app'], function (app) {

  'use strict';

  app.controller('RootController', ['$scope', 'yg.services.help', 'yg.services.api', 'yg.services.user', '$state',
    function ($scope, helpService, yadaApi, userService, $state) {

      $scope.showHelp = function(view) {
        helpService.getHelpMessage('help-' + view);
      };

      $scope.logout = function() {
        yadaApi.logout({user_id: userService.getCurrentUserId()}).then(function() {
          $state.go('login');
        });
      };

      $scope.$on('$stateChangeSuccess', function(event, toState) {

        $scope.currentState = toState.name;

      });

      $scope.showPrint = false;

    }]);


});
