(function(app) {
  
  'use strict';

  var AdminRemindersController = function($scope, $modal, YadaAPI) {
    $scope.test = 'test data';
    
    $scope.getReminders = function() {
      YadaAPI.reminders.get().then(populate, function(err) {console.log(err);});

      function populate(resp) {
        var data = resp.data;
        var reminders = [];
        for (var i = 0; i < data.length; i++) {
          var reminder = {};
          var current = data[i];
          reminder._id = current._id;
          reminder.name = current.name;
          reminder.message = current.message;
          reminder.detail = current.detail;
          reminder.lateMessage = current.lateMessage;
          reminder.lateDetail = current.lateDetail;
          reminder.category = current.category;
          reminder.timeframes = current.timeframes;
          reminders.push(reminder);
        }
        $scope.reminders = reminders;
      }
    };

    $scope.addTimeframeSuffix = function(timeframe) {
      if (parseInt(timeframe) > 1 || parseInt(timeframe) === 0) {
        return timeframe + ' Days';
      }
      if (parseInt(timeframe) === 1) {
        return timeframe + ' Day';
      }
      return timeframe.charAt(0).toUpperCase() + timeframe.slice(1);
    };

    $scope.openEditModal = function (context, data) {
      var modalInstance = $modal.open({
        templateUrl: 'templates/reminders-edit.html',
        controller: 'AdminRemindersEditController',
        resolve: {
          context: function() {
            return context;
          },
          data: function () {
            return data;
          }
        }
      });
      
      modalInstance.result.then(function () {
        $scope.reminders = [];
        $scope.getReminders();
      });
    };
    $scope.getReminders();
  };

  var AdminRemindersEditController = function($scope, $modalInstance, YadaAPI, context, data) {
    $scope.context = context;
    $scope.data = angular.copy(data);

    $scope.add = function(data) {

      $scope.$broadcast('show-errors-check-validity');
      if ($scope.editReminderForm.$invalid) {
        return;
      }

      YadaAPI.reminders.post(data).then(function(res){
        $modalInstance.close();
      }, function(err){console.log('error adding reminder', err);});
    };

    $scope.save = function(data) {
      
      $scope.$broadcast('show-errors-check-validity');
      if ($scope.editReminderForm.$invalid) {
        return;
      }

      YadaAPI.reminders.put(data._id, data).then(function(res){
        $modalInstance.close();
      }, function(err){console.log('error saving reminder', err);});
    };

    $scope.delete = function(id) {
      if (window.confirm("Do you really want to delete this reminder?")) {
        YadaAPI.reminders.delete(id).then(function(res){
          $modalInstance.close();
        }, function(err){console.log('error deleting reminder', err);});
      }
    };
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

  };

  app.controller('AdminRemindersController', ['$scope', '$modal', 'YadaAPI', AdminRemindersController]);
  app.controller('AdminRemindersEditController', ['$scope', '$modalInstance', 'YadaAPI', 'context', 'data', AdminRemindersEditController]);

}(angular.module('yg.admin.controllers.reminders', [])));
