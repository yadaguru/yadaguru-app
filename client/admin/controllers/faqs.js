(function(app) {
  
  'use strict';

  var AdminFaqsController = function($scope, YadaAPI) {

    $scope.faqContent = '';
    $scope.faqId = '';

    $scope.getFaqContent = function() {
      YadaAPI.faqs.get().then(function(resp) {
        $scope.faqContent = resp.data[0].content;
        $scope.faqId = resp.data[0]._id;
      }, function(err) {console.log(err);});
    };

    $scope.getFaqContent();

    $scope.saveFaqContent = function() {
      var contentJson = {'content': $scope.faqContent};
      YadaAPI.faqs.put($scope.faqId, contentJson).then(function() {
        toastr.success('FAQs Saved Successfully');
      }, function(err) {
        toastr.error('Save failed');
        console.log(err);
      });
    };

  };


  app.controller('AdminFaqsController', ['$scope', 'YadaAPI', AdminFaqsController]);

}(angular.module('yg.admin.controllers.faqs', [])));
