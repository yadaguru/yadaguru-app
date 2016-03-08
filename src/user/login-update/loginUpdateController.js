define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the login-update user subview
   */
  app.register.controller('LoginUpdateController', ['$scope', '$cookies', '$state', '$modal', 'yg.services.api',
    function ($scope, $cookies, $state, $modal, yadaApi) {

      /**
       * Shows the update login code send code modal.
       */
      $scope.showLoginUpdateSendCodeModal = function() {
        //TODO API call to send confirm code. On success, show modal
        var modalInstance = $modal.open({
          templateUrl: 'loginUpdateSendCodeModal.html',
          controller: 'UserModalController'
        });
        modalInstance.result.then(function() {
          $scope.isLoginUpdateFormVisible = true;
        });
      };

      /**
       * Updates user login code.
       */
      $scope.updateLoginCode = function () {
        //TODO POST to submit number to server
        console.log('smsCode: ', $scope.smsCode);
        console.log('personalCode: ', $scope.personalCode);
        //TODO on success, show modal
        var modalInstance = $modal.open({
          templateUrl: 'loginUpdateCompletionModal.html',
          controller: 'UserModalController'
        });
        modalInstance.result.then(function() {
          $state.go('user');
        })
      };

      $scope.showLoginUpdateSendCodeModal();

    }]);

});
