define(['app'], function (app) {

  'use strict';

  app.directive('onboarding', function () {
    return {
      restrict: 'E',
      templateUrl: 'dist/directives/onboarding.html',
      controller: [
        '$scope', '$moment', 'yg.services.help', 'yg.services.api', 'yg.services.user', 'yg.services.modal', 'yg.services.auth',
        'yg.services.error',
        function ($scope, $moment, helpService, yadaApi, userService, modalService, authService, errorService) {

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
            var apiPromise = yadaApi.users.post({phoneNumber: $scope.phoneNumber});
            var modalMessage = modalService.makeModalMessage(
                'Check your device, we are sending you a code to get you setup.'
            );
            apiPromise.then(function(resp) {
              userService.setCurrentUserId(resp.data.userId);
              var modalPromise = modalService.showModal(modalMessage, {
                button: 'I GOT IT',
                cancel: 'Resend It',
                modalClass: 'confirm-modal'
              });
              modalPromise.then(function() {
                $scope.advanceOb(true);
              })
            });
          };

          $scope.submitCode = function() {
            var apiPromise = yadaApi.users.put(userService.getCurrentUserId(), {
              confirmCode: $scope.confirmCode
            });
            apiPromise.then(function(resp) {
              authService.saveUserToken(resp.data.token);
              $scope.advanceOb(true);
            })
          };

          $scope.submitSchool = function () {
            yadaApi.post('schools', {
              name: $scope.schoolName,
              dueDate: $scope.submissionDate,
              isActive: 'true'
            })
              .then(function(resp) {
                $scope.endOnboarding();
                $scope.parent.showHints = true;
                $scope.parent.processSchools(resp);
              })
              .catch(errorService.handleHttpError);
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
