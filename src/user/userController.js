define(['app'], function (app) {

  'use strict';

  /**
   * Controller for user/sms setup
   */
  app.register.controller('UserController', ['$scope', '$cookies', '$state', '$modal', 'yg.services.api',
    function ($scope, $cookies, $state, $modal, yadaApi) {

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
        yadaApi.users.delete($cookies.get('yg-uid')).then(function() {
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
      $scope.userId = $cookies.get('yg-uid');

      $scope.isSmsSetup = $cookies.get('yg-sms-set') || false;
      $scope.getUserMenuState();

      if ($scope.isUserMenu && !$scope.isSmsSetup) {
        $state.go('user.sms-add');
      }




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
