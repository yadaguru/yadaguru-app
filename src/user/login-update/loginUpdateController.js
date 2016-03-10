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
        yadaApi.users.put($scope.userId, {}).then(function() {
          var modalInstance = $modal.open({
            templateUrl: 'loginUpdateSendCodeModal.html',
            controller: 'UserModalController'
          });
          modalInstance.result.then(function() {
            $scope.isLoginUpdateFormVisible = true;
          });
        });
      };

      /**
       * Updates user login code.
       */
      $scope.updateLoginCode = function () {
        yadaApi.users.put($scope.userId, {
          confirm_code: $scope.confirmCode,
          personal_code: $scope.personalCode
        }).then(function() {
          $scope.confirmCode = '';
          $scope.personalCode = '';
          var modalInstance = $modal.open({
            templateUrl: 'loginUpdateCompletionModal.html',
            controller: 'UserModalController'
          });
          modalInstance.result.then(function() {
            $state.go('user');
          })
        });
      };

      $scope.showLoginUpdateSendCodeModal();

    }]);

});
