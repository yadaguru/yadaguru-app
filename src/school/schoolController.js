define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the school view.
   */
  app.register.controller('SchoolController', ['$scope', '$rootScope', '$moment', 'yg.services.api', '$cookies',
    function ($scope, $rootScope, $moment, $YadaAPI, $cookies) {

      /**
       * Gets all schools and adds them to the $scope.schools.
       */
      $scope.getSchools = function () {
        $YadaAPI.schools.get($rootScope.user_id).then(function (resp) {
          $scope.schools = [];
          resp.data.forEach(function (school) {
            $scope.schools.push({
              id: school.id,
              name: school.name,
              dueDate: moment.utc(school.due_date).format('M/D/YYYY'),
              isActive: school.is_active
            });
          })
        });
      };

      /**
       * Updates the active/inactive status of a school
       *
       * @param {number}   id         The school ID to update.
       * @param {boolean}  is_active  The active status.
       */
      $scope.updateActive = function (id, is_active) {
        $YadaAPI.schools.put(id, {
          is_active: is_active
        }, $rootScope.user_id);
      };

      /**
       * Ends the onboarding process and drops a cookie.
       * TODO Move this logic to another controller.
       */
      $scope.endOnboarding = function () {
        $scope.isOnboarding = false;
        $scope.currentStep = 0;
        $cookies.put('onboardingComplete', true);
      };

      $scope.$parent.showAdd = true;
      $rootScope.user_id = $cookies.get('yg-uid');

      if (!$scope.user_id) {
        $scope.isOnboarding = true;
      } else {
        $scope.getSchools();
      }

    }]);

  /**
   * Controller for the FAQ modal.
   * TODO Move controller to a separate file
   * TODO Move faqs to their own service (or better yet, into the Database)
   */
  app.register.controller('FaqModalController', ['$scope', '$modalInstance', 'question',
    function ($scope, $modalInstance, question) {

      var faqs = {
        'application-submission-date': {
          'question': 'What\'s an Application Submission Date?',
          'answer': 'Answer Goes Here.'
        },
        'application-find': {
          'question': 'Where do I find the application?"',
          'answer': 'Answer goes here.'
        },
        'regular-admissions': {
          'question': 'What is \'Regular Admissions?\'',
          'answer': 'Answer goes here'
        },
        'rolling-admissions': {
          'question': 'What do I do about rolling admissions?',
          'answer': 'Answer goes here.'
        },
        'early-action': {
          'question': 'What do I do about early action?',
          'answer': 'Answer goes here.'
        }
      };

      $scope.question = faqs[question].question;
      $scope.answer = faqs[question].answer;

      $scope.close = function () {
        $modalInstance.dismiss();
      };
    }]);

});
