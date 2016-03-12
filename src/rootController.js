define(['app'], function (app) {

  'use strict';

  app.controller('RootController', ['$scope', 'yg.services.help',
    function ($scope, helpService) {

      $scope.showHelp = function(view) {
        helpService.getHelpMessage('help-' + view);
      };

      $scope.$on('$stateChangeSuccess', function(event, toState) {

        $scope.currentState = toState.name;

      })

    }]);


});
