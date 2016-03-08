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
        //TODO POST to submit number to server
        console.log('smsCode: ', $scope.smsCode);
        console.log('personalCode: ', $scope.personalCode);
        console.log('sponsorCode: ', $scope.sponsorCode);
        //TODO on success, show modal
        var modalInstance = $modal.open({
          templateUrl: 'smsCompletionModal.html',
          controller: 'UserModalController'
        });
        modalInstance.result.then(function() {
          $scope.endInitialMobileSetup();
          $state.go('school');
        })
      };

      /**
       * Sets a cookie, indicating initial mobile setup has been completed.
       */
      $scope.endInitialMobileSetup = function () {
        $cookies.put('yg-sms-set', true);
      };

    }]);

});
