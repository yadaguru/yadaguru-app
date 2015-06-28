(function(app) {

  var authService = function($http, $q, identityService, userService) {
    var authFactory = {};

    authFactory.authenticateUser = function(username, password) {
      var deferred = $q.defer();
      $http.post('/api/auth/login', {username:username, password:password}).then(function(response) {
        if(response.data.success) {
          var user = new userService.UserResource();
          angular.extend(user, response.data.user);
          identityService.currentUser = user;
          deferred.resolve(true);
        } else {
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    };

    authFactory.logoutUser = function() {
      var deferred = $q.defer();
      $http.post('/api/auth/logout', { logout: true }).then(function() {
        identityService.currentUser = undefined;
        deferred.resolve();
      });
      return deferred.promise;
    };

    authFactory.routeAuth = function(role) {
      if(identityService.isAuthorized(role)) {
        return true;
      } else {
        return $q.reject('unauthorized');
      }
    }

    return authFactory;
  };


  app.factory('authService', ['$http', '$q', 'identityService', 'userService', authService]);

}(angular.module('commonUtil')));
