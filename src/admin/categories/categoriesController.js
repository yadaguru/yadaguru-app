define(['app'], function(app) {

  'use strict';

  var CategoriesController = function($scope, $modal, YadaAPI) {

    $scope.getCategories = function() {
      YadaAPI.categories.get().then(function(resp) {
        var data = resp.data;
        var categories = [];
        data.forEach(function(d) {
          var category = {};
          category._id = d._id;
          category.categoryName = d.categoryName;
          categories.push(category);
        });
        $scope.categories = categories;
      }, function(err) {
        toastr.error('Could not get categories');
        console.log(err);
      });
    };

    $scope.openEditModal = function (context, data) {
      var modalInstance = $modal.open({
        templateUrl: 'dist/admin/categories/categories-edit.html',
        controller: 'CategoriesEditController',
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
        $scope.categories = [];
        $scope.getCategories();
      });

    };

    $scope.getCategories();

  };

  var CategoriesEditController = function($scope, $modalInstance, YadaAPI, context, data, Utils) {
    $scope.context = context;
    $scope.data = angular.copy(data);

    $scope.add = function(data) {

      $scope.$broadcast('show-errors-check-validity');
      if ($scope.editCategoryForm.$invalid) {
        return;
      }

      YadaAPI.categories.post(data).then(function(res) {
        $modalInstance.close();
        toastr.success('Category ' + data.categoryName + ' successfully added!');
      }, function(err) {
        toastr.error('Error adding category');
        console.log(err);
      });
    };

    $scope.save = function(data) {

      $scope.$broadcast('show-errors-check-validity');
      if ($scope.editCategoryForm.$invalid) {
        return;
      }

      YadaAPI.categories.put(data._id, data).then(function(res) {
        $modalInstance.close();
        toastr.success('Category ' + data.categoryName + ' successfully saved!');
      }, function(err) {
        toastr.error('Error saving category');
        console.log(err);
      });
    };

    $scope.delete = function(id) {
      if (window.confirm("Do you really want to delete this category?")) {
        Utils.getModels(YadaAPI, ['reminders', 'testMessages'], function(data) {
          if (Utils.lookup(data.reminders, 'category', id, '_id') || Utils.lookup(data.testMessages, 'testCategory', id, '_id')) {
            toastr.error('Category is assigned to one or more reminders or to test messages. Please reassign ' +
                         'the category and try again.', 'Cannot Delete Category');
          } else {
            YadaAPI.categories.delete(id).then(function(res) {
              $modalInstance.close();
              toastr.success('Category ' + data.categoryName + ' successfully deleted!');
            }, function(err) {
              toastr.error('Error deleting category');
              console.log(err);
            });
          }
        });
      }
    };
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

  };

  app.register.controller('CategoriesController', ['$scope', '$modal', 'yg.services.api', CategoriesController]);
  app.register.controller('CategoriesEditController', ['$scope', '$modalInstance', 'yg.services.api', 'context', 'data', 'yg.services.utils',
                  CategoriesEditController]);

});
