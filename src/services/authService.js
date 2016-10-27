define(['app'], function(app) {

  var authService = function(localStorage) {
    var authFactory = {};

    authFactory.saveUserToken = function(token) {
      localStorage.set('access_token', token);
    };

    authFactory.getUserToken = function() {
      return localStorage.get('access_token');
    };

    authFactory.isAuthorized = function() {
      return Boolean(localStorage.get('access_token'));
    };

    return authFactory;
  };


  app.factory('yg.services.auth', ['localStorageService', authService]);

});
