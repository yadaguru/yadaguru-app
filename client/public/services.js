(function() {

  'use strict';

  angular.module('yg.root.services', [
    'yg.root.services.reminder',
    'yg.common.services.iCal',
    'yg.common.services.google-calendar']);
})();
