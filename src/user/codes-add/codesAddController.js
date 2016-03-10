define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the codes-add user subview
   */
  app.register.controller('CodesAddController', ['$scope', '$cookies', '$state', '$modal', 'yg.services.api',
    function ($scope, $cookies, $state, $modal, yadaApi) {

      /**
       * Submits confirmation, login, and sponsor codes.
       */
      $scope.submitCodes = function () {
        yadaApi.users.put($scope.userId, {
          confirm_code: $scope.confirmCode,
          personal_code: $scope.personalCode,
          sponsor_code: $scope.sponsorCode
        }).then(function() {
          $scope.confirmCode = $scope.personalCode = $scope.sponsorCode = '';
          var modalInstance = $modal.open({
            templateUrl: 'smsCompletionModal.html',
            controller: 'UserModalController'
          });
          modalInstance.result.then(function() {
            $scope.endInitialMobileSetup();
            $state.go('school');
          })
        });
      };

      /**
       * Sets a cookie, indicating initial mobile setup has been completed.
       */
      $scope.endInitialMobileSetup = function () {
        $cookies.put('yg-sms-set', true);
      };

    }]);

});
