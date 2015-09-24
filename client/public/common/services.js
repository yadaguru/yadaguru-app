(function() {

  'use strict';

  angular.module('yg.common.services',
    ['toastr',
     'ngResource',
     'yg.common.services.api',
     'yg.common.services.utils',
     'yg.common.services.user',
     'yg.common.services.auth',
     'yg.common.services.identity',
     'yg.common.services.google-calendar',
     'yg.common.services.iCal',
     'yg.common.services.pdf',
     'yg.common.services.notifier']);
}());
