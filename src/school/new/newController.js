define(['app'], function (app) {

  /**
   * Controller for login view
   */
  app.register.controller('NewController', ['$scope', 'yg.services.api', '$state', 'yg.services.help', 'yg.services.user',
    function($scope, yadaApi, $state, helpService, userService) {

      $scope.submitSchool = function() {
        var apiPromise = yadaApi.post('schools', {
          name: $scope.schoolName,
          dueDate: $scope.submissionDate,
          isActive: 'true'
        }, userService.getCurrentUserId());

        apiPromise.then(function() {
          $state.go('school');
        })
      };

      $scope.faqModal = function (question) {
        helpService.getHelpMessage(question);
      };

    }]);


});
