define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the reminder view.
   */
  app.register.controller('ReminderController', ['$scope', 'yg.services.error', 'yg.services.api', '$stateParams', '$moment', 'yg.services.pdf',
    function ($scope, errorService, apiService, $stateParams, $moment, pdfService) {

      /**
       * Gets all reminders then adds them to $scope.reminderGroups.
       */
      $scope.getReminders = function(schoolId) {
        if (schoolId) {
          apiService.getAllForResource('reminders', 'school', schoolId).then($scope.processReminders)
            .catch(errorService.handleHttpError);
        } else {
          apiService.getAll('reminders').then($scope.processReminders)
            .catch(errorService.handleHttpError);
        }
      };

      $scope.processReminders = function(resp) {

        // Reminders for an individual school
        if (typeof resp.data.schoolName !== 'undefined') {
          $scope.school = resp.data.schoolName;
          $scope.reminderGroups = resp.data.reminders;
        } else {
          $scope.school = false;
          $scope.reminderGroups= resp.data;
        }

        $scope.reminderGroups.forEach(function (el, i) {
          el.dueDate = getTimeframeHeading(el.dueDate);
          if (i > 0) {
            el.isCollapsed = true;
          }
        });
      };

      $scope.$parent.saveAsPdf = function() {
        pdfService.saveAsPdf($scope.reminderGroups);
      };

      function getTimeframeHeading(dateString) {
        var dueDate = $moment.utc(dateString);
        return dueDate.calendar($moment(), {
          sameDay: '[By Today]',
          nextDay: '[By Tomorrow]',
          nextWeek: '[By] dddd',
          sameElse: '[By] M/D/YYYY',
          lastDay: '[ASAP]'
        });
      }

      $scope.isInPast = function(dueDate) {
        return $moment.utc(dueDate).isBefore($moment(), 'day');
      };

      var schoolId = $stateParams.schoolId || false;
      $scope.getReminders(schoolId);
      $scope.$parent.showPrint = true;
      $scope.$parent.showAdd = true;

    }]);

});
