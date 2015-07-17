(function(app) {
  
  'use strict';

  var AdminFaqsController = function($scope, YadaAPI) {

    $scope.htmlVariable = '';

  };

  app.controller('AdminFaqsController', ['$scope', 'YadaAPI', AdminFaqsController]);

}(angular.module('yg.admin.controllers.faqs', [])));
