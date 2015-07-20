/**
 * Main application module
 * @namespace YadaApp
 */
(function () {
  var module = angular.module('yg.admin', ['ngResource', 'ui.bootstrap', 'yg.common.services', 'yg.admin.controllers', 
                                           'yg.admin.directives', 'ui.router', 'textAngular']);
  module.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('','/reminders');
    $urlRouterProvider.rule(function($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path[path.length-1] ==='/';
      if (hasTrailingSlash) {
        var newPath = path.substr(0, path.length - 1);
        return newPath;
      }
    });
    $stateProvider
      .state('admin', {
        url:'/',
        templateUrl: 'index.html',
        controller: 'AdminController'
      })
      .state('reminders', {
        url: '/reminders',
        templateUrl: 'templates/reminders.html',
        controller: 'AdminRemindersController'
      })
      .state('test-dates', {
        url: '/test-dates',
        templateUrl: 'templates/test-dates.html',
        controller: 'AdminTestDatesController'
      })
      .state('test-messages', {
        url: '/test-messages',
        templateUrl: 'templates/test-messages.html',
        controller: 'AdminTestMessagesController'
      })
      .state('faqs', {
        url: '/faqs',
        templateUrl: 'templates/faqs.html',
        controller: 'AdminFaqsController'
      });
  }]);
}());
