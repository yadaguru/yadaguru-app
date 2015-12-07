require.config({
  baseUrl: 'dist',
  urlArgs: ''
});

require(
  [
    'app',
    'filters',
    'services/authService',
    'services/identityService',
    'services/userService',
    'services/apiService',
    'services/utilsService',
    'services/notifierService',
    'services/reminderService',
    'services/googleCalendarService',
    'services/iCalService',
    'services/routeResolverProvider',
    'directives/navLinks',
    'rootController'
  ],
  function () {
    angular.bootstrap(document, ['yadaguru']);
  }
);
