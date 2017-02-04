define(['app'], function (app) {

  /**
   * Controller for login view
   */
  app.register.controller('LoginController', ['$scope', 'yg.services.api', '$state', 'yg.services.modal', 'yg.services.error', 'localStorageService', 'yg.services.auth',
    function($scope, yadaApi, $state, modalService, errorService, localStorage, authService) {

      $scope.form = {};

      $scope.submitPhone = function() {
        yadaApi.post('users', {
          phoneNumber: $scope.form.phoneNumber
        }).then(function(resp) {
          $scope.userId = resp.data.userId;
          localStorage.set('uid', $scope.userId);
          if (resp.data.hasOwnProperty('confirmCode')) {
            console.log('#### CONFIRM CODE: ' + resp.data.confirmCode +' ####'); // for dev environments
          }
          var modalMessage = modalService.makeModalMessage(
              'Check your device, we are sending you a code to confirm it\'s you.'
          );
          var modalPromise = modalService.showModal(modalMessage, {
            button: 'I GOT IT',
            cancel: 'Resend It',
            modalClass: 'confirm-modal'
          });
          modalPromise.then(function() {
            $scope.loginStep++;
          });
        }).catch(errorService.handleHttpError);
      };

      $scope.submitCode = function() {
        var apiPromise = yadaApi.put('users', $scope.userId, {
          confirmCode: $scope.form.confirmCode
        });
        $scope.form.confirmCode = null;
        apiPromise.then(function(resp) {
          authService.saveUserToken(resp.data.token);
          $state.go('school');
        }).catch(errorService.getConfirmCodeErrorHandler(
          handleConfirmErrorButtonClick,
          handleConfirmErrorCancelClick
        ));
      };

      $scope.loginStep = 1;

      function handleConfirmErrorButtonClick($modalInstance) {
        $modalInstance.dismiss('cancel');
      }

      function handleConfirmErrorCancelClick($modalInstance) {
        $modalInstance.dismiss('cancel');
        $scope.loginStep = 1;
        $scope.submitPhone();
      }

  }]);


});