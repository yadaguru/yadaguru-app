define(['app'], function(app) {

  'use strict';

  app.directive('onboarding', function() {
    return {
      restrict: 'E',
      templateUrl: 'dist/directives/onboarding.html',
      controller: ['$scope', function($scope) {

        var progressStep = 20;
        var maxSteps = 4;

        $scope.obStep = 1;
        $scope.obProgress = progressStep;

        $scope.advanceOb = function() {
          if ($scope.obStep >= maxSteps) {
            return;
          }
          if ($scope.obStep === 3 && !$scope.schoolName) {
            return;
          }
          $scope.obStep++;
          $scope.obProgress += progressStep;
        };

        $scope.rewindOb = function() {
          if ($scope.obStep === 1) {
            return;
          }
          $scope.obStep--;
          $scope.obProgress -= progressStep;
        };

        $scope.endOnboarding = function() {
          $scope.$parent.isOnboarding = false;
        };

      }]
    };
  });


});
