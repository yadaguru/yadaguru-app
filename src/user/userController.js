define(['app'], function (app) {

  'use strict';

  /**
   * Controller for user/sms setup
   */
  app.register.controller('UserController', ['$scope', '$state', '$modal', 'yg.services.api', 'localStorageService', 'yg.services.auth', 'yg.services.error',
    function ($scope, $state, $modal, yadaApi, localStorage, authService, errorService) {

      /**
       * Checks whether state is the root user menu, and sets it in the scope.
       */
      $scope.getUserMenuState = function() {
        $scope.isUserMenu = $state.current.name === 'user';
      };

      /**
       * Shows the "Forget Me" confirmation modal
       */
      $scope.showForgetConfirmation = function() {
        var modalInstance = $modal.open({
          templateUrl: 'forgetUser.html',
          controller: 'UserModalController',
          windowClass: 'forget-user-modal'
        });

        modalInstance.result.then(function() {
          $scope.forgetUser();
        })
      };

      /**
       * Deletes current user and removes all YadaGuru cookies, then redirects to school view (which begins onboarding).
       */
      $scope.forgetUser = function() {
        yadaApi.delete('users', localStorage.get('uid')).then(function() {
          localStorage.remove('uid');
          localStorage.remove('sms_set');
          localStorage.remove('ob_complete');
          authService.removeUserToken();
          $state.go('school');
        }).catch(errorService.handleHttpError);
      };

      /**
       * User state change event listener
       */
      $scope.$on('$stateChangeSuccess', function() {

        $scope.getUserMenuState();

      });

      $scope.isLoginUpdateFormVisible = false;
      $scope.isUserMenu = false;
      $scope.userId = localStorage.get('uid');
      $scope.$parent.showAdd = false;
      $scope.$parent.showPrint = false;
      $scope.getUserMenuState();

    }]);

  /**
   * Controller for the user area modals.
   */
  app.register.controller('UserModalController', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {

      $scope.ok = function() {
        $modalInstance.close();
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      }

    }]);

});
