define(['app'], function(app) {

  var authService = function($http, $q, identityService, userService, YadaAPI) {
    var authFactory = {};

    authFactory.authenticateUser = function(username, password) {
      var deferred = $q.defer();
      YadaAPI.login({username:username, password:password}).then(function(response) {
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
      YadaAPI.logout({ logout: true }).then(function() {
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


  app.factory('yg.services.auth', ['$http', '$q', 'yg.services.identity', 'yg.services.user', 'yg.services.api', authService]);

});
