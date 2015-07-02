(function(app) {
  'use strict';

  var RootController = function ($scope, YadaAPI, Utils) {
    $scope.reminders = [];
    $scope.dt = new Date();

    $scope.getReminders = function(formData) {
      $scope.formData = formData;
      YadaAPI.reminders.get().then(populate, function(err) {console.log(err);});
    };

    var populate = function(resp) {
      var data = resp.data;
      console.log(data);
      var schoolName = $scope.formData.schoolName;
      var groupedReminders = (Utils.groupBy(data, 'timeframe'));
      $scope.groups = [];
      for (var i = 0; i < groupedReminders.length; i++) {
        var group = {};
        group.name = Utils.formatDate(Utils.calcDate(groupedReminders[i].name, $scope.formData.dt));
        group.members = [];
        for (var j = 0; j < groupedReminders[i].members.length; j++) {
          var reminder = {};
          var current = groupedReminders[i].members[j];
          reminder.date = Utils.formatDate(Utils.calcDate(current.timeframe, $scope.formData.dt));
          reminder.fullName = current.fullName;
          reminder.message = Utils.parseVars(current.message, schoolName, reminder.date);
          reminder.detail = Utils.parseVars(current.detail, schoolName, reminder.date);
          group.members.push(reminder);
        }
        $scope.groups.push(group);
      }

    };

    $scope.format = 'M/d/yyyy';
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    $scope.open = function($event) {
      console.log('open');
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.minDate = new Date();
  };

  app.controller('RootController', ['$scope', 'YadaAPI', 'Utils', RootController]);

}(angular.module('yg.root')));
