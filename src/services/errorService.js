define(['app'], function(app) {

  app.factory('yg.services.error', [
    'yg.services.modal',
    '$state',
    '$log',
    function(modalService, $state, $log) {
      function handleHttpError(error) {
        if (error.status === 401) {
          $state.go('login');
          return;
        }

        var modalMessage = modalService.makeModalMessage(
          'OUR BAD!<br>Something went wrong. Could you just click here to refresh ' +
          'the app?'
        )
        modalService.showModal(modalMessage, {
          button: 'click here (sorry about that)'
        })
          .then(function() {
            $log.error(error);
            location.reload();
          });
      }

      function getConfirmCodeErrorHandler (okCallback, cancelCallback) {
        return function handleConfirmCodeError(error) {
          if (error.data.message === 'Login Failed: confirmCode is not valid or has expired') {
            var modalMessage = modalService.makeModalMessage(
              'Hmmm - looks like that\'s not the right code.'
            );
            return modalService.showModal(modalMessage, {
              button: 'Let me try again',
              buttonCallback: okCallback,
              cancel: 'Resend it',
              cancelCallback: cancelCallback
            });
          }
          return handleHttpError(error);
        }
      }

      return {
        handleHttpError: handleHttpError,
        getConfirmCodeErrorHandler: getConfirmCodeErrorHandler
      }
    }]);

});
