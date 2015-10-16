/**
 * Main application module
 * @namespace YadaApp
 */
define(['app'], function() {

  'use strict';

  var app = angular.module('yadaguru', ['ngResource', 'ngRoute', 'ngSanitize', 'ngAnimate',
    'ui.router', 'ui.bootstrap', 'fileSaver', 'routeResolverServices', 'toastr']);

    app.config(['$routeProvider', '$locationProvider', 'routeResolverProvider',
      '$controllerProvider', '$filterProvider', '$provide', '$compileProvider',
      function($routeProvider, $locationProvider, routeResolverProvider,
        $controllerProvider, $filterProvider, $provide, $compileProvider) {

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

        $routeProvider // route.resolve(baseName, path, controllerAs, securitygroup)
          .when('/', route.resolve('Home', 'home/', 'vm'))
          .when('/faqs', route.resolve('Faqs', 'faqs/', 'vm'))
          .otherwise({redirectTo:'/'});
    }]);

    app.run(['$rootScope', '$location', 'yg.services.identity', 'yg.services.notifier',
      function($rootScope, $location, identityService, notifierService) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
          if (next && next.$$route && next.$$route.secure) {
            identityService.getCurrentUser().then(function() {
              if (!identityService.isAuthorized(next.$$route.secure)) {
                $rootScope.showAccountModal();
                $location.path('/');
                if (identityService.currentUser) {
                  notifierService.error('Not authorized to access route');
                }
              }
            });
          }
        });
        $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
          if(rejection === 'unauthorized') {
            $rootScope.showAccountModal();
            $location.path('/');
            notifierService.error('Not authorized to access route');
          }
        });
    }]);


  return app;
});
