define(['app'], function(app) {

  'use strict';

  var SettingsController = function($scope, YadaAPI) {

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
      {id: 0, label: 'January'},
      {id: 1, label: 'February'},
      {id: 2, label: 'March'},
      {id: 3, label: 'April'},
      {id: 4, label: 'May'},
      {id: 5, label: 'June'},
      {id: 6, label: 'July'},
      {id: 7, label: 'August'},
      {id: 8, label: 'September'},
      {id: 9, label: 'October'},
      {id: 10, label: 'November'},
      {id: 11, label: 'December'},
    ];

    $scope.generateDays = function() {
      var month = $scope.data.summerCutoffMonth;
      var count;
      var days30 = [3, 5, 8, 10];
      if (month === 1) {
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

  app.register.controller('SettingsController', ['$scope', 'yg.services.api', SettingsController]);

});
