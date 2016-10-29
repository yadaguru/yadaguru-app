define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the sponsor-update user subview
   */
  app.register.controller('SponsorUpdateController', ['$scope', '$cookies', '$state', '$modal', 'yg.services.api', 'yg.services.error',
    function ($scope, $cookies, $state, $modal, yadaApi, errorService) {

      /**
       * Updates user sponsor code.
       */
      $scope.updateSponsorCode = function () {
        yadaApi.put('users', $scope.userId, {
          sponsorCode: $scope.sponsorCode
        }).then(function() {
          $scope.sponsorCode = '';
          var modalInstance = $modal.open({
            templateUrl: 'sponsorUpdateCompletionModal.html',
            controller: 'UserModalController'
          });
          modalInstance.result.then(function() {
            $state.go('user');
          })
        }).catch(errorService.handleHttpError);
      };

    }]);

});
