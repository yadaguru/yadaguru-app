define(['app'], function (app) {

  'use strict';

  app.directive('onboarding', function () {
    return {
      restrict: 'E',
      templateUrl: 'dist/directives/onboarding.html',
      controller: [
        '$scope', '$rootScope', '$moment', '$modal', 'yg.services.api', '$cookies',
        function ($scope, $rootScope, $moment, $modal, YadaAPI, $cookies) {

          var progressStep = 20;

          $scope.obStep = 1;
          $scope.obProgress = progressStep;
          $scope.minDate = $moment().toDate();
          $scope.initDate = $moment('20160201', 'YYYYMMDD').toDate();

          $scope.advanceOb = function () {
            if ($scope.obStep === 4) {
              if (!$scope.submissionDate) {
                return;
              }
              $scope.registerNewUser().then(function() {
                $scope.endOnboarding();
                $scope.$parent.showHints = true;
              });
            }

            if ($scope.obStep === 3 && !$scope.schoolName) {
              return;
            }
            $scope.obStep++;
            $scope.obProgress += progressStep;
          };

          $scope.rewindOb = function () {
            if ($scope.obStep === 1) {
              return;
            }
            $scope.obStep--;
            $scope.obProgress -= progressStep;
          };

          $scope.endOnboarding = function () {
            $scope.$parent.endOnboarding();
          };

          $scope.faqModal = function (question) {
            $modal.open({
              templateUrl: 'faqModal.html',
              controller: 'FaqModalController',
              resolve: {
                question: function () {
                  return question;
                }
              }
            });
          };

          $scope.registerNewUser = function () {
            return $scope.addNewUser().then($scope.addNewSchool);
          };

          $scope.addNewUser = function () {
            return YadaAPI.users.post();
          };

          $scope.addNewSchool = function (res) {
            $rootScope.user_id = res.data[0].id;
            $cookies.put('yg-uid', $rootScope.user_id);
            return YadaAPI.schools.post({
              name: $scope.schoolName,
              due_date: $scope.submissionDate
            }, $rootScope.user_id).then($scope.$parent.processSchools);
          };

        }]
    };
  });


});
