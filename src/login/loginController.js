define(['app'], function(app) {

  var LoginController = function($scope, $http, notifierService,
    identityService, authService, $location, $state) {

    $scope.identityService = identityService;

    identityService.getCurrentUser();

    $scope.signin = function() {
      authService.authenticateUser($scope.username, $scope.password).then(function(success) {
        if(success) {
          notifierService.success('You have successfully signed in!');
          $state.go('admin.reminders');
        } else {
          notifierService.error('You have failed to sign in.');
        }
      });
    };

    $scope.signout = function() {
      authService.logoutUser().then(function() {
        $scope.username = "";
        $scope.password = "";
        notifierService.success('You have successfully signed out!');
        $location.path('/');
      });
    };
  };

  app.register.controller('LoginController',
    ['$scope', '$http', 'yg.services.notifier', 'yg.services.identity',
      'yg.services.auth', '$location', '$state', LoginController]);

});
