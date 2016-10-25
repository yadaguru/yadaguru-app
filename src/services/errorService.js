define(['app'], function(app) {

  app.factory('yg.services.error', [
    function() {
      function handleHttpError(error) {
        // TODO - Better error handling
        console.log(error);
      }

      return {
        handleHttpError: handleHttpError
      }
    }]);

});
