(function(app) {

  'use strict';

  var apiService = function($http) {

    var yadaAPI = {};
    
    yadaAPI.reminders = {};

    yadaAPI.reminders.get = function() {
      return $http.get('/api/reminders/');
    };

    yadaAPI.reminders.post = function(data) {
      return $http.post('/api/reminders/', data);
    };

    yadaAPI.reminders.put = function(id, data) {
      return $http.put('/api/reminders/' + id, data);
    };

    yadaAPI.reminders.delete = function(id) {
      return $http.delete('/api/reminders/' + id);
    };

    yadaAPI.categories = {};

    yadaAPI.categories.get = function() {
      return $http.get('/api/categories/');
    };

    yadaAPI.categories.post = function(data) {
      return $http.post('/api/categories/', data);
    };

    yadaAPI.categories.put = function(id, data) {
      return $http.put('/api/categories/' + id, data);
    };

    yadaAPI.categories.delete = function(id) {
      return $http.delete('/api/categories/' + id);
    };

    yadaAPI.testDates = {};

    yadaAPI.testDates.get = function() {
      return $http.get('/api/test-dates');
    };

    yadaAPI.testDates.post = function(data) {
      return $http.post('/api/test-dates/', data);
    };

    yadaAPI.testDates.put = function(id, data) {
      return $http.put('/api/test-dates/' + id, data);
    };

    yadaAPI.testDates.delete = function(id) {
      return $http.delete('/api/test-dates/' + id);
    };
    
    yadaAPI.testMessages = {};

    yadaAPI.testMessages.get = function() {
      return $http.get('/api/test-messages');
    };

    yadaAPI.testMessages.put = function(id, data) {
      return $http.put('/api/test-messages/' + id, data);
    };

    yadaAPI.faqs = {};

    yadaAPI.faqs.get = function() {
      return $http.get('/api/faqs');
    };

    yadaAPI.faqs.put = function(id, data) {
      return $http.put('/api/faqs/' + id, data);
    };

    yadaAPI.settings = {};

    yadaAPI.settings.get = function() {
      return $http.get('/api/settings');
    };

    yadaAPI.settings.put = function(id, data) {
      return $http.put('/api/settings/' + id, data);
    };

    return yadaAPI;
  };

  app.factory('YadaAPI', ['$http', apiService]);
  
}(angular.module('yg.common.services.api', [])));
