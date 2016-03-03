define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the user subview for adding an SMS number.
   */
  app.register.controller('SmsAddController', ['$scope', '$modal', '$state',
    function ($scope, $modal, $state) {

      /**
       * Updates user with phone number and advances sms setup.
       */
      $scope.submitMobile = function () {
        //TODO POST to submit number to server
        console.log('mobileNumber: ', $scope.mobileNumber);
        var modalInstance = $modal.open({
          templateUrl: 'sendCodeModal.html',
          controller: 'SendCodeModalController'
        });
        modalInstance.result.then(function() {
          $state.go('user.codes-add');
        })
      };


      /**
       * Displays confirmation code message.
       */
      $scope.confirmCode = function () {
        $scope.smsSetupStep = 3;
      };


    }]);

  /**
   * Controller for the send code modal.
   */
  app.register.controller('SendCodeModalController', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {

      $scope.ok = function() {
        $modalInstance.close();
      }

    }]);

});
