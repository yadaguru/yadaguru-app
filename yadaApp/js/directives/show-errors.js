(function(app) {

  'use strict';

  var showErrors = function() {
    return {
      restrict: 'A',
      require: '^form',
      link: function (scope, el, attrs, formCtrl) {
        var inputEl = el[0].querySelector("[name]");
        var inputNgEl = angular.element(inputEl);
        var inputName = inputNgEl.attr('name');

        inputNgEl.bind('blur', function() {
          el.toggleClass('has-error', formCtrl[inputName].$invalid);
        });

        scope.$on('show-errors-check-validity', function() {
          el.toggleClass('has-error', formCtrl[inputName].$invalid);
        });
      }
    };
  };

  app.directive('showErrors', [showErrors]);

}(angular.module('yadaApp.directives.showErrors', [])));
