(function() {

  'use strict';

  angular.module('yadaApp.services.api', [])
  .factory('YadaAPI', ['$http', function($http) {
    
    var yadaAPI = {};
    
    yadaAPI.reminders = {};

    yadaAPI.reminders.get = function() {
      return $http.get('/api/reminders/');
    };

    return yadaAPI;
  
  }]);
  
}());
