define(['app'], function(app) {

  'use strict';

  app.directive('progressDots', function() {
    return {
      restrict: 'E',
      link: function(scope, el, atts) {
        var max = atts.max;
        var shape = atts.shape || 'fa-circle';
        var dot = '<i class="fa ' + shape + '"></i>';

        for (var i = 0; i < max; i++) {
          el.append(dot);
        }

        scope.$watch(atts.value, function(value) {
          var dots = el.children();
          for (var i = 0; i < max; i++) {
            var dotEl = angular.element(dots[i]);
            if (i <= value - 1) {
              dotEl.addClass('active');
            } else {
              dotEl.removeClass('active');
            }
          }
        });
      },
      template: ''
    };
  });


});
