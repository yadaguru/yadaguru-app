(function() {

  'use strict';

  angular.module('yadaApp.services.api', [])
  .factory('YadaAPI', ['$http', function($http) {
    
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

    return yadaAPI;
  
  }]);
  
}());
