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

    yadaAPI.reminders.get = function(user_uuid) {
      return $http.get(apiRoute + 'reminders/?user_uuid=' + user_uuid);
    };

    yadaAPI.reminders.post = function(data, user_uuid) {
      return $http.post(apiRoute + 'reminders/?user_uuid=' + user_uuid, data);
    };

    yadaAPI.reminders.put = function(id, data, user_uuid) {
      return $http.put(apiRoute + 'reminders/' + id + '/?user_uuid=' + user_uuid, data);
    };

    yadaAPI.reminders.delete = function(id, user_uuid) {
      return $http.delete(apiRoute + 'reminders/' + id + '/?user_uuid=' + user_uuid);
    };
    
    yadaAPI.users = {};

    yadaAPI.users.get = function() {
      return $http.get(apiRoute + 'users/');
    };

    yadaAPI.users.post = function(data) {
      return $http.post(apiRoute + 'users/', data);
    };

    yadaAPI.users.put = function(uuid, data) {
      return $http.put(apiRoute + 'users/' + uuid, data);
    };

    yadaAPI.users.delete = function(uuid) {
      return $http.delete(apiRoute + 'users/' + uuid);
    };

    yadaAPI.schools = {};

    yadaAPI.schools.get = function(user_uuid) {
      return $http.get(apiRoute + 'schools/?=user_uuid' + user_uuid);
    };

    yadaAPI.schools.post = function(data, user_uuid) {
      return $http.post(apiRoute + 'schools/?=user_uuid' + user_uuid, data);
    };

    yadaAPI.schools.put = function(id, data, user_uuid) {
      return $http.put(apiRoute + 'schools/' + id + '/?user_uuid=' + user_uuid, data);
    };

    yadaAPI.schools.delete = function(id, user_uuid) {
      return $http.delete(apiRoute + 'schools/' + id + '/?user_uuid=' + user_uuid);
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
