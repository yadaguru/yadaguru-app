require.config({
  baseUrl: 'dist',
  urlArgs: ''
});

require(
  [
    'app',
    'services/authService',
    'services/identityService',
    'services/userService',
    'services/apiService',
    'services/utilsService',
    'services/notifierService',
    'services/reminderService',
    'services/googleCalendarService',
    'services/iCalService',
    'filters',
    'root-controller'
  ],
  function () {
    angular.bootstrap(document, ['yadaguru']);
  }
);
