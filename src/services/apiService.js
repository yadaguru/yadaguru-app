define(['app'], function(app) {

  'use strict';

  var apiService = function($http, constants, $q, authService) {
    var yadaAPI = {};

    yadaAPI.reminders = {};
    var apiRoute = constants.HOSTNAME + constants.API_ROUTE;

    var authHeaderConfig = {
      headers: {
        Authorization: function() {
          return authService.getUserToken();
        }
      }
    };

    yadaAPI.getAll = function(resource, isAuthRoute) {
      var route = apiRoute + resource + '/';

      isAuthRoute = typeof isAuthRoute === 'undefined' ? true : isAuthRoute;
      var config = isAuthRoute ? authHeaderConfig : undefined;

      return $http.get(route, config);
    };

    yadaAPI.getAllForResource = function(primaryResource, secondaryResource, secondaryResourceId, isAuthRoute) {
      var route = apiRoute + primaryResource + '/' + secondaryResource + '/' + secondaryResourceId + '/';

      isAuthRoute = typeof isAuthRoute === 'undefined' ? true : isAuthRoute;
      var config = isAuthRoute ? authHeaderConfig : undefined;

      return $http.get(route, config);
    };

    yadaAPI.getOne = function(resource, resourceId, isAuthRoute) {
      var route = apiRoute + resource + '/' + resourceId + '/';

      isAuthRoute = typeof isAuthRoute === 'undefined' ? true : isAuthRoute;
      var config = isAuthRoute ? authHeaderConfig : undefined;

      return $http.get(route, config);
    };

    yadaAPI.post = function(resource, data, isAuthRoute) {
      var route = apiRoute + resource + '/';

      isAuthRoute = typeof isAuthRoute === 'undefined' ? true : isAuthRoute;
      var config = isAuthRoute ? authHeaderConfig : undefined;

      return $http.post(route, data, config);
    };

    yadaAPI.put = function(resource, resourceId, data, isAuthRoute) {
      var route = apiRoute + resource + '/' + resourceId + '/';

      isAuthRoute = typeof isAuthRoute === 'undefined' ? true : isAuthRoute;
      var config = isAuthRoute ? authHeaderConfig : undefined;

      return $http.put(route, data, config);
    };

    yadaAPI.delete = function(resource, resourceId, isAuthRoute) {
      var route = apiRoute + resource + '/' + resourceId + '/';

      isAuthRoute = typeof isAuthRoute === 'undefined' ? true : isAuthRoute;
      var config = isAuthRoute ? authHeaderConfig : undefined;

      return $http.delete(route, config);
    };

    yadaAPI.greetUser = function() {
      var route = apiRoute + 'users/greet/';
      var config = authHeaderConfig;

      return $http.post(route, {}, config);
    }

    return yadaAPI;
  };

  app.factory('yg.services.api', ['$http', 'constants', '$q', 'yg.services.auth', apiService]);
});
