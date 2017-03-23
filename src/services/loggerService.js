define(['app'], function(app) {
  app
    // Replace $log with the JSNLogger version
    .service('$log', function() {
      this.log = function(message) {
        JL('Angular').trace(message);
      }

      this.debug = function (message) {
        JL('Angular').debug(message);
      }

      this.info = function (message) {
        JL('Angular').info(message);
      }

      this.warn = function (message) {
        JL('Angular').warn(message);
      }

      this.error = function (message) {
        JL('Angular').error(message);
      }
    })
    // Replace global exception handling with JSNLogger Version
    .factory('$exceptionHandler', function() {
      return function(exception, cause) {
        JL('Angular').fatalException(cause, exception);
        throw exception;
      }
    });
});