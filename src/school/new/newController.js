define(['app'], function (app) {

  /**
   * Controller for login view
   */
  app.register.controller('NewController', [
    '$scope', 
    'yg.services.api', 
    '$state', 
    'yg.services.help', 
    'yg.services.error',
    '$moment',
    function($scope, yadaApi, $state, helpService, errorService, $moment) {

      $scope.submitSchool = function() {
        var apiPromise = yadaApi.post('schools', {
          name: $scope.schoolName,
          dueDate: $scope.submissionDate,
          isActive: 'true'
        }).catch(errorService.handleHttpError);

        apiPromise.then(function() {
          $state.go('school');
        })
      };

      $scope.faqModal = function (question) {
        helpService.getHelpMessage(question);
      };

      $scope.openDatepicker = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.datepickerOpen = !$scope.datepickerOpen;
      }

      $scope.minDate = $moment().toDate();

      $scope.validateForm = function() {
        // invalid is form validation fails
        if ($scope.newSchoolForm.$invalid) {
          return false;
        }

        // invalid if not a valid date
        if (!$moment($scope.submissionDate).isValid()) {
          return false;
        }

        // invalid if before today
        if ($moment($scope.submissionDate).isBefore($moment(), 'day')) {
          return false;
        }

        // otherwise, valid
        return true;
      }

    }]);


});
