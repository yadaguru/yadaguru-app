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

    $scope.getTestMessages();

  };

  app.controller('AdminTestMessagesController', ['$scope', 'YadaAPI', AdminTestMessagesController]);

}(angular.module('yg.admin.controllers.test-messages', [])));
