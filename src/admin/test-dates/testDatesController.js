define(['app'], function(app) {

  'use strict';

  var TestDatesController = function($scope, $modal, YadaAPI, Utils) {
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
        templateUrl: 'dist/admin/test-dates/testDates-edit.html',
        controller: 'TestDatesEditController',
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


  var TestDatesEditController = function($scope, $modalInstance, YadaAPI, context, data) {
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

  app.register.controller('TestDatesController', ['$scope', '$modal', 'yg.services.api', 'yg.services.utils', TestDatesController]);
  app.register.controller('TestDatesEditController', ['$scope', '$modalInstance', 'yg.services.api', 'context', 'data', TestDatesEditController]);

});
