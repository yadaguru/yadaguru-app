define(['app'], function(app) {

  var identityService = function($http, $q, userService) {
    var identityFactory = {};

    identityFactory.currentUser = undefined;

    identityFactory.getCurrentUser = function() {
      var deferred = $q.defer();
      $http.get('/api/auth/currentUser').then(function(response) {
        if(response.data.success) {
          var user = new userService.UserResource();
          angular.extend(user, response.data.user);
          identityFactory.currentUser = user;
          deferred.resolve(true);
        } else {
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    };

    identityFactory.isAuthenticated = function() {
      return !!this.currentUser;
    };

    identityFactory.isAuthorized = function(role) {
      return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
    };

    return identityFactory;
  };

  app.factory('yg.services.identity', ['$http', '$q', 'userService', identityService]);

});
