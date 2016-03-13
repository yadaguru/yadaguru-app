define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the codes-add user subview
   */
  app.register.controller('CodesAddController', ['$scope', 'yg.services.user', '$state', '$modal', 'yg.services.api',
    function ($scope, userService, $state, $modal, yadaApi) {

      /**
       * Submits confirmation, login, and sponsor codes.
       */
      $scope.submitCodes = function () {
        yadaApi.users.put(userService.getCurrentUserId(), {
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
            $state.go('school');
          })
        });
      };

    }]);

});
