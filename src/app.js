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

          // Old routes from version 1
          .state('home', route.resolve('/home', 'Home', 'home/', 'vm'))
          .state('admin', route.resolve('/admin', 'Admin', 'admin/', 'vm', 'admin'))
          .state('admin.reminders', route.resolve('/reminders', 'Reminders', 'admin/reminders/', 'vm', 'admin'))
          .state('admin.categories', route.resolve('/categories', 'Categories', 'admin/categories/', 'vm', 'admin'))
          .state('admin.test-dates', route.resolve('/test-dates', 'TestDates', 'admin/test-dates/', 'vm', 'admin'))
          .state('admin.test-messages', route.resolve('/test-messages', 'TestMessages', 'admin/test-messages/', 'vm', 'admin'))
          .state('admin.faqs', route.resolve('/faqs', 'Faqs', 'admin/faqs/', 'vm', 'admin'))
          .state('admin.settings', route.resolve('/settings', 'Settings', 'admin/settings/', 'vm', 'admin'));

        localStorage.setPrefix('yg.');
    }]);

    app.run(['$rootScope', '$state', 'yg.services.identity', 'yg.services.notifier',
      function($rootScope, $state, identityService, notifierService) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
          if (toState.data && toState.data.access) {
            identityService.getCurrentUser().then(function() {
              if (!identityService.isAuthorized(toState.data.access)) {
                if (identityService.currentUser) {
                  $state.go(fromState);
                  notifierService.error('Not authorized to access route');
                } else {
                  $state.go('login');
                }
              }
            });
          }
        });
        $rootScope.$on('$stateChangeError', function(evt, current, previous, rejection) {
          console.log(evt);
          if(rejection === 'unauthorized') {
            $state.go('login');
            notifierService.error('Not authorized to access route');
          }
        });
    }]);


  return app;
});
