(function(app) {
  'use strict';

  var mainCtrl = function ($scope, YadaAPI, Utils) {
    $scope.reminders = [];
    $scope.dt = new Date();

    $scope.getReminders = function(formData) {
      $scope.formData = formData;
      YadaAPI.reminders.get().then(populate, function(err) {console.log(err);});
    };

    var populate = function(resp) {
      var data = resp.data;
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

  var adminCtrl = function($scope, $state) {

    $scope.$on('$stateChangeStart', function(e, toState) {
      $scope.currentTab = toState.url;
    });

    $scope.currentTab = '/reminders';
  };

  var adminRemindersCtrl = function($scope, $modal, YadaAPI) {
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
        templateUrl: 'templates/modals/admin.reminders.edit.html',
        controller: 'modalAdminReminderEdit',
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

  var adminTestDatesCtrl = function($scope, $modal, YadaAPI, Utils) {
    $scope.getTestDates = function() {
      YadaAPI.testDates.get().then(populate, function(err) {console.log(err);});

      function populate(resp) {
        var data = resp.data;
        var testDates = [];
        for (var i = 0; i < data.length; i++) {
          var testDate = {};
          var current = data[i];
          testDate._id = current._id;
          testDate.testDate = Utils.formatDate(new Date(current.testDate));
          testDate.registrationDate = Utils.formatDate(new Date(current.registrationDate));
          testDate.testType = current.testType;
          testDates.push(testDate);
        }
        $scope.testDates = testDates;
      }
    };

    $scope.openEditModal = function (context, data) {
      var modalInstance = $modal.open({
        templateUrl: 'templates/modals/admin.test-dates.edit.html',
        controller: 'modalAdminTestDateEdit',
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
        $scope.testDates = [];
        $scope.getTestDates();
      });
    };

    $scope.getTestDates();
  };

  var modalAdminReminderEdit = function($scope, $modalInstance, YadaAPI, context, data) {
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

  var modalAdminTestDateEdit = function($scope, $modalInstance, YadaAPI, context, data) {
    $scope.context = context;
    $scope.data = angular.copy(data);

    $scope.add = function(data) {
      $scope.$broadcast('show-errors-check-validity');
      if ($scope.editTestDateForm.$invalid) {
        return;
      }

      YadaAPI.testDates.post(data).then(function(res){
        $modalInstance.close();
      }, function(err){console.log('error adding test date', err);});
    };

    $scope.save = function(data) {
      
      $scope.$broadcast('show-errors-check-validity');
      if ($scope.editTestDateForm.$invalid) {
        return;
      }

      YadaAPI.testDates.put(data._id, data).then(function(res){
        $modalInstance.close();
      }, function(err){console.log('error saving test date', err);});
    };

    $scope.delete = function(id) {
      if (window.confirm("Do you really want to delete this test date?")) {
        YadaAPI.testDates.delete(id).then(function(res){
          $modalInstance.close();
        }, function(err){console.log('error deleting test date', err);});
      }
    };
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

  };
  app.controller('mainCtrl', ['$scope', 'YadaAPI', 'Utils', mainCtrl]);
  app.controller('adminCtrl', ['$scope', '$state', adminCtrl]);
  app.controller('adminRemindersCtrl', ['$scope', '$modal', 'YadaAPI', adminRemindersCtrl]);
  app.controller('adminTestDatesCtrl', ['$scope', '$modal', 'YadaAPI', 'Utils', adminTestDatesCtrl]);
  app.controller('modalAdminReminderEdit', ['$scope', '$modalInstance', 'YadaAPI', 'context', 'data', modalAdminReminderEdit]);
  app.controller('modalAdminTestDateEdit', ['$scope', '$modalInstance', 'YadaAPI', 'context', 'data', modalAdminTestDateEdit]);
}(angular.module("yadaApp")));
