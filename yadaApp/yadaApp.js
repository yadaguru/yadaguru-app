/**
 * Main application module
 * @namespace YadaApp
 */
(function () {
  var module = angular.module('yadaApp', ['ui.bootstrap', 'yadaApp.services', 'ui.router']);
  module.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/admin','/admin/reminders');
    $urlRouterProvider.otherwise('/main');
    $urlRouterProvider.rule(function($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path[path.length-1] ==='/';
      if (hasTrailingSlash) {
        var newPath = path.substr(0, path.length - 1);
        return newPath;
      }
    });
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'templates/main.html',
        controller: 'mainCtrl'
      })
      .state('admin', {
        url:'/admin',
        templateUrl: 'templates/admin.html',
        controller: 'adminCtrl'
      })
      .state('admin.reminders', {
        url: '/reminders',
        templateUrl: 'templates/admin.reminders.html',
        controller: 'adminRemindersCtrl'
      })
      .state('admin.test-dates', {
        url: '/test-dates',
        templateUrl: 'templates/admin.test-dates.html',
        controller: 'adminTestDatesCtrl'
      });
  }]);
}());
