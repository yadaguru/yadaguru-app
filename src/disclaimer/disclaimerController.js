define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the disclaimer view
   */
  app.register.controller('DisclaimerController', ['$scope', 'yg.services.api',
    function ($scope, yadaApi) {
      $scope.content = 'Loading';

      yadaApi.getOne('content_items', 'disclaimer').then(function(resp) {
        $scope.content = resp.data[0].content;
      }, function() {
        $scope.content = 'Error loading disclaimer.';
      });

      $scope.$parent.showAdd = false;
      $scope.$parent.showPrint = false;

    }]);

});
