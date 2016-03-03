define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the user subview for adding an SMS number.
   */
  app.register.controller('UserController', ['$scope', '$cookies', '$state',
    function ($scope, $cookies, $state) {

      /**
       * Updates user with phone number and advances sms setup.
       */
      $scope.submitMobile = function () {
        //TODO POST to submit number to server
        console.log('mobileNumber: ', $scope.mobileNumber);
        $scope.smsSetupStep = 2;
      };

      /**
       * Displays confirmation code message.
       */
      $scope.confirmCode = function () {
        $scope.smsSetupStep = 3;
      };

      /**
       * Updates the user with personal and sponsor code.
       */
      $scope.updateUser = function () {
        //TODO POST to create new user for number
        console.log('smsCode: ', $scope.smsCode);
        console.log('personalCode: ', $scope.personalCode);
        console.log('sponsorCode: ', $scope.sponsorCode);
        $scope.isCompletionModalVisible = true;
      };

      /**
       * Sets a cookie, indicating initial mobile setup has been completed.
       */
      $scope.endInitialMobileSetup = function () {
        $cookies.put('initialSmsSetupComplete', true);
      };

      $scope.editLoginCode = function () {
        $scope.smsSetupStep = 2;
        $scope.showInitialSetup = true;
      };

    }]);


});
