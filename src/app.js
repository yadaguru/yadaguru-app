/**
 * Main application module
 * @namespace YadaApp
 */
define(['app'], function() {

  'use strict';

  var app = angular.module('yadaguru', ['ngResource', 'ngSanitize', 'ngAnimate',
    'ui.router', 'ui.bootstrap', 'fileSaver']);

  var config = function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
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
        url:'/',
        templateUrl: '/dist/templates/main.html',
        controller: 'RootController'
      })
      .state('faqs', {
        url:'/faqs',
        templateUrl: '/dist/templates/faqs.html',
        controller: 'FaqController'
      });
  };

  app.config(['$stateProvider', '$urlRouterProvider', config]);

  return app;
});
