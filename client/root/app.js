/**
 * Main application module
 * @namespace YadaApp
 */
(function(app) {

  'use strict';

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
        templateUrl: 'templates/main.html',
        controller: 'RootController'
      })
      .state('faqs', {
        url:'/faqs',
        templateUrl: 'templates/faqs.html',
        controller: 'FaqController'
      });
  };

  app.config(['$stateProvider', '$urlRouterProvider', config]);
    
}(angular.module('yg.root', ['ngResource', 'ui.bootstrap', 'yg.common.services', 'yg.root.services', 'ui.router', 
                 'yg.root.filters.reminder', 'ngSanitize'])));
