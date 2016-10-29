define(['app'], function (app) {

  /**
   * Controller for login view
   */
  app.register.controller('NewController', ['$scope', 'yg.services.api', '$state', 'yg.services.help', 'yg.services.error',
    function($scope, yadaApi, $state, helpService, errorService) {

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

    }]);


});
