define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the school view.
   */
  app.register.controller('SchoolController', ['$scope', '$rootScope', '$moment', 'yg.services.api',
    'yg.services.modal', '$state', 'yg.services.error', 'localStorageService',
    function ($scope, $rootScope, $moment, yadaApi, modalService, $state, errorService, localStorage) {

      /**
       * Gets all schools and adds them to the $scope.schools.
       */
      $scope.getSchools = function () {
        return yadaApi.getAll('schools')
          .then($scope.processSchools)
          .catch(errorService.handleHttpError)
      };

      /**
       * Adds response data from a call to GET schools to $scope.schools.
       *
       * @param  {object}  resp  The response object.
       */
      $scope.processSchools = function(resp) {
        $scope.schools = resp.data.map(function(school) {
          return {
            id: school.id,
            name: school.name,
            dueDate: $moment.utc(school.dueDate).format('M/D/YYYY'),
            isActive: school.isActive
          }
        });
      };

      /**
       * Sets is_active to false for all schools
       * // TODO there is currently no enpoint for this in the API. Refactor after API is updated
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
       * @param {boolean}  isActive  The active status.
       */
      $scope.updateActive = function (id, isActive) {
        yadaApi.put('schools', id, {
          isActive: isActive.toString()
        });
      };

      /**
       * Deletes a school.
       * 
       * @param {number} id - The school ID to delete
       */
      $scope.deleteSchool = function(id) {
        console.log('delete school id', id);
        var deleteModal = modalService.makeModalMessage(
          'Are you sure you want to trash this school?'
        );
        modalService.showModal(deleteModal, {
          button: 'Yes',
          cancel: 'No'
        })
         .then(function() {
           yadaApi.delete('schools', id);
         })
         .then(function() {
           $scope.getSchools();
         });
      }

      /**
       * Ends the onboarding process and updates localStorage.
       * TODO Move this logic to another controller.
       */
      $scope.endOnboarding = function () {
        $scope.isOnboarding = false;
        $scope.currentStep = 0;
        localStorage.set('ob_complete', true);
        localStorage.set('sms_set', true);
      };

      $scope.schools = [];
      $scope.$parent.showAdd = true;
      $scope.$parent.showPrint = false;

      if (!localStorage.get('ob_complete')) {
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
