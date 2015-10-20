define(['app'], function(app) {

  'use strict';

  var RemindersController = function($scope, $modal, YadaAPI, Utils) {
    $scope.test = 'test data';

    $scope.populateRemindersTable = function(data) {
      var reminders = [];
      data.reminders.forEach(function(_reminder) {
        var reminder = {};
        reminder._id = _reminder._id;
        reminder.name = _reminder.name;
        reminder.message = _reminder.message;
        reminder.detail = _reminder.detail;
        reminder.lateMessage = _reminder.lateMessage;
        reminder.lateDetail = _reminder.lateDetail;
        reminder.category = {};
        reminder.categoryName = Utils.lookup(data.categories, '_id', _reminder.category, 'categoryName');
        reminder.categoryId = _reminder.category;
        reminder.timeframes = _reminder.timeframes;
        reminders.push(reminder);
      });
      $scope.reminders = Utils.sortBy(reminders, 'categoryName');
    };

    $scope.getReminders = function() {
      Utils.getModels(YadaAPI, ['reminders', 'categories'], $scope.populateRemindersTable);
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
        templateUrl: 'dist/admin/reminders/reminders-edit.html',
        controller: 'RemindersEditController',
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

  var RemindersEditController = function($scope, $modalInstance, YadaAPI, context, data) {
    $scope.context = context;
    $scope.data = angular.copy(data);

    YadaAPI.categories.get().then(function(resp) {
      $scope.categories = resp.data;
    }, function(err) { console.log(err); });

    $scope.add = function(data) {

      $scope.$broadcast('show-errors-check-validity');
      if ($scope.editReminderForm.$invalid) {
        return;
      }
      data.category = data.categoryId;
      YadaAPI.reminders.post(data).then(function(res){
        $modalInstance.close();
      }, function(err){console.log('error adding reminder', err);});
    };

    $scope.save = function(data) {

      $scope.$broadcast('show-errors-check-validity');
      if ($scope.editReminderForm.$invalid) {
        return;
      }
      data.category = data.categoryId;
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

  app.register.controller('RemindersController', ['$scope', '$modal', 'yg.services.api', 'yg.services.utils', RemindersController]);
  app.register.controller('RemindersEditController', ['$scope', '$modalInstance', 'yg.services.api', 'context', 'data', RemindersEditController]);

});
