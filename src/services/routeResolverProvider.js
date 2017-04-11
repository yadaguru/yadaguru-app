'use strict';

define([], function() {

  var routeResolver = function() {
    var $http;

    this.$get = ['$http', function(_$http_) {
      $http = $_http_;
      return this;
    }];

    this.routeConfig = (function() {
      var viewsDirectory = '/',
        controllersDirectory = '/',

        setBaseDirectories = function(viewsDir, controllersDir) {
          viewsDirectory = viewsDir;
          controllersDirectory = controllersDir;
        },

        getViewsDirectory = function() {
          return viewsDirectory;
        },

        getControllersDirectory = function() {
          return controllersDirectory;
        };

      return {
        setBaseDirectories: setBaseDirectories,
        getControllersDirectory: getControllersDirectory,
        getViewsDirectory: getViewsDirectory
      };
    }());

    this.route = (function(routeConfig) {

      var resolve = function(url, baseName, path, controllerAs, secure) {
          if (!path) {
            path = '';
          }

          var routeDef = {};
          var baseFileName = baseName.charAt(0).toLowerCase() + baseName.substr(1);
          routeDef.url = url;
          routeDef.templateUrl = routeConfig.getViewsDirectory() + path + baseFileName + '.html';
          routeDef.controller = baseName + 'Controller';
          if (controllerAs) {
            routeDef.controllerAs = controllerAs;
          }
          if (secure) {
            routeDef.data = {
              access: secure
            };
          }
          routeDef.resolve = {
            load: ['$q', '$rootScope', '$http', function($q, $rootScope, $http) {
              // Load rev manifest file, memoizing the results to reduce requests
              var manifestPromise;
              if (this.manifest) {
                manifestPromise = $q.resolve(this.manifest)
              } else {
                manifestPromise = $http.get('rev-manifest.json?' + new Date().getTime())
                  .then(function(res) {
                    return res.data;
                  });
              }

              return manifestPromise.then(function(manifest) {
                var controllerFile = routeConfig.getControllersDirectory() + path + baseFileName + 'Controller.js';
                // Look up filename in the rev manifest file
                var versionedFile = manifest[controllerFile];
                var dependencies = [versionedFile];
                return resolveDependencies($q, $rootScope, dependencies);
              });
            }]
          };

          return routeDef;
        },

        resolveDependencies = function($q, $rootScope, dependencies) {
          var defer = $q.defer();
          require(dependencies, function() {
            defer.resolve();
            $rootScope.$apply();
          });

          return defer.promise;
        };

      return {
        resolve: resolve
      };
    }(this.routeConfig));

  };

  var servicesApp = angular.module('routeResolverServices', []);

  //Must be a provider since it will be injected into module.config()
  servicesApp.provider('routeResolver', routeResolver);
});
