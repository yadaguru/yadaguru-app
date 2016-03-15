define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the reminder view.
   */
  app.register.controller('ReminderController', ['$scope', 'yg.services.user', 'yg.services.api', '$stateParams', '$moment',
    function ($scope, userService, apiService, $stateParams, $moment) {

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

        // check if we are getting reminders for just one school.
        if (typeof resp.data[0].school !== 'undefined') {
          $scope.school = resp.data[0].school;
          $scope.date = $moment.utc(resp.data[0].due_date).format('M/D/YYYY');
          $scope.reminderGroups = resp.data[0].grouped_reminders;
        } else {
          $scope.reminderGroups = resp.data;
        }

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
