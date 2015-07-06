(function(app) {

  var LoginController = function($scope, $http, notifierService,
    identityService, authService, $location, $window) {

    $scope.identityService = identityService;

    identityService.getCurrentUser();

    $scope.signin = function() {
      authService.authenticateUser($scope.username, $scope.password).then(function(success) {
        if(success) {
          notifierService.success('You have successfully signed in!');
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

  app.controller('LoginController',
    ['$scope', '$http', 'notifierService', 'identityService',
      'authService', '$location', '$window', LoginController]);

}(angular.module('yg.login')));
