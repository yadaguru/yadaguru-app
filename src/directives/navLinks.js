define(['app'], function(app) {

  'use strict';

  app.directive('navLinks', function() {
    return {
      restrict: 'E',
      templateUrl: 'dist/directives/navLinks.html'
    };
  });


});
