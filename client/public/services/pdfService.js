(function(app) {
  'use strict';

  var pdfService = function($window) {
    if ($window.jsPDF) {
      $window._thirdParty = $window._thirdParty || {};
      $window._thirdParty.jsPDF = $window.jsPDF;
      try {
        delete $window.jsPDF;
      } catch (e) {
        $window.jsPDF = undefined;
      }
    }
    var jsPDF = $window._thirdParty.jsPDF;
    return jsPDF;
  };

  app.factory('pdfService', ['$window', pdfService]);

}(angular.module('yg.common.services.pdf', [])));
