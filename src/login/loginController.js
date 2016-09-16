define(['app'], function (app) {

  /**
   * Controller for login view
   */
  app.register.controller('LoginController', ['$scope', 'yg.services.api', '$state', 'yg.services.modal',
    function($scope, yadaApi, $state, modalService) {

      // TODO refactor this with the correct data that needs to be passed to the login route
      $scope.submitPhone = function() {
        yadaApi.login({
          phone_number: $scope.phoneNumber
        }).then(function() {
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
        })
      };

      $scope.submitCode = function() {
        var apiPromise = yadaApi.login({
          confirm_code: $scope.confirmCode
        });
        apiPromise.then(function() {
          $state.go('school');
        })
      };

      $scope.loginStep = 1;

  }]);


});