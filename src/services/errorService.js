define(['app'], function(app) {

  app.factory('yg.services.error', [
    'yg.services.modal',
    function(modalService) {
      function handleHttpError(error) {
        var modalMessage = modalService.makeModalMessage(
          'OUR BAD!<br>Something went wrong. Could you just click here to refresh ' +
          'the app?'
        )
        modalService.showModal(modalMessage, {
          button: 'click here (sorry about that)'
        })
          .then(function() {
            // TODO replace this with JSNLog
            console.log(error);
            location.reload();
          });
      }

      return {
        handleHttpError: handleHttpError
      }
    }]);

});
