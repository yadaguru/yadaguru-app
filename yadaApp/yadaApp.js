/**
 * Main application module
 * @namespace YadaApp
 */
(function () {
  var module = angular.module('yadaApp', ['ui.bootstrap', 'yadaApp.services', 'ngRoute']);
  module.config(['$routeProvider', function($routeProvier) {
    $routeProvier
      .when('/', {
        templateUrl: 'templates/main.html',
        controller: 'mainCtrl'
      })
      .when('/admin', {
        templateUrl: 'templates/admin.html',
        controller: 'adminCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
}());
