define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the sponsor-update user subview
   */
  app.register.controller('SponsorUpdateController', ['$scope', '$cookies', '$state', '$modal', 'yg.services.api',
    function ($scope, $cookies, $state, $modal, yadaAPI) {

      /**
       * Updates user sponsor code.
       */
      $scope.updateSponsorCode = function () {
        //TODO POST to submit sponsor code to server
        console.log('sponsorCode: ', $scope.sponsorCode);
        //TODO on success, show modal
        var modalInstance = $modal.open({
          templateUrl: 'sponsorUpdateCompletionModal.html',
          controller: 'UserModalController'
        });
        modalInstance.result.then(function() {
          $state.go('user');
        })
      };
    }]);

});
