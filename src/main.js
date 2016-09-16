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
    'services/pdfService',
    'services/userService',
    'services/helpService',
    'services/modalService',
    'services/apiService',
    'services/utilsService',
    'services/notifierService',
    'services/reminderService',
    'services/googleCalendarService',
    'services/iCalService',
    'services/routeResolverProvider',
    'directives/navLinks',
    'directives/onboarding',
    'directives/progressDots',
    'rootController'
  ],
  function () {
    angular.bootstrap(document, ['yadaguru']);
  }
);
