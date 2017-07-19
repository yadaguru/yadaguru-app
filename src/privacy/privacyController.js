define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the privacy policy view
   */
  app.register.controller('PrivacyController', ['$scope', 'yg.services.api',
    function ($scope, yadaApi) {
      $scope.content = 'Loading';

      yadaApi.getOne('content_items', 'privacy', false).then(function(resp) {
        $scope.content = resp.data[0].content;
      }, function() {
        $scope.content = 'Error loading privacy policy.';
      });

      $scope.$parent.showAdd = false;

    }]);

});
