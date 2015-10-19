define(['app'], function(app) {

  var authService = function($http, $q, identityService, userService) {
    var authFactory = {};

    var apiRoute = window.location.protocol + '//' + location.hostname + ':8080/api/';

    authFactory.authenticateUser = function(username, password) {
      var deferred = $q.defer();
      $http.post(apiRoute + 'auth/login', {username:username, password:password}).then(function(response) {
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
      $http.post(apiRoute + 'auth/logout', { logout: true }).then(function() {
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
    };

    return authFactory;
  };


  app.factory('yg.services.auth', ['$http', '$q', 'yg.services.identity', 'yg.services.user', authService]);

});
