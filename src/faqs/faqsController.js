define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the faqs view
   */
  app.register.controller('FaqsController', ['$scope', 'yg.services.api',
    function ($scope, yadaApi) {
      $scope.contact = 'Loading...';
      $scope.faq = 'Loading...';

      yadaApi.contentItems.get('contact').then(function(resp) {
        $scope.contact = resp.data[0].content;
      }, function() {
        $scope.contact = 'Error loading contact info.';
      });

      yadaApi.contentItems.get('faqs').then(function(resp) {
        $scope.faqs = resp.data[0].content;
      }, function() {
        $scope.faqs = 'Error loading FAQs.';
      })
    }]);

});
