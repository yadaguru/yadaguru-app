define(['app'], function() {

  'use strict';

  var app = angular.module('yadaguru', ['ngResource', 'ngRoute', 'ngTouch', 'ngSanitize', 'ngAnimate',
    'ui.router', 'ui.bootstrap', 'ui.bootstrap.collapse', 'fileSaver', 'routeResolverServices', 'toastr', 'config',
    'frapontillo.bootstrap-switch', 'angular-momentjs', 'angular-tour', 'ui.bootstrap.modal',
    'ngCookies', 'ngStorage', 'ui.mask', 'LocalStorageModule']);

    app.config(['$routeProvider', '$locationProvider', 'routeResolverProvider',
      '$controllerProvider', '$filterProvider', '$provide', '$compileProvider',
      '$urlRouterProvider', '$stateProvider', 'localStorageServiceProvider', function($routeProvider, $locationProvider,
        routeResolverProvider, $controllerProvider, $filterProvider, $provide,
        $compileProvider, $urlRouterProvider, $stateProvider, localStorage) {

        $urlRouterProvider.when('', '/');
        $urlRouterProvider.when('/', 'school');
        $urlRouterProvider.when('/admin', 'admin/reminders');
        $urlRouterProvider.rule(function($injector, $location) {
          var path = $location.path();
          var hasTrailingSlash = path[path.length-1] ==='/';
          if (hasTrailingSlash) {
            var newPath = path.substr(0, path.length - 1);
            return newPath;
          }
        });
        routeResolverProvider
          .routeConfig
          .setBaseDirectories('dist/', 'dist/');

        app.register = {
          controller: $controllerProvider.register,
          directive: $compileProvider.directive,
          filter: $filterProvider.register,
          factory: $provide.factory,
          service: $provide.service
        };

        var route = routeResolverProvider.route;

        $stateProvider // route.resolve(url, baseName, path, controllerAs, secure)
          // New routes for version 2
          .state('school', route.resolve('/school', 'School', 'school/', 'vm'))
          .state('school.new', route.resolve('/new', 'New', 'school/new/', 'vm'))
          .state('reminder', route.resolve('/reminder/:schoolId', 'Reminder', 'reminder/', 'vm'))
          .state('user', route.resolve('/user', 'User', 'user/', 'vm'))
          .state('user.sponsor-update', route.resolve('/sponsor-update', 'SponsorUpdate', 'user/sponsor-update/', 'vm'))
          .state('privacy', route.resolve('/privacy', 'Privacy', 'privacy/', 'vm'))
          .state('faqs', route.resolve('/faqs', 'Faqs', 'faqs/', 'vm'))
          .state('disclaimer', route.resolve('/disclaimer', 'Disclaimer', 'disclaimer/', 'vm'))
          .state('login', route.resolve('/login', 'Login', 'login/', 'vm'))

        localStorage.setPrefix('yg.');
    }]);

    app.run(['$rootScope', '$state', 'yg.services.auth', 'localStorageService',
      function($rootScope, $state, authService, localStorage) {
        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
          // if on login, don't redirect
          if (toState.name === 'login') {
            return;
          }

          // if in the process of onboarding and not on schoo, switch to school
          if (!authService.isAuthorized() && $rootScope.isOnboarding) {
            if (toState.name !== 'school') {
              $state.go('school');
            }
            return;
          }

          // if not authorized and onboarding isn't completed, redirect to school and begin onboarding
          if (!authService.isAuthorized() && !localStorage.get('ob_complete')) {
            $state.go('school');
          }

          // if not authorized and onboarding completed, redirect to login
          if (!authService.isAuthorized && localStorage.get('ob_complete')) {
            $state.go('login');
          }

          // Save a reference to the current state name in the rootscope
          $rootScope.currentState = $state.current.name;

        });
    }]);

  return app;
});
