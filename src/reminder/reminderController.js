define(['app'], function(app) {

  'use strict';

  var ReminderController = function ($scope, $rootScope, $cookies, apiService) {

    $rootScope.user_id = $cookies.get('yg-uid');

    apiService.reminders.get($rootScope.user_id).then(function(resp) {
      $scope.reminderGroups = resp.data;
      $scope.reminderGroups.forEach(function(el, i) {
        if (i > 0) {
          el.isCollapsed = true;
        }
      });
    });
  };

  app.register.controller('ReminderController', ['$scope', '$rootScope', '$cookies', 'yg.services.api', ReminderController]);
});
