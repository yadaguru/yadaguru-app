define(['app'], function (app) {

  /**
   * Controller for login view
   */
  app.register.controller('LoginController', ['$scope', 'yg.services.api', '$state', 'yg.services.modal', 'yg.services.error', 'localStorageService', 'yg.services.auth',
    function($scope, yadaApi, $state, modalService, errorService, localStorage, authService) {

      $scope.submitPhone = function() {
        yadaApi.post('users', {
          phoneNumber: $scope.phoneNumber
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
          confirmCode: $scope.confirmCode
        });
        apiPromise.then(function(resp) {
          authService.saveUserToken(resp.data.token);
          $state.go('school');
        }).catch(errorService.handleHttpError);
      };

      $scope.loginStep = 1;

  }]);


});