define(['app'], function (app) {

  /**
   * Controller for login view
   */
  app.register.controller('LoginController', ['$scope', 'yg.services.api', '$state', 'yg.services.modal',
    function($scope, yadaApi, $state, modalService) {

      // TODO refactor this with the correct data that needs to be passed to the login route
      $scope.submitLogin = function() {
        yadaApi.login({
          phone_number: $scope.phoneNumber,
          personal_code: $scope.personalCode
        }).then(function() {
          $state.go('school');
        }, function() {
          var modalMessage = modalService.makeModalMessage('Login incorrect, please try again.');
          modalService.showModal(modalMessage);
        })
      }

  }]);


});