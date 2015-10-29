define(['app'], function(app) {

  'use strict';

  var apiService = function($http, constants) {

    var yadaAPI = {};

    yadaAPI.reminders = {};
    var apiRoute = constants.HOSTNAME + constants.API_ROUTE;
    var apiRouteTerminator = constants.API_ROUTE_TERMINATOR;

    yadaAPI.login = function(data) {
      return $http.post(apiRoute + 'users/login/', data);
    };

    yadaAPI.logout = function(data) {
      return $http.post(apiRoute + 'users/logout/', data);
    };

    yadaAPI.currentUser = function() {
      return $http.get(apiRoute + 'users/currentUser');
    };

    yadaAPI.reminders.get = function() {
      return $http.get(apiRoute + 'reminders' + apiRouteTerminator);
    };

    yadaAPI.reminders.post = function(data) {
      return $http.post(apiRoute + 'reminders/', data);
    };

    yadaAPI.reminders.put = function(id, data) {
      return $http.put(apiRoute + 'reminders/' + id, data);
    };

    yadaAPI.reminders.delete = function(id) {
      return $http.delete(apiRoute + 'reminders/' + id);
    };

    yadaAPI.categories = {};

    yadaAPI.categories.get = function() {
      return $http.get(apiRoute + 'categories' + apiRouteTerminator);
    };

    yadaAPI.categories.post = function(data) {
      return $http.post(apiRoute + 'categories/', data);
    };

    yadaAPI.categories.put = function(id, data) {
      return $http.put(apiRoute + 'categories/' + id, data);
    };

    yadaAPI.categories.delete = function(id) {
      return $http.delete(apiRoute + 'categories/' + id);
    };

    yadaAPI.testDates = {};

    yadaAPI.testDates.get = function() {
      return $http.get(apiRoute + 'test-dates' + apiRouteTerminator);
    };

    yadaAPI.testDates.post = function(data) {
      return $http.post(apiRoute + 'test-dates/', data);
    };

    yadaAPI.testDates.put = function(id, data) {
      return $http.put(apiRoute + 'test-dates/' + id, data);
    };

    yadaAPI.testDates.delete = function(id) {
      return $http.delete(apiRoute + 'test-dates/' + id);
    };

    yadaAPI.testMessages = {};

    yadaAPI.testMessages.get = function() {
      return $http.get(apiRoute + 'test-messages' + apiRouteTerminator);
    };

    yadaAPI.testMessages.put = function(id, data) {
      return $http.put(apiRoute + 'test-messages/' + id, data);
    };

    yadaAPI.faqs = {};

    yadaAPI.faqs.get = function() {
      return $http.get(apiRoute + 'faqs' + apiRouteTerminator);
    };

    yadaAPI.faqs.put = function(id, data) {
      return $http.put(apiRoute + 'faqs/' + id, data);
    };

    yadaAPI.settings = {};

    yadaAPI.settings.get = function() {
      return $http.get(apiRoute + 'settings' + apiRouteTerminator);
    };

    yadaAPI.settings.put = function(id, data) {
      return $http.put(apiRoute + 'settings/' + id, data);
    };

    return yadaAPI;
  };

  app.factory('yg.services.api', ['$http', 'constants', apiService]);

});
