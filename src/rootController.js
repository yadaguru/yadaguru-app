define(['app'], function (app) {

  'use strict';

  app.controller('RootController', [
    '$scope', 
    'yg.services.help', 
    'yg.services.auth', 
    '$state',
    'yg.services.modal',
    '$q',
    function ($scope, helpService, authService, $state, modalService, $q) {

      $scope.showHelp = function() {
        helpService.getHelpMessage('help-' + $scope.currentState);
      };

      $scope.logout = function() {
        authService.removeUserToken();
        $state.go('login');
      }

      $scope.showBugReportModal = function showBugReportModal() {
        var textPromise = $q.resolve({data: [{
          content: 'Wanna squash a bug?<br>Got a cool idea for us?'
        }]});
        modalService.showModal(
          textPromise,
          {
            button: 'email us',
            cancel: 'maybe later',
          }
        )
          .then(function() {
            window.location = "mailto:yadaguru@gmail.com"
          });
      };

    }
  ]);
});
