define(['app'], function(app) {

  'use strict';

  var SchoolController = function ($scope, $YadaAPI) {
    $YadaAPI.schools.getEmpty().success(function(resp) {
      $scope.isOnboarding = resp.length === 0;
      $scope.schools = resp;
    });
  };

  app.register.controller('SchoolController', ['$scope', 'yg.services.api', SchoolController]);
});
