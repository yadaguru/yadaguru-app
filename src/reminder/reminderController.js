define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the reminder view.
   */
  app.register.controller('ReminderController', ['$scope', '$rootScope', '$cookies', 'yg.services.api',
    function ($scope, $rootScope, $cookies, apiService) {

      /**
       * Gets all reminders then adds them to $scope.reminderGroups.
       */
      apiService.reminders.get($rootScope.user_id).then(function (resp) {
        $scope.reminderGroups = resp.data;
        $scope.reminderGroups.forEach(function (el, i) {
          if (i > 0) {
            el.isCollapsed = true;
          }
        });
      });

      $rootScope.user_id = $cookies.get('yg-uid');

    }]);

});
