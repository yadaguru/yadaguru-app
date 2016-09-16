define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the school view.
   */
  app.register.controller('SchoolController', ['$scope', '$rootScope', '$moment', 'yg.services.api', '$cookies',
    'yg.services.modal', 'yg.services.user', '$state',
    function ($scope, $rootScope, $moment, yadaApi, $cookies, modalService, userService, $state) {

      /**
       * Gets all schools and adds them to the $scope.schools.
       */
      $scope.getSchools = function () {
        yadaApi.schools.get(userService.getCurrentUserId()).then($scope.processSchools);
      };

      /**
       * Adds response data from a call to GET schools to $scope.schools.
       *
       * @param  {object}  resp  The response object.
       */
      $scope.processSchools = function(resp) {
        resp.data.forEach(function (school) {
          $scope.schools.push({
            id: school.id,
            name: school.name,
            dueDate: $moment.utc(school.due_date).format('M/D/YYYY'),
            isActive: school.is_active
          });
        })
      };

      /**
       * Sets is_active to false for all schools
       */
      $scope.deactivateAllSchools = function() {
        var apiPromise = yadaApi.schools.put(null, {
          is_active: false
        }, userService.getCurrentUserId());

        apiPromise.then(function(resp) {
          $scope.schools = [];
          $scope.processSchools(resp);
        });
      };

      $scope.viewReminders = function(id) {
        $state.go('reminder', {schoolId: id});
      };

      /**
       * Updates the active/inactive status of a school
       *
       * @param {number}   id         The school ID to update.
       * @param {boolean}  is_active  The active status.
       */
      $scope.updateActive = function (id, is_active) {
        yadaApi.schools.put(id, {
          is_active: is_active
        }, userService.getCurrentUserId());
      };

      /**
       * Ends the onboarding process and drops a cookie.
       * TODO Move this logic to another controller.
       */
      $scope.endOnboarding = function () {
        $scope.isOnboarding = false;
        $scope.currentStep = 0;
        $cookies.put('yg-ob-complete', true);
        $cookies.put('yg-sms-set', true);
      };

      $scope.schools = [];
      $scope.$parent.showAdd = true;
      $scope.$parent.showPrint = false;

      if (!$cookies.get('yg-ob-complete')) {
        $scope.isOnboarding = true;
      } else {
        $scope.getSchools();
      }

      $scope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState) {

        if (fromState.name === 'school.new') {
          $scope.schools = [];
          $scope.getSchools();
        }
      })

    }]);

});
