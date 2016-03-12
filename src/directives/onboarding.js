define(['app'], function (app) {

  'use strict';

  app.directive('onboarding', function () {
    return {
      restrict: 'E',
      templateUrl: 'dist/directives/onboarding.html',
      controller: [
        '$scope', '$rootScope', '$moment', 'yg.services.help', 'yg.services.api', '$cookies', 'yg.services.modal',
        function ($scope, $rootScope, $moment, helpService, yadaApi, $cookies, modalService) {

          var progressStep = 14;

          $scope.obStep = 1;
          $scope.obProgress = progressStep;
          $scope.minDate = $moment().toDate();
          $scope.initDate = $moment('20160201', 'YYYYMMDD').toDate();

          $scope.advanceOb = function (force) {
            if ($scope.obStep > 2 && !force) {
              return;
            }

            $scope.obStep++;
            $scope.obProgress += progressStep;
          };

          $scope.rewindOb = function (force) {
            if (!force)  {
              return;
            }
            $scope.obStep--;
            $scope.obProgress -= progressStep;
          };

          $scope.submitMobile = function() {
            var apiPromise = yadaApi.users.post({phone_number: $scope.phoneNumber});
            var modalMessage = {
              data: [{content: 'Check your device, we are sending you a code to get you setup.'}]
            };
            apiPromise.then(function(resp) {
              $scope.userId = resp.data[0].id;
              $cookies.put('yg-uid', $rootScope.userId);
              var modalPromise = modalService.showModal(modalMessage, 'I GOT IT', null, 'confirm-modal', 'Resend It');
              modalPromise.then(function() {
                $scope.advanceOb(true);
              })
            });
          };

          $scope.submitCodes = function() {
            var apiPromise = yadaApi.users.put($scope.userId, {
              confirm_code: $scope.confirmCode,
              personal_code: $scope.personalCode,
              sponsor_code: $scope.sponsorCode
            });
            apiPromise.then(function() {
              $scope.advanceOb(true);
            })
          };

          $scope.submitSchool = function () {
            var apiPromise = yadaApi.schools.post({
              name: $scope.schoolName,
              due_date: $scope.submissionDate
            }, $scope.userId);
            apiPromise.then(function(resp) {
              $scope.endOnboarding();
              $scope.$parent.showHints = true;
              $scope.$parent.processSchools(resp);
            });
          };

          $scope.endOnboarding = function () {
            $scope.$parent.endOnboarding();
          };

          $scope.faqModal = function (question) {
            helpService.getHelpMessage(question);
          };


        }]
    };
  });


});
