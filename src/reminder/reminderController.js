define(['app'], function(app) {

  'use strict';

  var ReminderController = function ($scope, apiService) {
    apiService.reminders.get().success(function(resp) {
      console.log(resp);
    });
  };

  app.register.controller('ReminderController', ['$scope', 'yg.services.api', ReminderController]);
});
