define(['app'], function(app) {

  'use strict';

  app.directive('onboarding', function() {
    return {
      restrict: 'E',
      templateUrl: 'dist/directives/onboarding.html',
      controller: ['$scope', '$moment', '$modal', function($scope, $moment, $modal) {

        var progressStep = 20;

        $scope.obStep = 1;
        $scope.obProgress = progressStep;
        $scope.minDate = $moment().toDate();
        $scope.initDate = $moment('20160201', 'YYYYMMDD').toDate();

        $scope.advanceOb = function() {
          if ($scope.obStep === 4) {
            if (!$scope.submissionDate) {
              return;
            }
            $scope.endOnboarding();
            $scope.addNewSchool($scope.schoolName, $scope.submissionDate);
            $scope.$parent.showHints = true;
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
          $scope.$parent.endOnboarding();
        };

        $scope.faqModal = function(question) {
          $modal.open({
            templateUrl: 'dist/school/faqModal.html',
            controller: 'FaqModalController',
            resolve: {
              question: function() {
                return question;
              }
            }
          });
        };

        $scope.addNewSchool = function(school, date) {
          //TODO code to POST to API, for now just adding to parent scope
          $scope.$parent.schools.push({
            'name': school,
            'dueDate': $moment(date).format('M/D/YYYY'),
            'isActive': true
          });
        };

      }]
    };
  });


});
