define(['app'], function(app) {
  'use strict';

  var FaqsController = function($scope, YadaAPI, $sce) {

    $scope.faqContent = '';

    $scope.getFaqs = function() {
      YadaAPI.faqs.get().then(function(resp) {
        $scope.faqContent = $sce.trustAsHtml(resp.data[0].content);
      }, function(err) {console.log(err);});
    };

    $scope.getFaqs();

  };
  app.register.controller('FaqsController', ['$scope', 'yg.services.api', '$sce', FaqsController]);
});
