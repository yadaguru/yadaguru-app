define(['app'], function(app) {

  'use strict';

  var SmsController = function($scope, $cookies) {

    $scope.$parent.showAdd = false;
    $scope.isCompletionModalVisible = false;
    $scope.isSmsSetup = $cookies.get('initialSmsSetupComplete') || false;
    $scope.showInitialSetup = angular.copy(!$scope.isSmsSetup);
    console.log($scope.isSmsSetup);

    $scope.smsSetupStep = 1;

    $scope.submitMobile = function() {
      //TODO POST to submit number to server
      console.log('mobileNumber: ', $scope.mobileNumber);
      $scope.smsSetupStep = 2;
    };

    $scope.confirmCode = function() {
      $scope.smsSetupStep = 3;
    };

    $scope.registerUser = function() {
      //TODO POST to create new user for number
      console.log('smsCode: ', $scope.smsCode);
      console.log('personalCode: ', $scope.personalCode);
      console.log('sponsorCode: ', $scope.sponsorCode);
      $scope.isCompletionModalVisible = true;
    };

    $scope.endInitialMobileSetup = function() {
      $cookies.put('initialSmsSetupComplete', true);
    };

    $scope.editLoginCode = function() {
      $scope.smsSetupStep = 2;
      $scope.showInitialSetup = true;
    };

  };

  app.register.controller('SmsController', ['$scope', '$cookies', SmsController]);

});
