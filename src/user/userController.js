define(['app'], function (app) {

  'use strict';

  /**
   * Controller for user/sms setup
   */
  app.register.controller('UserController', ['$scope', 'yg.services.user', '$state', '$modal', 'yg.services.api', '$cookies',
    function ($scope, userService, $state, $modal, yadaApi, $cookies) {

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
        yadaApi.users.delete(userService.getCurrentUserId()).then(function() {
          $cookies.remove('yg-uid');
          $cookies.remove('yg-sms-set');
          $cookies.remove('yg-ob-complete');
          $state.go('school');
        });
      };

      /**
       * User state change event listener
       */
      $scope.$on('$stateChangeSuccess', function() {

        $scope.getUserMenuState();

      });

      $scope.isLoginUpdateFormVisible = false;
      $scope.isUserMenu = false;
      $scope.userId = userService.getCurrentUserId();
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
