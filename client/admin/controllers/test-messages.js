(function(app) {
  
  'use strict';

  var AdminTestMessagesController = function($scope, YadaAPI) {

    $scope.data = {};

    $scope.getTestMessages = function() {
      YadaAPI.testMessages.get().then(populate, function(err) {console.log(err);});
    };

    var populate = function(resp) {
      var respData = resp.data[0];
      $scope.data._id = respData._id;
      $scope.data.satMessage = respData.satMessage;
      $scope.data.satDetail = respData.satDetail;
      $scope.data.actMessage = respData.actMessage;
      $scope.data.actDetail = respData.actDetail;
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

  app.controller('AdminTestMessagesController', ['$scope', 'YadaAPI', AdminTestMessagesController]);

}(angular.module('yg.admin.controllers.test-messages', [])));
