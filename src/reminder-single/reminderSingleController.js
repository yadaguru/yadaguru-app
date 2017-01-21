define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the single reminder view.
   */
  app.register.controller('ReminderSingleController', ['$scope', 'yg.services.error', 'yg.services.api', '$stateParams', '$moment', 'yg.services.pdf',
    function ($scope, errorService, apiService, $stateParams, $moment, pdfService) {

      /**
       * Gets all reminders for a single day then adds them to $scope.
       */
      $scope.getReminders = function(dateCode) {
        apiService.getAllForResource('reminders', 'date', dateCode)
          .then($scope.processReminders)
          .catch(errorService.handleHttpError);
      };

      $scope.processReminders = function(resp) {
        $scope.reminders = resp.data;
      };

      $scope.$parent.saveAsPdf = function() {
        console.log($scope.reminderGroups);
        pdfService.saveAsPdf($scope.reminderGroups);
      };

      var dateCode = $stateParams.datecode;
      $scope.reminderDateHeading = $moment.utc(dateCode, 'YYYYMMDD').format('[Reminders for] M/D/YYYY');
      $scope.$parent.showPrint = true;
      $scope.$parent.showAdd = false;
      $scope.getReminders(dateCode);
    }]);
});
