define(['app'], function(app) {

  'use strict';

  app.directive('ygNavLinks', function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/navLinks.html'
    };
  });


});
