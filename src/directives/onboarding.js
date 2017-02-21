define(['app'], function (app) {

  'use strict';

  app.directive('onboarding', function () {
    return {
      restrict: 'E',
      templateUrl: 'dist/directives/onboarding.html',
      controller: [
        '$scope', '$moment', 'yg.services.help', 'yg.services.api', 'yg.services.modal', 'localStorageService',
        'yg.services.error', 'yg.services.auth',
        function ($scope, $moment, helpService, yadaApi, modalService, localStorage, errorService, authService) {

          var progressStep = 14;
          var showNextButtonOnSteps = [2, 3, 4, 5, 6];
          var showBackButtonOnSteps = [2, 3, 4, 6];

          $scope.obStep = 1;
          $scope.obProgress = progressStep;
          $scope.minDate = $moment().toDate();
          $scope.initDate = $moment('20160201', 'YYYYMMDD').toDate();

          $scope.isNextButtonVisible = function() {
            return showNextButtonOnSteps.indexOf($scope.obStep) > -1;
          }

          $scope.isBackButtonVisible = function() {
            return showBackButtonOnSteps.indexOf($scope.obStep) > -1;
          }

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
            var apiPromise = yadaApi.post('users', {phoneNumber: $scope.phoneNumber});
            var modalMessage = modalService.makeModalMessage(
                'Check your device, we are sending you a code to get you setup.'
            );
            apiPromise.then(function(resp) {
              localStorage.set('uid', resp.data.userId);
              $scope.userId = resp.data.userId;
              if (resp.data.hasOwnProperty('confirmCode')) {
                console.log('#### CONFIRM CODE: ' + resp.data.confirmCode +' ####'); // for dev environments
              }
              var modalPromise = modalService.showModal(modalMessage, {
                button: 'I GOT IT',
                cancel: 'Resend It',
                modalClass: 'confirm-modal'
              });
              modalPromise.then(function() {
                $scope.advanceOb(true);
              })
            }).catch(errorService.handleHttpError);
          };

          $scope.submitCode = function() {
            var apiPromise = yadaApi.put('users', $scope.userId, {
              confirmCode: $scope.confirmCode
            });
            $scope.confirmCode = null;
            apiPromise.then(function(resp) {
              authService.saveUserToken(resp.data.token);
              $scope.advanceOb(true);
            }).catch(errorService.getConfirmCodeErrorHandler(
              handleConfirmErrorButtonClick,
              handleConfirmErrorCancelClick
            ));
          };

          $scope.submitSchool = function () {
            yadaApi.post('schools', {
              name: $scope.schoolName,
              dueDate: $scope.submissionDate,
              isActive: 'true'
            })
              .then(function(resp) {
                $scope.advanceOb(true);
              })
              .catch(errorService.handleHttpError);
          };

          $scope.endOnboarding = function () {
            $scope.$parent.getSchools().then(function() {
              $scope.$parent.endOnboarding();
            }).catch(errorService.handleHttpError);
          };

          $scope.faqModal = function (question) {
            helpService.getHelpMessage(question);
          };

          function handleConfirmErrorButtonClick($modalInstance) {
            $modalInstance.dismiss('cancel');
          }

          function handleConfirmErrorCancelClick($modalInstance) {
            $modalInstance.dismiss('cancel');
            $scope.obStep = 3;
            $scope.submitMobile();
          }

        }]
    };
  });


});
