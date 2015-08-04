(function(app) {
  
  'use strict';

  var AdminSettingsController = function($scope, YadaAPI) {

    $scope.settings = {};

    $scope.getSettings = function() {
      YadaAPI.settings.get().then(function(resp) {
        $scope.data = resp.data[0];
        $scope.generateDays();
      }, function(err) {console.log(err);});
    };


    $scope.save = function(data) {
      YadaAPI.settings.put(data._id, data).then(function() {
        toastr.success('Settings Saved Successfully');
      }, function(err) {
        toastr.error('Save failed');
        console.log(err);
      });
    };

    $scope.months = [
      {id: 1, label: 'January'},
      {id: 2, label: 'February'},
      {id: 3, label: 'March'},
      {id: 4, label: 'April'},
      {id: 5, label: 'May'},
      {id: 6, label: 'June'},
      {id: 7, label: 'July'},
      {id: 8, label: 'August'},
      {id: 9, label: 'September'},
      {id: 10, label: 'October'},
      {id: 11, label: 'November'},
      {id: 12, label: 'December'},
    ];

    $scope.generateDays = function() {
      var month = $scope.data.summerCutoffMonth;
      var count;
      var days30 = [4, 6, 9, 11];
      if (month === 2) {
        count = 28 ;
      } else if (days30.indexOf(month) !== -1) {
        count = 30;
      } else {
        count = 31;
      }
      var days = [];
      for (var i = 1; i <= count; i++) {
        days.push({'id': i, 'label': i});
      }
      $scope.days = days;
    };

    $scope.getSettings();
  };

  app.controller('AdminSettingsController', ['$scope', 'YadaAPI', AdminSettingsController]);

}(angular.module('yg.admin.controllers.settings', [])));
