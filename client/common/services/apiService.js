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
    
    return yadaAPI;
  
  };

  app.factory('YadaAPI', ['$http', apiService]);
  
}(angular.module('yg-common.services.api', [])));
