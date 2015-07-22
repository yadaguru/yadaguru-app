(function(app) {
  
  'use strict';

  var AdminTestMessagesController = function($scope, YadaAPI, Utils) {

    $scope.data = {};

    $scope.getTestMessages = function() {
      Utils.getModels(YadaAPI, ['testMessages', 'categories'], populate);
    };

    var populate = function(resp) {
      var respData = resp.testMessages[0];
      console.log(respData);
      $scope.categories = resp.categories;
      $scope.data._id = respData._id;
      $scope.data.satMessage = respData.satMessage;
      $scope.data.satDetail = respData.satDetail;
      $scope.data.actMessage = respData.actMessage;
      $scope.data.actDetail = respData.actDetail;
      $scope.data.testCategory = respData.testCategory;
    };

    $scope.save = function(data) {
      
      $scope.$broadcast('show-errors-check-validity');
      if ($scope.testMessageForm.$invalid) {
        toastr.error('Please make sure all fields are complete.');
        return;
      }

      YadaAPI.testMessages.put(data._id, data).then(function(resp) {
        toastr.success('Test Messages Saved Successfully');
      }, function(err) {
        toastr.error('Save failed');
        console.log(err);
      });

    };

    $scope.getTestMessages();

      

  };

  app.controller('AdminTestMessagesController', ['$scope', 'YadaAPI', 'Utils', AdminTestMessagesController]);

}(angular.module('yg.admin.controllers.test-messages', [])));
