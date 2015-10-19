define(['app'], function() {

  'use strict';

  var app = angular.module('yadaguru', ['ngResource', 'ngRoute', 'ngSanitize', 'ngAnimate',
    'ui.router', 'ui.bootstrap', 'fileSaver', 'routeResolverServices', 'toastr']);

    app.config(['$routeProvider', '$locationProvider', 'routeResolverProvider',
      '$controllerProvider', '$filterProvider', '$provide', '$compileProvider',
      '$urlRouterProvider', '$stateProvider', function($routeProvider, $locationProvider,
        routeResolverProvider, $controllerProvider, $filterProvider, $provide,
        $compileProvider, $urlRouterProvider, $stateProvider) {

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
          .state('home', route.resolve('/', 'Home', 'home/', 'vm'))
          .state('faqs', route.resolve('/faqs', 'Faqs', 'faqs/', 'vm'))
          .state('login', route.resolve('/login', 'Login', 'login/', 'vm'))
          .state('admin', route.resolve('/admin', 'Admin', 'admin/', 'vm'))
          .state('admin.reminders', route.resolve('/reminders', 'Reminders', 'admin/reminders/', 'vm'))
          .state('admin.categories', route.resolve('/categories', 'Categories', 'admin/categories/', 'vm'))
          .state('admin.test-dates', route.resolve('/test-dates', 'TestDates', 'admin/test-dates/', 'vm'))
          .state('admin.test-messages', route.resolve('/test-messages', 'TestMessages', 'admin/test-messages/', 'vm'))
          .state('admin.faqs', route.resolve('/faqs', 'Faqs', 'admin/faqs/', 'vm'))
          .state('admin.settings', route.resolve('/settings', 'Settings', 'admin/settings/', 'vm'));
    }]);

    // app.run(['$rootScope', '$location', 'yg.services.identity', 'yg.services.notifier',
    //   function($rootScope, $location, identityService, notifierService) {
    //     $rootScope.$on('$routeChangeStart', function (event, next, current) {
    //       if (next && next.$$route && next.$$route.secure) {
    //         identityService.getCurrentUser().then(function() {
    //           if (!identityService.isAuthorized(next.$$route.secure)) {
    //             $location.path('/');
    //             if (identityService.currentUser) {
    //               notifierService.error('Not authorized to access route');
    //             }
    //           }
    //         });
    //       }
    //     });
    //     $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
    //       if(rejection === 'unauthorized') {
    //         $location.path('/');
    //         notifierService.error('Not authorized to access route');
    //       }
    //     });
    // }]);


  return app;
});
