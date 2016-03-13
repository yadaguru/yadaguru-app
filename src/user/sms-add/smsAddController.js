define(['app'], function (app) {

  'use strict';

  /**
   * Controller for sms-add user subview
   */
  app.register.controller('SmsAddController', ['$scope', 'yg.services.user', '$state', '$modal', 'yg.services.api',
    function ($scope, userService, $state, $modal, yadaApi) {

      /**
       * Updates user with phone number and advances sms setup.
       */
      $scope.submitMobile = function () {
        yadaApi.users.put(userService.getCurrentUserId(), {
          phone_number: $scope.phoneNumber
        }).then(function() {
          $scope.phoneNumber = '';
          var modalInstance = $modal.open({
            templateUrl: 'sendCodeModal.html',
            controller: 'UserModalController'
          });
          modalInstance.result.then(function () {
            $state.go('user.codes-add');
          });
        });
      };

    }]);

});
