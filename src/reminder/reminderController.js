define(['app'], function(app) {

  'use strict';

  var ReminderController = function ($scope, apiService) {
    apiService.reminders.get().success(function(resp) {
      console.log(resp);
      $scope.reminders = resp;
      $scope.reminders.forEach(function(el, i) {
        if (i > 0) {
          el.isCollapsed = true;
        }
      });
    });
  };

  app.register.controller('ReminderController', ['$scope', 'yg.services.api', ReminderController]);
});
