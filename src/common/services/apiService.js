(function(app) {

  'use strict';

  var apiService = function($http) {

    var yadaAPI = {};

    yadaAPI.reminders = {};

    var apiRoute = window.location.protocol + '//' + location.hostname + ':8080/api/';

    yadaAPI.reminders.get = function() {
      return $http.get(apiRoute + 'reminders/');
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
      return $http.get(apiRoute + 'categories/');
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
      return $http.get(apiRoute + 'test-dates');
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
      return $http.get(apiRoute + 'test-messages');
    };

    yadaAPI.testMessages.put = function(id, data) {
      return $http.put(apiRoute + 'test-messages/' + id, data);
    };

    yadaAPI.faqs = {};

    yadaAPI.faqs.get = function() {
      return $http.get(apiRoute + 'faqs');
    };

    yadaAPI.faqs.put = function(id, data) {
      return $http.put(apiRoute + 'faqs/' + id, data);
    };

    yadaAPI.settings = {};

    yadaAPI.settings.get = function() {
      return $http.get(apiRoute + 'settings');
    };

    yadaAPI.settings.put = function(id, data) {
      return $http.put(apiRoute + 'settings/' + id, data);
    };

    return yadaAPI;
  };

  app.factory('YadaAPI', ['$http', apiService]);

}(angular.module('yg.common.services.api', [])));
