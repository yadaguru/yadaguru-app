define(['app'], function(app) {

  'use strict';

  var SchoolController = function ($scope, $moment, $YadaAPI) {

    // TODO replace getEmpty with get once persistence logic is worked out
    $YadaAPI.schools.getEmpty().success(function(resp) {
      $scope.isOnboarding = resp.length === 0;
      $scope.schools = resp;
    });

    $scope.endOnboarding = function() {
      $scope.isOnboarding = false;
      $scope.currentStep = 0;
    };
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

    $scope.close = function(){
      $modalInstance.dismiss();
    };
  };

  app.register.controller('FaqModalController', ['$scope', '$modalInstance', 'question', FaqModalController]);
  app.register.controller('SchoolController', ['$scope', '$moment', 'yg.services.api', SchoolController]);
});
