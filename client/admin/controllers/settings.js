(function(app) {
  
  'use strict';

  var AdminSettingsController = function($scope, YadaAPI) {

    $scope.faqContent = '';
    $scope.faqId = '';

    $scope.getSettingsContent = function() {
      YadaAPI.settings.get().then(function(resp) {
        $scope.faqContent = resp.data[0].content;
        $scope.faqId = resp.data[0]._id;
      }, function(err) {console.log(err);});
    };

    $scope.getSettingsContent();

    $scope.saveSettingsContent = function() {
      var contentJson = {'content': $scope.faqContent};
      YadaAPI.settings.put($scope.faqId, contentJson).then(function() {
        toastr.success('FAQs Saved Successfully');
      }, function(err) {
        toastr.error('Save failed');
        console.log(err);
      });
    };

  };

  app.controller('AdminSettingsController', ['$scope', 'YadaAPI', AdminSettingsController]);

}(angular.module('yg.admin.controllers.settings', [])));
