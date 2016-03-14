define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the reminder view.
   */
  app.register.controller('ReminderController', ['$scope', 'yg.services.user', 'yg.services.api', '$stateParams',
    function ($scope, userService, apiService, $stateParams) {

      /**
       * Gets all reminders then adds them to $scope.reminderGroups.
       */
      $scope.getReminders = function(schoolId) {
        if (schoolId) {
          apiService.reminders.getForSchool(userService.getCurrentUserId(), schoolId).then($scope.processReminders);
        } else {
          apiService.reminders.get(userService.getCurrentUserId()).then($scope.processReminders);
        }
      };

      $scope.processReminders = function(resp) {
        $scope.reminderGroups = resp.data;
        $scope.reminderGroups.forEach(function (el, i) {
          if (i > 0) {
            el.isCollapsed = true;
          }
        });
      };

      var schoolId = $stateParams.schoolId || false;
      $scope.getReminders(schoolId);

    }]);

});
