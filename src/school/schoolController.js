define(['app'], function(app) {

  'use strict';

  var SchoolController = function ($scope) {
    $scope.schools = [
      {
        name: 'Temple',
        dueDate: '2/1/2016',
        isActive: true
      },
      {
        name: 'Drexel',
        dueDate: '1/1/2016',
        isActive: false
      },
      {
        name: 'CCP',
        dueDate: '4/1/2016',
        isActive: false
      },
      {
        name: 'Lincoln',
        dueDate: '2/1/2016',
        isActive: false
      }
    ];
  };

  app.register.controller('SchoolController', ['$scope', SchoolController]);
});
