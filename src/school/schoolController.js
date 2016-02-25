define(['app'], function (app) {

  'use strict';

  var SchoolController = function ($scope, $rootScope, $moment, $YadaAPI, $cookies) {

    $scope.$parent.showAdd = true;
    $rootScope.user_id = $cookies.get('yg-uid');

    $scope.getSchools = function() {
      $YadaAPI.schools.get($rootScope.user_id).then(function (resp) {
        $scope.schools = [];
        resp.data.forEach(function(school) {
          $scope.schools.push({
            id: school.id,
            name: school.name,
            dueDate: moment.utc(school.due_date).format('M/D/YYYY'),
            isActive: school.is_active
          });
        })
      });
    };

    $scope.updateActive = function(id, is_active) {
      $YadaAPI.schools.put(id, {
        is_active: is_active
      }, $rootScope.user_id);
    };

    $scope.endOnboarding = function () {
      $scope.isOnboarding = false;
      $scope.currentStep = 0;
      $cookies.put('onboardingComplete', true);
    };

    if (!$scope.user_id) {
      $scope.isOnboarding = true;
    } else {
      $scope.getSchools();
    }
  };

  var FaqModalController = function ($scope, $modalInstance, question) {

    //TODO - These should really be in the database
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
  };

  app.register.controller('FaqModalController', ['$scope', '$modalInstance', 'question', FaqModalController]);
  app.register.controller('SchoolController', ['$scope', '$rootScope', '$moment', 'yg.services.api', '$cookies', '$localStorage', SchoolController]);
});
